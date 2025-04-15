import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useAuth } from "@/context/AuthContext";
import { Comment, CommentSectionProps } from "@/types/post-type";

export default function CommentSection({ boardId }: CommentSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  
  // 댓글 목록 불러오기
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8082/api/comments/board/${boardId}`
      );
      setComments(res.data);
    } catch (error) {
      console.error("댓글 불러오기 실패", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [boardId]);

  // 댓글 등록 요청
  const handleSubmit = async () => {
    if (!user) return alert("로그인이 필요합니다.");
    if (!newComment.trim()) return alert("댓글을 입력하세요");

    try {
      await axios.post(`http://localhost:8082/api/comments`, {
        boardId,
        content: newComment,
        email: user.email,
      });
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("댓글 등록 실패", error);
      alert("댓글 등록에 실패했습니다");
    }
  };

  // 댓글 삭제 요청
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:8082/api/comments/${id}`);
      fetchComments();
    } catch (error) {
      console.error("댓글 삭제 실패", error);
      alert("댓글 삭제에 실패했습니다");
    }
  };

  // 댓글 수정 요청
  const handleUpdate = async (id: number) => {
    if (!editingContent.trim()) return alert("수정할 내용을 입력하세요");
    try {
      await axios.patch(`http://localhost:8082/api/comments/${id}`, {
        content: editingContent,
        email: user?.email,
      });
      setEditingId(null);
      setEditingContent("");
      fetchComments();
    } catch (error) {
      console.error("댓글 수정 실패", error);
      alert("댓글 수정에 실패했습니다");
    }
  };

  return (
    <CommentBox>
      <h3>댓글</h3>
      <CommentList>
        {comments.map((c) => (
          <CommentItem key={c.commentId}>
            <CommentHeader>
              <strong>{c.name}</strong>
              {user?.name === c.name && editingId !== c.commentId && (
                <ActionButtons>
                  <button
                    onClick={() => {
                      setEditingId(c.commentId);
                      setEditingContent(c.content);
                    }}
                  >
                    수정
                  </button>
                  <button onClick={() => handleDelete(c.commentId)}>삭제</button>
                </ActionButtons>
              )}
            </CommentHeader>

            {editingId === c.commentId ? (
              <>
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
                <ActionButtons>
                  <button onClick={() => handleUpdate(c.commentId)}>저장</button>
                  <button onClick={() => setEditingId(null)}>취소</button>
                </ActionButtons>
              </>
            ) : (
              <span>{c.content}</span>
            )}
            <CommentFooter>
              <small>{new Date(c.createdDatetime).toLocaleString()}</small>
            </CommentFooter>
          </CommentItem>
        ))}
      </CommentList>

      <WriteBox>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <button onClick={handleSubmit}>등록</button>
      </WriteBox>
    </CommentBox>
  );
}

const CommentBox = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  border-top: 1px solid #ddd;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  margin-bottom: 1.5rem;
  text-align: left;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 6px;
  position: relative;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  strong {
    font-weight: bold;
    font-size: 0.95rem;
  }
`;

const CommentFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;

  small {
    color: gray;
    font-size: 0.8rem;
  }
`;

const WriteBox = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  textarea {
    width: 100%;
    height: 80px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    align-self: flex-end;
    padding: 0.5rem 1rem;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: #e5e7eb;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;
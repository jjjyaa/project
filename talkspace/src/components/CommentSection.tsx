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
  margin-top: 2.5rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

const CommentItem = styled.li`
  background-color: ${({ theme }) => theme.colors.gray};
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  strong {
    font-weight: bold;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const CommentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.6rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.subText};
`;

const WriteBox = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  textarea {
    width: 100%;
    height: 100px;
    padding: 0.8rem;
    font-size: ${({ theme }) => theme.fontSize.base};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px #fef3c7;
    }
  }

  button {
    align-self: flex-end;
    padding: 0.5rem 1.2rem;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.85rem;
    cursor: pointer;

    &:hover {
      background-color: #fbbf24;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    font-size: 0.75rem;
    padding: 0.3rem 0.7rem;
    background: #e5e7eb;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background-color: #d1d5db;
    }
  }
`;
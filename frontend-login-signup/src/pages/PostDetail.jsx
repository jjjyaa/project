import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

// 게시물 상세 조회 페이지
function PostDetail() {
  const { id } = useParams(); // URL에서 :id 값을 추출
  const [post, setPost] = useState(null); // 게시글 데이터 저장

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const navigate = useNavigate();
             
  // 게시글 불러오기
  useEffect(() => {
    axios.get(`http://localhost:8082/api/boards/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => {
        console.error(err);
        alert("존재하지 않는 게시글입니다.");
        navigate("/");
      });
  }, [id, navigate]);

  // 댓글 불러오기
  const fetchComments = () => {
    axios.get(`http://localhost:8082/api/comments/board/${id}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  // 댓글 작성 요청
  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;

    axios.post("http://localhost:8082/api/comments", {
      boardId: id,
      content: newComment,
      email: userEmail
    })
    .then(() => {
      setNewComment("");
      fetchComments();
    })
    .catch((err) => {
      console.error(err);
      alert("댓글 작성에 실패했습니다.");
    });
  };

  // 댓글 수정
  const handleUpdateComment = (commentId) => {
    if (!editingContent.trim()) return;

    axios.patch(`http://localhost:8082/api/comments/${commentId}`, {
      content: editingContent,
      email : userEmail
    })
      .then(() => {
        setEditingCommentId(null);
        setEditingContent("");
        fetchComments();
      })
      .catch((err) => {
        console.error(err);
        alert("댓글 수정 실패");
      });
  };

  // 댓글 삭제
  const handleDeleteComment = (commentId) => {
    const confirmed = window.confirm("댓글을 삭제할까요?");
    if (!confirmed) return;

    axios.request({
      method: "delete",
      url: `http://localhost:8082/api/comments/${commentId}`,
      data: {
        commentId: commentId, 
        email: userEmail       
      }
    })
      .then(() => {
        alert("댓글이 삭제되었습니다.");
        fetchComments();
      })
      .catch((err) => {
        console.error(err);
        alert("삭제 실패: " + (err.response?.data || "서버 에러"));
      });
  };

  // 게시글 삭제
    const handleDelete = async () => {
        const confirm = window.confirm("정말 삭제하시겠습니까?");
        if (!confirm) return;
    
        try {
          await axios.delete(`http://localhost:8082/api/boards/${id}/delete`);
          alert("게시글이 삭제되었습니다.");
          navigate("/list");
        } catch (error) {
          console.error(error);
          alert("삭제 실패");
        }
      };

  if (!post) return <div>로딩 중</div>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "left" }}>
      <h2>제목 : {post.title}</h2>
      <p><strong>작성자 : </strong> {post.member.name}</p>
      <p><strong>작성일 : </strong> {post.createdDatetime}</p>
      <p><strong>조회수 :</strong> {post.hitCnt}</p>
      <hr />
      <p><strong>내용:</strong></p>
      <p>{post.contents}</p>
      
      {post.fileList && post.fileList.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <h4>첨부파일</h4>
          <ul>
            {post.fileList.map((file, index) => (
              <li key={index}>
                <a href={`http://localhost:8082/uploads/${file.storedFilePath}`} target="_blank" rel="noreferrer">
                  {file.originalFileName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <hr />
      <h3>💬 댓글</h3>
      {comments.map((comment) => (
        <div key={comment.commentId} style={{ borderBottom: "1px solid #ccc", padding: "8px 0" }}>
          {editingCommentId === comment.commentId ? (
            <>
              <textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                style={{ width: "100%" }}
              />
              <button onClick={() => handleUpdateComment(comment.commentId)}>저장</button>
              <button onClick={() => setEditingCommentId(null)}>취소</button>
            </>
          ) : (
            <>
              <p>{comment.content}</p>
              <div style={{ fontSize: "0.9em", color: "#777" }}>
                {comment.member?.name} | {comment.createdDatetime}
                {comment.member?.email === userEmail && (
                  <>
                    <button
                      onClick={() => {
                        setEditingCommentId(comment.commentId);
                        setEditingContent(comment.content);
                      }}
                      style={{ marginLeft: 10 }}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.commentId)}
                      style={{ marginLeft: 10, color: "red" }}
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      ))}

      <div style={{ marginTop: "10px" }}>
        <textarea
          rows="3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          style={{ width: "100%", resize: "none" }}
        />
        <button onClick={handleCommentSubmit} style={{ marginTop: 5 }}>
          등록
        </button>
      </div>
      <hr />
      <button onClick={() => navigate(`/list`)}>목록으로</button>
      <button onClick={() => navigate(`/edit/${id}`)} style={{ marginLeft: "10px"}}> 수정</button>
      <button onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}>  삭제 </button>

    </div>
  );
}

export default PostDetail;
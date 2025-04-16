import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useAuth } from "@/context/AuthContext";

export default function MemberEditPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [form, setForm] = useState({
    password: "",
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        password: "",
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`http://localhost:8082/api/members/${user?.email}`, form);
      alert("회원정보가 수정되었습니다");
      router.push("/");
    } catch (err) {
      alert("수정 실패");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("정말 회원탈퇴 하시겠습니까?")) return;
    try {
      await axios.delete(`http://localhost:8082/api/members/${user?.email}`);
      alert("탈퇴 완료");
      logout();
      router.push("/");
    } catch (err) {
      alert("탈퇴 실패");
      console.error(err);
    }
  };

  return (
    <Container>
      <Title>회원정보 수정</Title>

      <Label>아이디 (이메일)</Label>
      <InfoText>{user?.email}</InfoText>

      <Label>비밀번호</Label>
      <Input name="password" type="password" placeholder="새 비밀번호" onChange={handleChange} />

      <Label>이름</Label>
      <Input name="name" placeholder="이름" value={form.name} onChange={handleChange} />

      <Label>전화번호</Label>
      <Input name="phone" placeholder="전화번호" value={form.phone} onChange={handleChange} />

      <Label>주소</Label>
      <Input name="address" placeholder="주소" value={form.address} onChange={handleChange} />

      <Button onClick={handleUpdate}>회원정보 수정</Button>
      <DeleteButton onClick={handleDelete}>회원탈퇴</DeleteButton>
    </Container>
  );
}

// 스타일
const Container = styled.div`
  max-width: 480px;
  margin: 4rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.3rem;
  display: block;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-bottom: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  margin-top: 1rem;
  background-color: #4f46e5;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #4338ca;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ef4444;
  margin-top: 0.75rem;
  &:hover {
    background-color: #dc2626;
  }
`;

const InfoText = styled.div`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-bottom: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f5f5f5;
  font-size: 1rem;
  color: #555;
`;

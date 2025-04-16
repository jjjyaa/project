import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { SearchBarProps } from "@/types/post-type";

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("title");

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCategory(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm, searchCategory); // 검색어와 카테고리 부모에게 전달
  };

  return (
    <SearchSection>
      <SearchBox onSubmit={handleSubmit}>
        <SearchOptions>
          <SearchSelectbox
            value={searchCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">통합검색</option>
            <option value="title">제목</option>
            <option value="email">작성자</option>
          </SearchSelectbox>
        </SearchOptions>
        <SearchInput>
          <SearchText
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder="검색어를 입력하세요"
          />
          <SearchButton type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </SearchButton>
        </SearchInput>
      </SearchBox>
    </SearchSection>
  );
}

// Styled Components
const SearchSection = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  width: 100%;
  flex-grow: 1;
`;

const SearchBox = styled.form`
  width: 300px;
  height: 40px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 40px;
  padding: 1px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchOptions = styled.div`
  margin-right: 10px;
`;

const SearchSelectbox = styled.select`
  border: none;
  padding: 5px;
  outline: none;
  background: none;
  font-size: 16px;
  width: 95px;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchText = styled.input`
  border: none;
  background: none;
  outline: none;
  padding: 0px;
  color: black;
  font-size: 16px;
  line-height: 37px;
  width: 200px;
`;

const SearchButton = styled.button`
  color: black;
  width: 40px;
  height: 100%;
  border-radius: 50%;
  background: white;
  border: none;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  right: 10px;
`;

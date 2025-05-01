"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";

const SearchInputWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    width: 60%;
    margin-bottom: 2rem;
`

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  border-radius: 8px;
  font-size: 1rem;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 60%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  border-radius: 12px;
  max-height: 15rem;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 10;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    border-radius: 12px;
    border: 2px solid ${({ theme }) => theme.colors.white};
  }
`;

const DropdownItem = styled.li`
  padding: 0.75rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

interface Props {
    availableSchools: { id: number; name: string; score: number }[];
    onSelectSchool: (school: { id: number; name: string; score: number }) => void;
  }
  
  const SearchSchoolInput: React.FC<Props> = ({ availableSchools, onSelectSchool }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<typeof availableSchools>([]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      if (term.trim() === "") {
        setSearchResults([]);
      } 
      else {
        setSearchResults(
          availableSchools.filter((school) =>
            school.name.toLowerCase().includes(term.toLowerCase())
          )
        );
      }
    };
  
    return (
      <SearchInputWrapper>
        <SearchInput
          type="text"
          placeholder="Search for a school to add..."
          value={searchTerm}
          onChange={handleChange}
        />
        {searchResults.length > 0 && (
          <Dropdown>
            {searchResults.map((school) => (
              <DropdownItem
                key={school.id}
                onClick={() => {
                  onSelectSchool(school);
                  setSearchTerm("");
                  setSearchResults([]);
                }}
              >
                {school.name}
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </SearchInputWrapper>
    );
  };
  export default SearchSchoolInput;
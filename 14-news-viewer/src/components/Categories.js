import React from 'react';
import styled from 'styled-components';

const categories = [
  {
    name: 'all',
    text: '전체보기',
  },
  {
    name: 'business',
    text: '비즈니스',
  },
  {
    name: 'entertainment',
    text: '엔터테인먼트',
  },
  {
    name: 'health',
    text: '건강',
  },
  {
    name: 'science',
    text: '과학',
  },
  {
    name: 'sports',
    text: '스포츠',
  },
  {
    name: 'technology',
    text: '기술',
  },
];

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled.div`
  font-size: 1.125rem;
  cursor: pointer;
  /* 이 짧은 단어 안에서 왜 연속공백유지를 설정했나? 없어도 차이가 없음 */
  white-space: pre;
  text-decoration: none;
  /* 부모 속성 물려받기 */
  color: inherit;
  padding-bottom: 0.25rem;
  &:hover {
    color: #495057;
  }

  /* 자기자신 + 자기자신 선택 */
  & + & {
    margin-left: 1rem;
  }
`;

function Categories() {
  return (
    <CategoriesBlock>
      {categories.map(category => (
        <Category key={category.name}>{category.text}</Category>
      ))}
    </CategoriesBlock>
  );
}

export default Categories;
import { ReactNode } from 'react';
import styled from 'styled-components';

interface StyledProps {
  imageUrl: string;
}

interface Props {
  imageUrl: string;
  children?: ReactNode;
  onClick: () => void;
}

const QuizTopic = styled.a<StyledProps>`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: 0.3s;
  display: block;
  height: 60px;

  > input {
    display: none;
  }

  a {
    text-decoration: none;
    color: #ffff;
  }

  &:hover,
  &:focus {
    opacity: 0.5;
  }

  background: url(${({ imageUrl }) => imageUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  > h1 {
    margin-top: 0;
  }

  > p {
    margin-top: 8px;
    margin-bottom: 0;
  }
`;

export default function Quiz({ imageUrl, onClick, children }: Props) {
  return (
    <QuizTopic imageUrl={imageUrl} onClick={onClick}>
      {children}
    </QuizTopic>
  );
}

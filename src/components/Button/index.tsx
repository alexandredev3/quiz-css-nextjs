/* eslint-disable react/require-default-props */
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const ButtonBase = styled.button`
  background-color: ${({ theme }) => theme.colors.buttonFilled};
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 0;
  width: 100%;
  padding: 10px 16px;
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
  outline: 0;
  transition: 0.3s;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: 0.5;
  }
  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.contrastText};
  }
`;

export default function Button({ children, disabled, type }: Props) {
  return (
    <ButtonBase
      as={motion.button}
      whileTap={{
        scale: 0.9,
      }}
      whileHover={{
        scale: 1.04,
      }}
      disabled={disabled}
      type={type}
    >
      {children}
    </ButtonBase>
  );
}

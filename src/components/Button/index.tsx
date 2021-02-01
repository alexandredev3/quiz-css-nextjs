/* eslint-disable react/require-default-props */
import { motion } from 'framer-motion';
import { ReactNode, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const ButtonBase = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
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

export default function Button({ children, ...rest }: Props) {
  return (
    <motion.div
      whileTap={{
        scale: 0.9,
      }}
      whileHover={{
        scale: 1.04,
      }}
    >
      <ButtonBase {...rest}>{children}</ButtonBase>
    </motion.div>
  );
}

import { useState, useCallback, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface StyledProps {
  isFilled: boolean;
  isFocus: boolean;
}

const InputBase = styled.div<StyledProps>`
  > input {
    outline: 0;
    width: 100%;
    padding: 10px 16px;
    background: transparent;
    border-radius: 4px;
    border: 1.8px solid ${({ theme }) => theme.colors.inputBorder};
    padding: 15px;
    margin-bottom: 26px;
    color: ${({ theme }) => theme.colors.contrastText};
    font-size: 14px;

    &::placeholder {
      color: ${({ theme }) => theme.colors.inputPlaceholder};
    }

    ${({ isFilled, theme }) =>
      isFilled &&
      css`
        border: 1.8px solid ${theme.colors.primary};
      `};

    ${({ isFocus, theme }) =>
      isFocus &&
      css`
        border: 1.8px solid ${theme.colors.primary};
      `};
  }
`;

export default function Input({ value, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  const [isFocus, setIsFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocus(true);
  }, [isFocus]);

  const handleInputBlur = useCallback(() => {
    setIsFocus(false);

    setIsFilled(!!value);
  }, [isFilled, isFocus, value])

  return (
    <InputBase
      isFocus={isFocus}
      isFilled={isFilled}
    >
      <input 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        { ...rest }
      />
    </InputBase>
  )
}
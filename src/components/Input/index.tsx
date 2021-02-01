import { motion, useAnimation, Variants } from 'framer-motion';
import { useState, useCallback, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error: string | null;
}

interface StyledProps {
  error: string | null;
}

const InputBase = styled.div<StyledProps>`
  position: relative;

  span {
    width: 100%;
    height: 2px;
    content: '';
    background: ${({ theme, error }) =>
      error ? theme.colors.wrong : theme.colors.primary};
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    margin-bottom: ${({ error }) => (error ? '36px' : '26px')};
    z-index: 9999;
  }

  p {
    margin-top: -16px;
    color: ${({ theme }) => theme.colors.wrong};
  }

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
  }
`;

export default function Input({ value, error, ...rest }: Props) {
  const controls = useAnimation();
  const [isFocus, setIsFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const variants: Variants = {
    visible: {
      scaleX: 1,
    },
    hidden: {
      scaleX: 0,
    },
  };

  if (isFocus || isFilled || error) {
    controls.start('visible');
  } else {
    controls.start('hidden');
  }

  const handleInputFocus = useCallback(() => {
    setIsFocus(true);
  }, [isFocus]);

  const handleInputBlur = useCallback(() => {
    setIsFocus(false);

    setIsFilled(!!value);
  }, [isFilled, isFocus, value]);

  return (
    <InputBase error={error}>
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        {...rest}
      />
      {error && (
        <motion.p
          variants={{
            show: {
              opacity: 1,
              y: 0,
            },
            hidden: {
              opacity: 0,
              y: '-20px',
            },
          }}
          initial="hidden"
          animate="show"
        >
          {error}
        </motion.p>
      )}
      <motion.span
        transition={{ duration: 0.2, damping: 30 }}
        variants={variants}
        animate={controls}
      />
    </InputBase>
  );
}

import styled, { keyframes } from 'styled-components';

const animation = keyframes`
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
`;

const CorrectIconBase = styled.div`
  .secodary__circle {
    animation-name: ${animation};
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
  }
`;

export default function CorrectIcon() {
  return (
    <CorrectIconBase>
      <svg
        width="43"
        height="43"
        viewBox="0 0 43 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="secodary__circle"
          cx="21.5"
          cy="21.5"
          r="21.5"
          fill="#4CAF50"
          fillOpacity="0.2"
        />
        <circle cx="21.4999" cy="21.5" r="16.5385" fill="white" />
        <path
          d="M21.4999 4.96155C12.4037 4.96155 4.96143 12.4039 4.96143 21.5C4.96143 30.5962 12.4037 38.0385 21.4999 38.0385C30.596 38.0385 38.0383 30.5962 38.0383 21.5C38.0383 12.4039 30.596 4.96155 21.4999 4.96155ZM28.446 18.6885L20.5076 26.6269C19.846 27.2885 18.8537 27.2885 18.1922 26.6269L14.5537 22.9885C13.8922 22.3269 13.8922 21.3346 14.5537 20.6731C15.2153 20.0115 16.2076 20.0115 16.8691 20.6731L19.3499 23.1539L26.1307 16.3731C26.7922 15.7115 27.7845 15.7115 28.446 16.3731C29.1076 17.0346 29.1076 18.0269 28.446 18.6885Z"
          fill="#4CAF50"
        />
      </svg>
    </CorrectIconBase>
  );
}

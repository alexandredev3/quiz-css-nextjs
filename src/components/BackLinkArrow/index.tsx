import Link from 'next/link';
import styled from 'styled-components';

interface Props {
  href: string;
}

const StyledLink = styled(Link)`
  transition: 0.3s;
  &:hover {
    opacity: 0.5;
  }
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const SVG = styled.svg`
  vertical-align: middle;
`;

export default function BackLinkArrow({ href }: Props) {
  return (
    <StyledLink href={href}>
      <SVG
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
          fill="white"
          fillOpacity="0.87"
        />
      </SVG>
    </StyledLink>
  );
}

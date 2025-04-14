"use client";

import Image from "next/image";
import styled, { css } from "styled-components";
import { useInView } from "react-intersection-observer";

// 📱 모바일 반응형 헬퍼
const mobile = css`
  @media (max-width: 600px) {
    ${(props: any) => css`
      left: ${props.$mobileLeft || props.$left || "auto"};
      right: ${props.$mobileRight || props.$right || "auto"};
      top: ${props.$mobileTop || props.$top || "auto"};
      bottom: ${props.$mobileBottom || props.$bottom || "auto"};
    `}
  }
`;

// 💡 애니메이션 + 반응형 이미지 컴포넌트 스타일
const ImageElement = styled.div<{
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
  $width?: string;
  $height?: string;
  $zIndex?: number;
  $visible?: boolean;
  $mobileLeft?: string;
  $mobileRight?: string;
  $mobileBottom?: string;
  $mobileTop?: string;
}>`
  position: absolute;
  top: ${(props) => props.$top || "auto"};
  left: ${(props) => props.$left || "auto"};
  right: ${(props) => props.$right || "auto"};
  bottom: ${(props) => props.$bottom || "auto"};
  width: ${(props) => props.$width || "auto"};
  height: ${(props) => props.$height || "auto"};
  z-index: ${(props) => props.$zIndex || 1};

  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;

  ${(props) =>
    props.$visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}

  ${mobile}
`;

interface AnimatedImageProps {
  src: string;
  alt: string;
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
  $width?: string;
  $height?: string;
  $zIndex?: number;
  $mobileLeft?: string;
  $mobileRight?: string;
  $mobileBottom?: string;
  $mobileTop?: string;
}

const AnimatedImage = ({ src, alt, ...styleProps }: AnimatedImageProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <ImageElement ref={ref} $visible={inView} {...styleProps}>
      <Image src={src} alt={alt} fill style={{ objectFit: "contain" }} />
    </ImageElement>
  );
};

export default AnimatedImage;

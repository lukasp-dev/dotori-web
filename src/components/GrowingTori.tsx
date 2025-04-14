"use client";

import Image from "next/image";
import images from "@/constants/images.json";
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
  $mobileWidth?: string;
  $mobileHeight?: string;
  $hideOnMobile?: boolean;
  $tabletLeft?: string;
  $tabletRight?: string;
  $tabletBottom?: string;
  $tabletTop?: string;
  $tabletWidth?: string;
  $tabletHeight?: string;
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
  transition: opacity 1.5s ease-out, transform 1.5s ease-out;

  ${(props) =>
    props.$visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}

  ${mobile}
  @media (max-width: 600px) {
    width: ${(props) => props.$mobileWidth || props.$width || "auto"};
    height: ${(props) => props.$mobileHeight || props.$height || "auto"};
    display: ${(props) => (props.$hideOnMobile ? "none" : "block")};
  }

  @media (min-width: 601px) and (max-width: 1024px) {
    left: ${(props) => props.$tabletLeft || props.$left || "auto"};
    right: ${(props) => props.$tabletRight || props.$right || "auto"};
    top: ${(props) => props.$tabletTop || props.$top || "auto"};
    bottom: ${(props) => props.$tabletBottom || props.$bottom || "auto"};
    width: ${(props) => props.$tabletWidth || props.$width || "auto"};
    height: ${(props) => props.$tabletHeight || props.$height || "auto"};
  }
`;

// 🖼️ 감지된 후 나타나는 이미지 컴포넌트
const AnimatedImage = ({
  src,
  alt,
  ...styleProps
}: {
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
  $mobileWidth?: string;
  $mobileHeight?: string;
  $hideOnMobile?: boolean;
  $tabletLeft?: string;
  $tabletRight?: string;
  $tabletBottom?: string;
  $tabletTop?: string;
  $tabletWidth?: string;
  $tabletHeight?: string;
}) => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <ImageElement ref={ref} $visible={inView} {...styleProps}>
      <Image src={src} alt={alt} fill style={{ objectFit: "contain" }} />
    </ImageElement>
  );
};

// 🌱 메인 컴포넌트
const SceneWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100vh;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 6rem 0;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    padding: 3rem 0;
    overflow: visible;
  }
`;

// 📝 텍스트 스타일
const TextContent = styled.div`
  flex: 1;
  padding: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  max-width: 400px;
  padding-top: 0rem;
  padding-bottom: 8rem;

  @media (min-width: 1024px) {
    font-size: 2rem;
    padding-left: 4rem;
  }

  @media (max-width: 1024px) {
    padding: 2rem;
    max-width: 100%;
  }
`;

const TextParagraph = styled.p<{ $visible: boolean }>`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1.5s ease, transform 1.5s ease;
  margin-bottom: 15rem;
  font-weight: 800;
  color: ${(props) => props.theme.colors.textPrimary};

  &:last-child {
    margin-bottom: 0;
  }

  ${({ $visible }) =>
    $visible &&
    `
    opacity: 1;
    transform: translateY(0);
  `}
`;

// 🎨 이미지 컨테이너
const ImageContainer = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  min-height: 500px;

  @media (max-width: 1024px) {
    min-height: 800px;
    width: 100%;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    min-height: 600px;
  }
`;

const GrowingTori = () => {
  const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.3 });
  const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.3 });
  const { ref: ref3, inView: inView3 } = useInView({ threshold: 0.3 });

  return (
    <SceneWrapper>
      <ImageContainer>
        {/* 배경 도로 */}
        <ImageElement $width="100%" $height="100%" $zIndex={1} $visible>
          <Image
            src={images["road"]}
            alt="Road background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </ImageElement>

        {/* 왼쪽 나무 */}
        <AnimatedImage
          src={images["tree"]}
          alt="Tree"
          $bottom="100px"
          $left="0"
          $mobileLeft="-30px"
          $width="500px"
          $height="500px"
          $mobileWidth="220px"
          $mobileHeight="220px"
          $tabletWidth="350px"
          $tabletHeight="350px"
          $tabletBottom="180px"
          $tabletLeft="-50px"
          $zIndex={2}
        />

        {/* 아래쪽 달리는 토리 */}
        <AnimatedImage
          src={images["tori_running"]}
          alt="Running Tori"
          $bottom="40px"
          $left="25%"
          $mobileLeft="25%"
          $width="450px"
          $height="450px"
          $mobileWidth="200px"
          $mobileHeight="200px"
          $tabletWidth="400px"
          $tabletHeight="400px"
          $tabletBottom="40px"
          $tabletLeft="28%"
          $zIndex={3}
        />

        {/* 오른쪽 그루터기 위 토리 */}
        <AnimatedImage
          src={images["stump-low"]}
          alt="Stump"
          $bottom="520px"
          $right="30%"
          $mobileRight="15%"
          $width="250px"
          $height="250px"
          $mobileWidth="150px"
          $mobileHeight="150px"
          $tabletWidth="200px"
          $tabletHeight="200px"
          $tabletBottom="440px"
          $tabletRight="20%"
          $zIndex={2}
          $hideOnMobile
        />
        <AnimatedImage
          src={images["tori"]}
          alt="Tori on stump"
          $bottom="620px"
          $right="30%"
          $mobileRight="15%"
          $width="250px"
          $height="250px"
          $mobileWidth="150px"
          $mobileHeight="150px"
          $tabletWidth="200px"
          $tabletHeight="200px"
          $tabletBottom="520px"
          $tabletRight="20%"
          $zIndex={3}
          $hideOnMobile
        />

        {/* 위쪽 도토리 든 토리 */}
        <AnimatedImage
          src={images["tori_with_acorn"]}
          alt="Tori with acorn"
          $top="-20px"
          $left="10%"
          $mobileLeft="5%"
          $width="150px"
          $height="150px"
          $mobileWidth="100px"
          $mobileHeight="100px"
          $tabletWidth="180px"
          $tabletHeight="180px"
          $tabletTop="-30px"
          $tabletLeft="8%"
          $zIndex={3}
        />
      </ImageContainer>

      <TextContent>
        <TextParagraph ref={ref1} $visible={inView1}>
          If you bring your dreams — your dotori — with you...
        </TextParagraph>
        <TextParagraph ref={ref2} $visible={inView2}>
          we'll help you grow that dotori into something strong.
        </TextParagraph>
        <TextParagraph ref={ref3} $visible={inView3}>
          so that you walk out with your dream coming true.
        </TextParagraph>
      </TextContent>
    </SceneWrapper>
  );
};

export default GrowingTori;

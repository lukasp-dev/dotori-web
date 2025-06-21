"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import UploadPrompt from "@/components/common/UploadPrompt";
import Image from "next/image";

const ImageWrapper = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const TitleWrapper = styled.span`  
  font-weight: 700;
`;

const SignInPrompt = () => {
  const router = useRouter();

  return (
    <UploadPrompt
      title={
        <ImageWrapper>
          <Image
            src="https://storage.googleapis.com/dotori-public-assets/images/tori_face.png"
            alt="Tori"
            width={40}
            height={40}
          />
          <TitleWrapper>
            Welcome to Dotori!
          </TitleWrapper>
        </ImageWrapper>
      }
      message="Please sign in to start your college application journey with Tori."
      buttonLabel="Log In"
      onClick={() => router.push("/login")}
    />
  );
};

export default SignInPrompt; 
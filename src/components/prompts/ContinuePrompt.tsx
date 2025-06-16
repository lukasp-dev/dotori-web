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

const ContinuePrompt = () => {
  const router = useRouter();

  const handleContinue = () => {
    const resumeUploaded = localStorage.getItem("resumeUploaded") === "true";
    const personalInfoCompleted = localStorage.getItem("personalInfoCompleted") === "true";
    const recommendCompleted = localStorage.getItem("recommendCompleted") === "true";
    const cartCompleted = localStorage.getItem("cartCompleted") === "true";
    const paymentCompleted = localStorage.getItem("paymentCompleted") === "true";

    if (!resumeUploaded) {
      router.push("/");
      return;
    }
    if (!personalInfoCompleted) {
      router.push("/");
      return;
    }
    if (!recommendCompleted) {
      router.push("/recommend");
      return;
    }
    if (!cartCompleted) {
      router.push("/cart");
      return;
    }
    if (!paymentCompleted) {
      router.push("/payment");
      return;
    }
    router.push("/dashboard");
  };

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
            Tori was waiting for you!
          </TitleWrapper>
        </ImageWrapper>
      }
      message="Continue where you left off in your admission process."
      buttonLabel="Continue"
      onClick={handleContinue}
    />
  );
};

export default ContinuePrompt; 

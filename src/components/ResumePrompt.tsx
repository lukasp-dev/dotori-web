import UploadPrompt from "@/components/common/UploadPrompt";
import { useSession } from "next-auth/react";

const ResumeStep = () => {
  const { data: session } = useSession();
  if (!session) return null;

  return (
    <UploadPrompt
      title={`Hi, ${session.user?.name} 👋`}
      message="To start your admission, please upload your resume."
      buttonLabel="Upload Resume"
      uploadConfig={{
        modalTitle: "Upload Resume",
        description: "Please upload your resume here.",
        accept: ".pdf,.doc,.docx",
        onUpload: (file) => {
          console.log("Resume uploaded:", file.name);
        },
      }}
    />
  );
};

export default ResumeStep;

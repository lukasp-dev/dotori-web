"use client";

import { useSession } from "next-auth/react";
import UploadPrompt from "@/components/common/UploadPrompt";
import { useRouter } from "next/navigation";

const DashboardPrompt = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading" || !session) return null;

  return (
    <>   
      <UploadPrompt
        title={`All set ${session.user?.name}!`}
        message="Click the button below to view your Dashboard."
        buttonLabel="Dashboard"
        onClick={() => router.push("/dashboard")}
      />
    </>
  );
};

export default DashboardPrompt;
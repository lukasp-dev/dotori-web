"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import UploadModal from "@/components/common/modals/UploadModal";
import { getUserId } from "@/lib/auth/user";
import { getAccessToken } from "@/lib/auth/tokenStorage";

const Container = styled.div`
  max-width: 100%;
  width: 100%;
  margin: 0;
  padding: 0.5rem;
  background-color: white;
  border-radius: 0;
  box-shadow: none;
  padding: 4rem 0 0 0;

  @media (max-width: 768px) {
    margin: 0;
    padding: 0.25rem;
  }
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0.5rem 0;
  padding: 0 0.5rem;
`;

const ResumeSection = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  margin-top: 1rem;
`;

const ResumeViewer = styled.iframe`
  width: 100%;
  height: calc(100vh - 50px);
  min-height: 1200px;
  border: none;
  border-radius: 0;
  margin-top: 0;
  background-color: white;

  @media (max-width: 768px) {
    height: calc(100vh - 40px);
    min-height: 1000px;
  }
`;

const NoResume = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: #f8f9fa;
  border-radius: 0.5rem;
`;

const ActionButton = styled.button`
  background-color: white;
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const ResumeView = () => {
  const { data: session } = useSession();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentResume, setCurrentResume] = useState<{ name: string; url: string; contentType?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const userId = getUserId();
        const accessToken = getAccessToken();
        if (!userId) return;
        
        if (!accessToken) {
          console.error('No access token found');
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload/${userId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const resumeUrl = await response.text();
        
        if (response.ok && resumeUrl) {
          setCurrentResume({
            name: 'Resume',
            url: resumeUrl
          });
        }
      } catch (error) {
        console.error('Failed to fetch resume:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchResume();
    }
  }, [session]);

  const handleResumeUpload = async (file: File) => {
    console.log('ResumeView: handleResumeUpload called with file:', file);
    try {
      const userId = getUserId();
      const accessToken = getAccessToken();
      console.log('ResumeView: userId from getUserId:', userId);
      
      if (!userId) {
        console.error('ResumeView: No userId found');
        return;
      }

      if (!accessToken) {
        console.error('ResumeView: No access token found');
        alert('Please login again');
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);

      console.log('ResumeView: Sending upload request to:', `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload/resume`);
      const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload/resume`, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      console.log('ResumeView: Upload response status:', uploadResponse.status);
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error('ResumeView: Upload failed with response:', errorText);
        throw new Error("Failed to upload resume");
      }

      console.log('ResumeView: Upload successful, fetching updated resume...');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload/${userId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const resumeUrl = await response.text();
      console.log('ResumeView: Updated resume URL:', resumeUrl);
      
      if (response.ok && resumeUrl) {
        setCurrentResume({
          name: 'Resume',
          url: resumeUrl
        });
        console.log('ResumeView: Resume state updated');
      }
    } catch (error) {
      console.error('ResumeView: Error in handleResumeUpload:', error);
      alert('Failed to upload resume. Please try again.');
    }
  };

  const getResumeViewerUrl = (url: string, contentType?: string) => {
    if (!contentType) return url;
    
    // PDF 파일은 직접 표시
    if (contentType === 'application/pdf') {
      return url;
    }
    
    // DOC, DOCX 파일은 Google Docs Viewer 사용
    if (contentType.includes('word') || contentType.includes('document')) {
      return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
    }
    
    // 기타 파일은 기본 URL 반환
    return url;
  };

  if (!session?.user) {
    return null;
  }

  if (isLoading) {
    return (
      <Container>
        <Title>Resume</Title>
        <NoResume>
          <p>Loading...</p>
        </NoResume>
      </Container>
    );
  }

  return (
    <Container>
      {currentResume ? (
        <ResumeSection>
          <ResumeViewer
            src={getResumeViewerUrl(currentResume.url, currentResume.contentType)}
            title="Resume Preview"
          />
        </ResumeSection>
      ) : (
        <NoResume>
          <p style={{ marginBottom: '1rem' }}>No resume uploaded yet</p>
          <ActionButton onClick={() => setShowUploadModal(true)}>
            Upload Resume
          </ActionButton>
        </NoResume>
      )}

      {showUploadModal && (
        <UploadModal
          title="Upload Resume"
          description="Upload your resume in PDF, DOC, or DOCX format"
          onClose={() => setShowUploadModal(false)}
          onUpload={handleResumeUpload}
        />
      )}
    </Container>
  );
};

export default ResumeView; 
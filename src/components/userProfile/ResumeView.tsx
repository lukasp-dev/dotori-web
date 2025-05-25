"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import UploadModal from "@/components/common/modals/UploadModal";
import { getUserId } from "@/lib/auth/user";

const Container = styled.div`
  max-width: 50rem;
  width: 100%;
  margin: 8rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 0 1.25rem rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin: 2rem 1rem;
    padding: 1.5rem;
    width: auto;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 2rem;
`;

const ResumeSection = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  margin-top: 1rem;
`;

const ResumeFileName = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
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

const NoResume = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: #f8f9fa;
  border-radius: 0.5rem;
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
        if (!userId) return;
        
        const response = await fetch(`/api/resume?userId=${userId}`);
        const resumeData = await response.json();
        
        if (response.ok && resumeData) {
          setCurrentResume(resumeData);
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
    try {
      const userId = getUserId();
      if (!userId) return;

      // After successful upload, fetch the updated resume
      const response = await fetch(`/api/resume?userId=${userId}`);
      const resumeData = await response.json();
      
      if (response.ok && resumeData) {
        setCurrentResume(resumeData);
      }
    } catch (error) {
      console.error('Failed to handle resume upload:', error);
    }
  };

  const handleViewResume = () => {
    if (currentResume?.url) {
      window.open(currentResume.url, '_blank');
    }
  };

  if (!session?.user) {
    return null;
  }

  if (isLoading) {
    return (
      <Container>
        <Title>Resume Management</Title>
        <NoResume>
          <p>Loading...</p>
        </NoResume>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Resume Management</Title>
      
      {currentResume ? (
        <ResumeSection>
          <ResumeFileName>
            📄 {currentResume.name}
            {currentResume.contentType && (
              <span style={{ fontSize: '0.8rem', color: '#666', marginLeft: '0.5rem' }}>
                ({currentResume.contentType})
              </span>
            )}
          </ResumeFileName>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <ActionButton onClick={handleViewResume}>
              View Resume
            </ActionButton>
            <ActionButton onClick={() => setShowUploadModal(true)}>
              Replace Resume
            </ActionButton>
          </div>
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
import { getAccessToken } from "@/lib/auth/tokenStorage";
import axios from 'axios';

export interface InputData {
  highschoolCompletion: boolean;
  englishTestType: "TOEFL" | "IELTS" | "Duolingo";
  volunteer: number;
  alumniRelation: {
    hasRelation: boolean | null;
    schoolNames?: string[];
  };
  residency: {
    status: "Domestic" | "International";
    country?: string;
    state?: string;
  };
  gpa: number;
  testType: "SAT" | "ACT";
  typeScore: number;
  toefl: number;
  coursework: {
    english: number;
    math: number;
    science: number;
    scienceLab: number;
    language: number;
    social: number;
    arts: number;
  };
  englishTestScore: number;
}

export async function uploadPersonalInfo(data: InputData) {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error("From uploadPersonalInfo: No access token found");
  }

  try {
    const isInternational = data.residency.status === "International";
    const payload = {
      high_school_completion: data.highschoolCompletion ? 1 : 0,
      general_college_requirement: data.coursework,
      alumni: data.alumniRelation.hasRelation ? 1 : 0,
      first: data.alumniRelation.hasRelation ? 0 : 1,
      alumni_school_names: data.alumniRelation.hasRelation ? data.alumniRelation.schoolNames : [],
      residency: data.residency.status,
      state: isInternational ? "" : data.residency.state,
      country: isInternational ? data.residency.country : "",
      sat: data.testType === "SAT" ? data.typeScore : 0,
      act: data.testType === "ACT" ? data.typeScore : 0,
      gpa: data.gpa,
      volunteering_hours: data.volunteer,
      english_test_type: isInternational ? data.englishTestType : "",
      english_test_score: isInternational ? data.englishTestScore : 0,
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/uploadPersonalInfo`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
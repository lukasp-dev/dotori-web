import { getAccessToken } from "@/lib/auth/tokenStorage";
import axios from 'axios';

export interface InputData {
  highschoolCompletion: boolean;
  volunteer: number;
  alumniRelation: {
    hasRelation: boolean;
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
}

export async function uploadPersonalInfo(data: InputData) {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error("From uploadPersonalInfo: No access token found");
  }

  try {
    const payload = {
      high_school_completion: data.highschoolCompletion ? 1 : 0,
      general_college_requirement: data.coursework,
      alumni: data.alumniRelation.hasRelation ? 1 : 0,
      first: data.alumniRelation.hasRelation ? 0 : 1,
      alumni_school_names: data.alumniRelation.hasRelation ? data.alumniRelation.schoolNames : [],
      residency: data.residency.status,
      state: data.residency.status === "Domestic" ? data.residency.state : "",
      country: data.residency.status === "International" ? data.residency.country : "",
      sat: data.testType === "SAT" ? data.typeScore : 0,
      act: data.testType === "ACT" ? data.typeScore : 0,
      gpa: data.gpa,
      volunteering_hours: data.volunteer,
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
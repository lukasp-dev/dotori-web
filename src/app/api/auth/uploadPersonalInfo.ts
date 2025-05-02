"use client";

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

    const res = await fetch("http://localhost:8080/api/uploadPersonalInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to upload personal info");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
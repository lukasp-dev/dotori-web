export const isValidGPA = (gpa: number) => gpa >= 0 && gpa <= 4.0;

export const isValidSAT = (score: number) => score >= 400 && score <= 1600;

export const isValidACT = (score: number) => score >= 1 && score <= 36;

export const isValidTOEFL = (score: number) => score >= 0 && score <= 120;
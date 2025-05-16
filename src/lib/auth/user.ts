export function getUserId(): string {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      throw new Error("userId not found in localStorage");
    }
    return userId;
  }
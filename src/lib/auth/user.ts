export function getUserId(): string {
    const userId = localStorage.getItem("userId");
    if (userId) {
      return userId;
    }

    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        return parsedUserInfo.id || "";
      } catch (e) {
        console.error("Failed to parse userInfo:", e);
      }
    }

    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser.id || "";
      } catch (e) {
        console.error("Failed to parse user:", e);
      }
    }

    return "";
}
export function getInitials(name?: string | null): string {
    if(!name || typeof name !== "string") {
        return "U";
    }
    return name
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .toUpperCase();
}
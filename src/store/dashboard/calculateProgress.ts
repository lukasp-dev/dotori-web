export const calculateProgress = (steps: Record<string, boolean>): number => {
    const total = Object.keys(steps).length;
    const completed = Object.values(steps).filter(Boolean).length;
    return Math.round((completed / total) * 100);
};
  
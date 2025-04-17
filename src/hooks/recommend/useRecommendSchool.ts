import { useEffect, useState } from "react";

export type School = {
  id: number;
  name: string;
  price: number;
};
//demo
const mockFetchRecommendedSchools = async (): Promise<School[]> => {
  return Promise.resolve([
    { id: 1, name: "Georgia Institute Technology", price: 100 },
    { id: 2, name: "New York University", price: 100 },
    { id: 3, name: "University of Georgia", price: 100 },
    { id: 4, name: "University of Minnesota Twin Cities", price: 100 },
  ]);
};

const useRecommendSchool = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const items = await mockFetchRecommendedSchools();
      setSchools(items);
      setLoading(false);
    };
    load();
  }, []);

  return { schools, loading };
};

export default useRecommendSchool;

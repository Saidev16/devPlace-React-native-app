import { supabase } from "@/lib/supabase";
import { Task } from "@/types/types";
import { useEffect, useState } from "react";

const useFetchTasks = () => {
  const [customTasks, setCustomTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("custom_tasks").select();

      if (error) {
        console.log("err ", error);
        setError(error.message);
      } else {
        console.log("data", data);
        setCustomTasks(data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { customTasks, isLoading, error };
};

export default useFetchTasks;

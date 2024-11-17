import { supabase } from "@/lib/supabase";
import { Task } from "@/types/types";
import { useState } from "react";
import { Alert } from "react-native";

// const initialTask: Task = {};

export const useCreateTask = (
  isCustomTask: boolean
): {
  loading: boolean;
  saveData: (task: Task) => any;
} => {
  const [loading, setLoading] = useState(false);
  const saveData = async (task: Task) => {
    setLoading(true);
    console.log("submitting the task ,", task);
    try {
      await supabase.from("tasks").insert(task);
    } catch (error) {
      console.log(error);

      return { error };
    } finally {
      setLoading(false);
    }
  };

  return { saveData, loading };
};

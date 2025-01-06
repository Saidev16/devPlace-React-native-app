import { supabase } from "@/lib/supabase";
import { CustomTask, Task } from "@/types/types";
import { useState } from "react";
import { Alert } from "react-native";

// const initialTask: Task = {};

export const useCreateTask = (
  isCustomTask: boolean
): {
  loading: boolean;
  saveData: (task: Task) => any;
  saveCustomTask: (task: CustomTask) => any;
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

  const saveCustomTask = async (task: CustomTask) => {
    console.log("custom task 1,", task);
    setLoading(true);

    try {
      await supabase.from("custom_tasks").insert(task);
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return { saveData, loading, saveCustomTask };
};

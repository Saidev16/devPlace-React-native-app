import { supabase } from "@/lib/supabase";
import { chartDataPoint, selectedPeriodType } from "@/types/types";
import { getDateRange } from "@/utils";
import { transform } from "@babel/core";
import { useState } from "react";

export const useFetchAnalytics = async (
  period: selectedPeriodType
): Promise<{ data: chartDataPoint[]; loading: boolean; errorMsg: string }> => {
  const [data, setData] = useState<chartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const { startDate, endDate, labels } = getDateRange(period);

  try {
    setLoading(true);
    const { data: tasks, error } = await supabase
      .from("tasks")
      .select("date")
      .gte("date", startDate.toISOString())
      .lte("date", endDate.toISOString());
    if (error) {
      setErrorMsg(error.message ?? "An error occured while fetching data");
    }

    const transformedData = transformData(tasks, period, labels);
    setData(transformedData);
  } catch (error) {
    throw new Error("error fetching data");
  } finally {
    setLoading(false);
  }

  return { data, loading, errorMsg };
};

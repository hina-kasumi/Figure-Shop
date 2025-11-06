import { reportService } from "@/services/report-service";
import { FigureReport, UserReport } from "@/types/report";
import { useEffect, useState } from "react";

export function useUserReports(
  email?: string,
  sortBy?: "spent_desc" | "items_desc"
) {
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState<UserReport[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    reportService
      .getUserReports(email, sortBy)
      .then((data) => {
        setReports(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [email, sortBy]);

  return { reports, isLoading, error };
}

export function useFigureReports() {
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState<FigureReport[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    reportService
      .getFigureReports()
      .then((data) => {
        setReports(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { reports, isLoading, error };
}

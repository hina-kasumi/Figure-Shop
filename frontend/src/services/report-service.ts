import apiClient from "@/libs/http";

class ReportService {
  async getUserReports(email?: string, sortBy?: "spent_desc" | "items_desc") {
    const params = new URLSearchParams();
    if (email) {
      params.append("email", email);
    }

    if (sortBy) {
      params.append("sortBy", sortBy);
    }

    const response = await apiClient.get("/admin/users/report", { params });
    return response.data;
  }

  async getFigureReports() {
    const response = await apiClient.get("/admin/reports/sold-figures");
    return response.data;
  }
}

export const reportService = new ReportService();

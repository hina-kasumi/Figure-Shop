import apiClient from "@/libs/http";
import {
  Branch,
  Category,
  FigureDetailResponse,
  FigureForm,
} from "@/types/figure";
import { AxiosResponse } from "axios";

class FigureService {
  async getFigureById(id: string): Promise<FigureDetailResponse> {
    const response: AxiosResponse<FigureDetailResponse> =
      await apiClient.get<FigureDetailResponse>(`/fig/${id}`);

    return response.data;
  }
  async getAllFigures(
    keyword?: string,
    minPrice?: number,
    maxPrice?: number,
    branchId?: string,
    categoryId?: string,
    sortBy?: "hot_desc" | "price_asc" | "price_desc"
  ): Promise<FigureDetailResponse[]> {
    console.log(keyword, minPrice, maxPrice, branchId, categoryId, sortBy);

    if (keyword || minPrice || maxPrice || branchId || categoryId || sortBy) {
      const params: Record<string, string | number> = {};
      if (keyword) params.keyword = keyword;
      if (minPrice !== undefined) params.minPrice = minPrice;
      if (maxPrice !== undefined) params.maxPrice = maxPrice;
      if (branchId) params.branchId = branchId;
      if (categoryId) params.categoryId = categoryId;
      if (sortBy) params.sortBy = sortBy;

      const response: AxiosResponse<FigureDetailResponse[]> =
        await apiClient.get<FigureDetailResponse[]>(`/fig/search`, {
          params: params,
        });

      return response.data;
    } else {
      const response: AxiosResponse<FigureDetailResponse[]> =
        await apiClient.get<FigureDetailResponse[]>(`/fig`);

      return response.data;
    }
  }

  async CreateFigure(data: FigureForm): Promise<FigureDetailResponse> {
    const response: AxiosResponse<FigureDetailResponse> =
      await apiClient.post<FigureDetailResponse>(`/fig`, data);

    return response.data;
  }

  async UpdateFigure(data: FigureForm): Promise<FigureDetailResponse> {
    if (!data.id) {
      throw new Error("Figure ID is required for update");
    }

    const response: AxiosResponse<FigureDetailResponse> =
      await apiClient.put<FigureDetailResponse>(`/fig/${data.id}`, data);
    return response.data;
  }

  async DeleteFigure(id: string): Promise<void> {
    await apiClient.delete(`/fig/${id}`);
  }

  async getCategories(): Promise<Category[]> {
    const response: AxiosResponse<Category[]> = await apiClient.get<Category[]>(
      `/category`
    );
    return response.data;
  }

  async createCategory(name: string): Promise<Category> {
    const response: AxiosResponse<Category> = await apiClient.post<Category>(
      `/category`,
      { name }
    );
    return response.data;
  }

  async deleteCategory(id: string): Promise<void> {
    await apiClient.delete(`/category/${id}`);
  }

  async updateCategory(id: string, name: string): Promise<Category> {
    const response: AxiosResponse<Category> = await apiClient.put<Category>(
      `/category/${id}`,
      { name }
    );
    return response.data;
  }

  async getBranches(): Promise<Branch[]> {
    const response: AxiosResponse<Branch[]> = await apiClient.get<Branch[]>(
      `/branch`
    );
    console.log(response.data);

    return response.data;
  }

  async createBranch(name: string): Promise<Branch> {
    const response: AxiosResponse<Branch> = await apiClient.post<Branch>(
      `/branch`,
      { name }
    );
    return response.data;
  }

  async deleteBranch(id: string): Promise<void> {
    await apiClient.delete(`/branch/${id}`);
  }
  async updateBranch(id: string, name: string): Promise<Branch> {
    const response: AxiosResponse<Branch> = await apiClient.put<Branch>(
      `/branch/${id}`,
      { name }
    );
    return response.data;
  }
}

export const figureService = new FigureService();

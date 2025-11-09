import apiClient from "@/libs/http";
import {
  Branch,
  Category,
  CommentType,
  CreateFigureForm,
  FigureDetailResponse,
  FigureForm,
} from "@/types/figure";
import axios, { AxiosResponse } from "axios";
import { tokenService } from "./token";

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

    const params: Record<string, string | number> = {};
    if (keyword) params.keyword = keyword;
    if (minPrice !== undefined) params.minPrice = minPrice;
    if (maxPrice !== undefined) params.maxPrice = maxPrice;
    if (branchId) params.branchId = branchId;
    if (categoryId) params.categoryId = categoryId;
    if (sortBy) params.sortBy = sortBy;

    const response: AxiosResponse<FigureDetailResponse[]> = await apiClient.get<
      FigureDetailResponse[]
    >(`/fig/search`, {
      params: params,
    });

    return response.data;
  }

  async createFigure(data: CreateFigureForm): Promise<void> {
    const formData = new FormData();

    // Append các field cơ bản
    formData.append("Name", data.name);
    formData.append("BranchId", data.branchId);
    formData.append("CategoryId", data.categoryId);
    formData.append("Price", data.price.toString());
    formData.append("Quantity", data.quantity.toString());
    formData.append("Description", data.description);

    if (data.salePercent !== undefined)
      formData.append("SalePercent", data.salePercent.toString());

    // Append các file
    if (data.images) {
      Array.from(data.images).forEach((file) => {
        formData.append("Images", file);
      });
    }

    // Debug: In ra nội dung FormData trước khi gửi
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // Gửi request
    const response = await axios.post(
      "http://localhost:8080/fig", // URL backend thực tế
      formData,
      {
        headers: {
          Authorization: `Bearer ${tokenService.getToken()}`,
        },
      }
    );

    console.log(response);
    
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

  async getComments(figureId: string) {
    const response: AxiosResponse<CommentType[]> = await apiClient.get(
      `/fig/${figureId}/comments`
    );
    return response.data;
  }

  async postComment(figureId: string, content: string, vote: number) {
    const response: AxiosResponse<CommentType> = await apiClient.post(
      `/fig/${figureId}/comments`,
      {
        content,
        vote,
      }
    );
    return response.data;
  }
}

export const figureService = new FigureService();

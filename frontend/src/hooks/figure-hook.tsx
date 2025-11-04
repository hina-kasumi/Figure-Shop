import { figureService } from "@/services/figure-service";
import {
  Branch,
  Category,
  FigureDetailResponse,
  FigureForm,
} from "@/types/figure";
import { useEffect, useState } from "react";

export function useFigureDetail(id: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [figure, setFigure] = useState<FigureDetailResponse>({
    id: "",
    name: "",
    imgSrc: [],
    branchId: "",
    categoryId: "",
    price: 0,
    quantity: 0,
    description: "",
    vote: 0,
    branch: { id: "", name: "" },
    category: { id: "", name: "" },
    createdAt: "",
    createdBy: "",
  });
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (id) {
      figureService
        .getFigureById(id)
        .then((data: FigureDetailResponse) => {
          setFigure(data);
        })
        .catch(() => {
          setError(new Error("Failed to fetch figure details"));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  return {
    data: figure,
    isLoading: loading,
    error: error,
  };
}

export function useFigures(
  keyword?: string,
  minPrice?: number,
  maxPrice?: number,
  branchId?: string,
  categoryId?: string,
  sortBy?: "hot_desc" | "price_asc" | "price_desc"
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [figures, setFigures] = useState<FigureDetailResponse[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    figureService
      .getAllFigures(keyword, minPrice, maxPrice, branchId, categoryId, sortBy)
      .then((data: FigureDetailResponse[]) => {
        setFigures(data);
        console.log(data);
      })
      .catch(() => {
        setError(new Error("Failed to fetch figures"));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [keyword, minPrice, maxPrice, branchId, categoryId, sortBy]);

  return {
    data: figures,
    isLoading: loading,
    error: error,
  };
}

export function useCreateFigure() {
  const [loading, setLoading] = useState<boolean>(false);
  const createFigure = async (data: FigureForm) => {
    try {
      setLoading(true);
      const response = await figureService.CreateFigure(data);
      return response;
    } catch (error) {
      console.error("Failed to create figure:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { func: createFigure, isLoading: loading };
}

export function useUpdateFigure() {
  const [loading, setLoading] = useState<boolean>(false);
  const updateFigure = async (data: FigureForm) => {
    try {
      setLoading(true);
      const response = await figureService.UpdateFigure(data);
      return response;
    } catch (error) {
      console.error("Failed to update figure:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { func: updateFigure, isLoading: loading };
}

export function useDeleteFigure() {
  const [loading, setLoading] = useState<boolean>(false);
  const deleteFigure = async (id: string) => {
    try {
      setLoading(true);
      await figureService.DeleteFigure(id);
    } catch (error) {
      console.error("Failed to delete figure:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { func: deleteFigure, isLoading: loading };
}

export function useCategories() {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [realoadFlag, setReloadFlag] = useState<number>(0);

  function reload() {
    setReloadFlag((v) => v + 1);
  }

  function nameOfCategory(id: string): string {
    const category = categories.find((c) => c.id == id);
    console.log(categories, id, category);

    return category ? category.name : "";
  }

  useEffect(() => {
    setLoading(true);
    figureService
      .getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch(() => {
        setError(new Error("Failed to fetch categories"));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [realoadFlag]);
  return {
    data: categories,
    isLoading: loading,
    nameOfCategory,
    reload,
    error: error,
  };
}

export function useCategory() {
  function createCategory(name: string) {
    return figureService.createCategory(name);
  }
  function deleteCategory(id: string) {
    return figureService.deleteCategory(id);
  }
  function updateCategory(id: string, name: string) {
    return figureService.updateCategory(id, name);
  }
  return { createCategory, deleteCategory, updateCategory };
}

export function useBranches() {
  const [loading, setLoading] = useState<boolean>(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [realoadFlag, setReloadFlag] = useState<number>(0);

  function reload() {
    setReloadFlag((v) => v + 1);
  }

  function nameOfBranch(id: string): string {
    const branch = branches.find((b) => b.id === id);
    return branch ? branch.name : "";
  }

  useEffect(() => {
    setLoading(true);
    figureService
      .getBranches()
      .then((data) => {
        setBranches(data);
      })
      .catch(() => {
        setError(new Error("Failed to fetch branches"));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [realoadFlag]);
  return {
    data: branches,
    isLoading: loading,
    reload,
    nameOfBranch,
    error: error,
  };
}

export function useBranch() {
  function createBranch(name: string) {
    return figureService.createBranch(name);
  }
  function deleteBranch(id: string) {
    return figureService.deleteBranch(id);
  }
  function updateBranch(id: string, name: string) {
    return figureService.updateBranch(id, name);
  }
  return { createBranch, deleteBranch, updateBranch };
}

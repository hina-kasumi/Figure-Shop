export interface ResponseTemplate<T> {
  status: number;
  message: string;
  data: T | null;
}
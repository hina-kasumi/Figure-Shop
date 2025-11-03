export interface HookTemplate<T> {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
}

export interface HookCallback<RequestType, ResponseType> {
  func: (data: RequestType) => Promise<ResponseType>;
  isLoading: boolean;
}
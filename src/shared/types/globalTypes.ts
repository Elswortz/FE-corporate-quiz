export type AsyncState<T> = {
  data: T;
  isLoading: boolean;
  error: string | null;
};

export type OperationState = {
  isLoading: boolean;
  error: string | null;
};

export type RejectValue = string;

export type Pagination = {
  limit?: number;
  offset?: number;
};

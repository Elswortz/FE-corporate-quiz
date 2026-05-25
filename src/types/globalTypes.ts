export type PaginatedAsyncState<T> = {
  data: T;
  isLoading: boolean;
  error: string | null;
  meta: PaginationMeta | null;
};

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

export interface PaginationMeta {
  total: number;
  limit: number;
  offset: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface PaginatedResponse<T> {
  items: T;
  meta: PaginationMeta;
}

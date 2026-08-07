import { AsyncState, PaginatedAsyncState, OperationState } from '@/types/globalTypes';

export const initialAsyncState = <T>(data: T): AsyncState<T> => ({
  data,
  isLoading: false,
  error: null,
});

export const initialPaginatedAsyncState = <T>(data: T): PaginatedAsyncState<T> => ({
  data,
  isLoading: false,
  error: null,
  meta: null,
});

export const initialOperationState: OperationState = {
  isLoading: false,
  error: null,
};

import { AsyncState, OperationState, PaginatedAsyncState } from '@/types/globalTypes';
import { CompaniesState } from '../types/companiesStateTypes';
import { Company, CompanyDetails } from '../types/companiesTypes';

const initialAsyncState = <T>(data: T): AsyncState<T> => ({
  data,
  isLoading: false,
  error: null,
});

const initialPaginatedAsyncState = <T>(data: T): PaginatedAsyncState<T> => ({
  data,
  isLoading: false,
  error: null,
  meta: null,
});

const initialOperationState: OperationState = {
  isLoading: false,
  error: null,
};

const companiesState: CompaniesState = {
  lists: {
    all: initialPaginatedAsyncState<Company[]>([]),
    joined: initialPaginatedAsyncState<Company[]>([]),
    owned: initialPaginatedAsyncState<Company[]>([]),
  },
  selected: initialAsyncState<CompanyDetails | null>(null),
  mutations: {
    create: initialOperationState,
    update: initialOperationState,
    delete: initialOperationState,
    changeStatus: initialOperationState,
    changeLogo: initialOperationState,
    changeRole: initialOperationState,
    removeMember: initialOperationState,
    leave: initialOperationState,
  },
};

export default companiesState;

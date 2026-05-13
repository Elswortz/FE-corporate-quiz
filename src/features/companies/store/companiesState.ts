import { AsyncState, OperationState } from '@/shared/types/globalTypes';
import { CompaniesState } from '../types/companiesStateTypes';
import { Company, CompanyDetails } from '../types/companiesTypes';

const initialAsyncState = <T>(data: T): AsyncState<T> => ({
  data,
  isLoading: false,
  error: null,
});

const initialOperationState: OperationState = {
  isLoading: false,
  error: null,
};

const companiesState: CompaniesState = {
  lists: {
    all: initialAsyncState<Company[]>([]),
    joined: initialAsyncState<Company[]>([]),
    owned: initialAsyncState<Company[]>([]),
  },
  selected: initialAsyncState<CompanyDetails | null>(null),
  mutations: {
    create: initialOperationState,
    update: initialOperationState,
    delete: initialOperationState,
    changeStatus: initialOperationState,
    changeLogo: initialOperationState,
    removeMember: initialOperationState,
    leave: initialOperationState,
  },
};

export default companiesState;

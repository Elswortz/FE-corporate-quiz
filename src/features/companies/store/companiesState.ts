import { CompaniesState } from '../types/companiesStateTypes';
import { Company, CompanyDetails } from '../types/companiesTypes';
import { initialPaginatedAsyncState, initialAsyncState, initialOperationState } from '@/utils/initialStateHelpers';

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

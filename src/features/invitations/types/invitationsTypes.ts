import { Company, CompanyId } from '@/features/companies/types/companiesTypes';
import { User } from '@/features/users/types/userTypes';

export type InvitationId = string;
export type InvitationType = 'company_invite' | 'user_request';
export type InvitationStatus = 'pending' | 'accepted' | 'rejected';

export interface Invitation {
  id: InvitationId;
  company: Company;
  invited_user: User;
  invited_by: User;
  invitation_type: InvitationType;
  status: InvitationStatus;
}

export type sendInvitationDto = {
  company_id: CompanyId;
  invite_user_email: string;
};

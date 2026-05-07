import { Company, CompanyId } from './companiesTypes';
import { User } from '../../users/types/userTypes';

export interface Invitation {
  id: InvitationId;
  company: Company;
  invited_user: User;
  invited_by: User;
  invitation_type: InvitationType;
  status: InvitationStatus;
}

export type InvitationId = string;
export type InvitationType = 'company_invite' | 'user_request';
export type InvitationStatus = 'pending' | 'accepted' | 'rejected';

export type InviteUserDto = {
  company_id: CompanyId;
  invite_user_email: string;
};

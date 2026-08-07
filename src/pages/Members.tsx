import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Button,
  Chip,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { showNotification } from '../features/notifications/store/notificationsSlice';
import { changeMemberRole, removeCompanyMember } from '../features/companies/store/companiesThunks';
import { getUserRoleInCompany } from '@/utils/companyHelpers';
import { getRoleColor } from '@/utils/companyHelpers';
import { selectUserProfileData } from '@/features/users/store/usersSelectors';
import ConfirmModal from '../components/ui/ConfirmModal/ConfirmModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectSelectedCompany } from '@/features/companies/store/companiesSelectors';
import { CompanyRole, Member } from '@/features/companies/types/companiesTypes';
import { useTranslation } from 'react-i18next';

const Members = () => {
  const [isConfirmDialogOpen, setisConfirmDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const { t } = useTranslation('members');
  const dispatch = useAppDispatch();
  const selectedCompany = useAppSelector(selectSelectedCompany);
  const user = useAppSelector(selectUserProfileData);

  const roleOrder: Record<CompanyRole, number> = {
    owner: 0,
    admin: 1,
    member: 2,
  };

  const members = selectedCompany?.members || [];
  const sortedMembers = [...members].sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);

  if (!selectedCompany) return null;

  const role = getUserRoleInCompany(selectedCompany, user?.id);
  const isOwner = role === 'owner';
  // const isAdmin = role === 'admin';
  // const isMember = role === 'member';

  if (!selectedCompany) return null;

  const handleChangeRole = async (member: Member, role: CompanyRole) => {
    try {
      await dispatch(changeMemberRole({ companyId: selectedCompany.id, userId: member.id, role })).unwrap();
      dispatch(
        showNotification({
          message: `User ${member.first_name} ${member.last_name} role has been changed to ${role}`,
          severity: 'success',
        })
      );
    } catch (err: any) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || 'Failed to change role',
          severity: 'error',
        })
      );
    }
  };

  const handleRemove = async (member: Member) => {
    try {
      await dispatch(removeCompanyMember({ companyId: selectedCompany.id, userId: member.id })).unwrap();
      dispatch(
        showNotification({
          message: `${member.first_name} ${member.last_name} excluded from the company`,
          severity: 'success',
        })
      );
    } catch (err: any) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || 'Failed to exclude member',
          severity: 'error',
        })
      );
    } finally {
      setisConfirmDialogOpen(false);
      setSelectedMember(null);
    }
  };

  return (
    <>
      <Box>
        {sortedMembers?.length ? (
          <List>
            {sortedMembers.map(member => (
              <div key={member.id}>
                <ListItem
                  secondaryAction={
                    isOwner && member.role !== 'owner' ? (
                      <Box display="flex" gap={1} alignItems="center">
                        <FormControl
                          size="small"
                          sx={{
                            minWidth: 120,
                            '& .MuiOutlinedInput-root': {
                              height: 31,
                            },
                          }}
                        >
                          <Select
                            value={member.role}
                            onChange={e => handleChangeRole(member, e.target.value as CompanyRole)}
                          >
                            <MenuItem value="admin">{t('status.admin')}</MenuItem>
                            <MenuItem value="member">{t('status.member')}</MenuItem>
                          </Select>
                        </FormControl>

                        <Button
                          sx={{ height: 31 }}
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => {
                            setisConfirmDialogOpen(true);
                            setSelectedMember(member);
                          }}
                        >
                          {t('excludeButton')}
                        </Button>
                      </Box>
                    ) : null
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={member.avatar_url}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body1">
                          {member.first_name} {member.last_name}
                        </Typography>

                        <Chip
                          label={t(`status.${member.role}`)}
                          size="small"
                          color={getRoleColor(member.role)}
                          variant="outlined"
                        />
                      </Box>
                    }
                    secondary={member.email}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        ) : (
          <Typography color="text.secondary">No members yet</Typography>
        )}
      </Box>
      <ConfirmModal
        isOpen={isConfirmDialogOpen}
        title={t('confirmModal.title')}
        description={`${t('confirmModal.descriptionPart1')} ${selectedMember?.first_name} ${selectedMember?.last_name} ${t('confirmModal.descriptionPart2')}`}
        confirmText={t('confirmModal.confirmText')}
        confirmColor={'error'}
        onConfirm={() => {
          if (selectedMember) {
            handleRemove(selectedMember);
          }
        }}
        onCancel={() => setisConfirmDialogOpen(false)}
      />
    </>
  );
};

export default Members;

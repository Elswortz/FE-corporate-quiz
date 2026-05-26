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
} from '@mui/material';
import { useState } from 'react';
import { showNotification } from '../features/notifications/store/notificationsSlice';
import { removeCompanyMember } from '../features/companies/store/companiesThunks';
import { getUserRoleInCompany } from '@/utils/companyHelpers';
import { getRoleColor } from '@/utils/companyHelpers';
import { selectUserProfileData } from '@/features/users/store/usersSelectors';
import ConfirmModal from '../components/ui/ConfirmModal/ConfirmModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectSelectedCompany } from '@/features/companies/store/companiesSelectors';
import { Member } from '@/features/companies/types/companiesTypes';

const Members = () => {
  const [isConfirmDialogOpen, setisConfirmDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const dispatch = useAppDispatch();
  const selectedCompany = useAppSelector(selectSelectedCompany);
  const user = useAppSelector(selectUserProfileData);
  const members = selectedCompany?.members || [];

  if (!selectedCompany) return null;

  const role = getUserRoleInCompany(selectedCompany, user?.id);
  const isOwner = role === 'owner';
  // const isAdmin = role === 'admin';
  // const isMember = role === 'member';

  if (!selectedCompany) return null;

  const handleRemove = async (member: Member) => {
    try {
      await dispatch(removeCompanyMember({ companyId: selectedCompany.id, userId: member.id })).unwrap();
      dispatch(
        showNotification({
          message: `${member.first_name} ${member.last_name} excluded from the company`,
          severity: 'success',
        })
      );
      // Можно добавить обновление данных компании после удаления
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
        {members?.length ? (
          <List>
            {members.map(member => (
              <div key={member.id}>
                <ListItem
                  secondaryAction={
                    isOwner && member.role !== 'owner' ? (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => {
                          setisConfirmDialogOpen(true);
                          setSelectedMember(member);
                        }}
                      >
                        Exclude
                      </Button>
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
                          label={member.role.charAt(0).toUpperCase() + member.role.slice(1)}
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
        title={'Confirm member exclude'}
        description={`Are you sure you want to remove ${selectedMember?.first_name} ${selectedMember?.last_name} from the company?`}
        confirmText={'Remove'}
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

import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Divider, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { showNotification } from '../features/notifications/store/notificationsSlice';
import { removeCompanyMember } from '../features/companies/store/companiesThunks';
import getUserRoleInCompany from '../utils/getUserRoleInCompany';
import { selectUserProfileData } from '@/features/users/store/usersSelectors';
import ConfirmModal from '../components/ui/ConfirmModal/ConfirmModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectSelectedCompany } from '@/features/companies/store/companiesSelectors';
import { User } from '@/features/users/types/userTypes';

const Members = () => {
  const [isConfirmDialogOpen, setisConfirmDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const selectedCompany = useAppSelector(selectSelectedCompany);
  const user = useAppSelector(selectUserProfileData);
  const members = selectedCompany?.members || [];

  const role = getUserRoleInCompany(selectedCompany, user?.id);
  const isOwner = role === 'owner';
  // const isAdmin = role === 'admin';
  // const isMember = role === 'member';

  const handleRemove = async (member: User) => {
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
      <Box sx={{ maxWidth: 1100, mx: 'auto', p: { xs: 2, md: 4 } }}>
        {members?.length ? (
          <List>
            {members.map(member => (
              <div key={member.id}>
                <ListItem
                  secondaryAction={
                    isOwner ? (
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
                  <ListItemText primary={`${member.first_name} ${member.last_name}`} secondary={member.email} />
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
        onConfirm={() => handleRemove(selectedMember)}
        onCancel={() => setisConfirmDialogOpen(false)}
      />
    </>
  );
};

export default Members;

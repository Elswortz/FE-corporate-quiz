import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Divider, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { showNotification } from '../features/notifications/store/notificationsSlice';
import { removeCompanyMember } from '../features/companies/store/companiesThunks';
import getUserRoleInCompany from '../utils/getUserRoleInCompany';

const Members = () => {
  const dispatch = useDispatch();
  const selectedCompany = useSelector(state => state.companies.selected?.data);
  const { data: user } = useSelector(state => state.auth.user);
  const members = selectedCompany?.members || [];

  const role = getUserRoleInCompany(selectedCompany, user?.id);
  const isOwner = role === 'owner';
  // const isAdmin = role === 'admin';
  // const isMember = role === 'member';

  const handleRemove = async member => {
    if (!window.confirm(`Исключить ${member.first_name} ${member.last_name || ''}?`)) return;
    try {
      await dispatch(removeCompanyMember({ companyId: selectedCompany.id, userId: member.id })).unwrap();
      dispatch(showNotification({ message: `${member.email} исключён из компании`, severity: 'success' }));
      // Можно добавить обновление данных компании после удаления
    } catch (err) {
      dispatch(
        showNotification({
          message: err.response?.data?.message || 'Ошибка при исключении участника',
          severity: 'error',
        })
      );
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', p: { xs: 2, md: 4 } }}>
      {members?.length ? (
        <List>
          {members.map(member => (
            <div key={member.id}>
              <ListItem
                secondaryAction={
                  isOwner ? (
                    <Button variant="outlined" color="error" size="small" onClick={() => handleRemove(member)}>
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
  );
};

export default Members;

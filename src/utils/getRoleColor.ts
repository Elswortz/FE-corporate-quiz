export const getRoleColor = (role: string) => {
  switch (role) {
    case 'owner':
      return 'error';
    case 'admin':
      return 'warning';
    case 'member':
      return 'primary';
    default:
      return 'default';
  }
};

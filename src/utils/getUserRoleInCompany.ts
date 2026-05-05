const getUserRoleInCompany = (company, userId) => {
  if (company?.owner?.id === userId) return 'owner';
  const member = company?.members?.find(m => m.id === userId);
  return member?.role || null;
};

export default getUserRoleInCompany;

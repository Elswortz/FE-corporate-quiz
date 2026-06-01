export const getPageFromOffset = (offset: number, limit: number) => {
  return Math.floor(offset / limit) + 1;
};

export const getOffsetFromPage = (page: number, limit: number) => {
  return (page - 1) * limit;
};

export const getTotalPages = (total: number, limit: number) => {
  return Math.ceil(total / limit);
};

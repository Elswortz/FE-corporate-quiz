export interface User {
  id: UserId;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
}

export type Pagination = {
  limit?: number;
  offset?: number;
};

export type UserId = string;

export type UpdateUserGto = Pick<User, 'first_name' | 'last_name'>;

export type UpdateAvatarGto = FormData;

export type CreateUserGto = Omit<User, 'id' | 'avatar_url'> & Password;

type Password = {
  password: string;
};

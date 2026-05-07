export interface User {
  id: UserId;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
}

export type UserId = string;

export type LoginGto = {
  email: string;
  password: string;
};

export type RefreshGto = {
  refresh_token: string;
};

export type ChangePasswordGto = {
  old_password: string;
  new_password: string;
};

export type ResetPasswordGto = {
  email: string;
};

type ConfirmResetPayload = {
  new_password: string;
};

export type ConfirmResetGto = {
  token: string;
  uid: string;
  payload: ConfirmResetPayload;
};

export type JwtPayload = {
  exp: number;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

export type ISignIn = {
  email: string;
  password: string;
};

export type IEmail = {
  email: string;
};

export type IRecover = {
  password: string;
  confirmPassword: string;
  resetToken?: string
};

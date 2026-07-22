export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  dob: string;
  createdAt: string;
  updatedAt: string;
}

export type UserPublic = Omit<User, "password">;

export interface SignupInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
}

export interface SigninInput {
  email: string;
  password: string;
}

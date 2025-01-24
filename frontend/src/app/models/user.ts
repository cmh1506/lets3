import { Role } from "./role";

export interface User {
  _id: string
  email: string;
  pwd: string;
  name: string;
  role: Role;
}

export interface LoginInfo {
  email: string;
  pwd: string;
}

export interface Token {
  token: string
  role: Role
}

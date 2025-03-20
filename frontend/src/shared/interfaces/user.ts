export interface UserData {
  id: number;
  username: string;
  type_user?: {
    type: string;
  };
}

export interface CreateUserPayload {
  user: {
    username: string;
    password: string;
  };
  type_user: {
    type: string;
  };
}

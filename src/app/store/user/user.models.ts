import { User } from '@app/models/backend/user';
//creo una nueva interface model llamada UserResponse a partir del model User
export { User as UserResponse } from '@app/models/backend/user';

export interface EmailPasswordCredentials {
  username: string;
  password: string;
}

export interface UserRequest extends User {
  //agrego nuevas propiedades que no tiene user
  password: string;
}

//omitir el envio del token que me pide User
export type UserCreateRequest = Omit<UserRequest, 'token' | 'id'>;

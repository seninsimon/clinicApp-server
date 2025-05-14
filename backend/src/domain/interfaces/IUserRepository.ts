import { User } from "../entities/User";

export interface IUserRepository {

  createUser(user: User): Promise<User>;
  
  findByEmail(email: string): Promise<User | null>;

  updatUser(user : User) : Promise<void>;

  findById(id : string): Promise<User | null>

}


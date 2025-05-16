import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { UserModel } from "../schemas/UserSchema";

//database opeations of mongoose

export class UserMongoRepo implements IUserRepository {
  
    async createUser(user: User): Promise<User> {
  
        const created = new UserModel(user);
  
        await created.save();
  
        return created.toObject();
  }                                          

  
    async findByEmail(email: string): Promise<User | null> {
  
    const user = await UserModel.findOne({ email });
  
    return user ? user.toObject() : null;
  }

  async findById(id: string): Promise<User | null> {

    const user = await UserModel.findById(id)

    return user 
      
  }

  async updatUser(user: User): Promise<void> {

   const updateUser = await UserModel.findOneAndUpdate({email : user.email }, user )


      
  }


}

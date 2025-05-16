import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import bycrpt from "bcryptjs"
import { generateAccessToken, generateRefreshToken } from "../../utils/generateAccessToken";



export class Login {
    constructor( private userRepo : IUserRepository){}

    async execute( email : string , password : string) 
    {
        const user = await this.userRepo.findByEmail(email)

        if(!user) throw new Error("invalid credentials")
        
        if(!user.isVerified) throw new Error("user not verified")

        const passwordmatch = await bycrpt.compare(password , user.password)

        if(!passwordmatch) throw new Error("invalid credentials")

        const accessToken = generateAccessToken(user._id!.toString() , user.role)

        const refreshToken = generateRefreshToken(user._id!.toString())

        return {accessToken , refreshToken , user}
    }
}
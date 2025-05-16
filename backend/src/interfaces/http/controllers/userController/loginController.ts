import { UserMongoRepo } from "../../../../infrastructure/database/repositories/UserMongoRepo";
import { Login } from "../../../../application/useCases/login/Login";
import { Request, Response } from "express";

const userRepo = new UserMongoRepo();
const login = new Login(userRepo);

export class LoginController {
    static async login(req: Request, res: Response) {
        try {
            // Input validation
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }
            
            if (typeof email !== 'string' || typeof password !== 'string') {
                return res.status(400).json({ message: "Invalid input format" });
            }

            const userloggedin = await login.execute(email, password);

            // Set secure cookies
            const isProduction = process.env.NODE_ENV === 'production';
            
            res.cookie("accessToken", userloggedin.accessToken, {
                httpOnly: true,
                secure: isProduction, // Only use HTTPS in production
                sameSite: isProduction ? 'strict' : 'lax',
                maxAge: 15 * 60 * 1000, // 15 minutes
                path: '/',
            });

            res.cookie("refreshToken", userloggedin.refreshToken, {
                httpOnly: true,
                secure: isProduction, // Only use HTTPS in production
                sameSite: isProduction ? 'strict' : 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                path: '/',
            });

            // Don't return sensitive information
            const { password: _, ...safeUserData } = userloggedin.user;

            res.status(200).json({
                message: "User logged in successfully",
                user: safeUserData
            });
            
        } catch (error) {
            console.error('Login error:', error);
            
            // Don't expose internal errors to client
            const errorMessage = error instanceof Error ? 
                error.message : 
                "Authentication failed";
                
            res.status(401).json({ message: errorMessage });
        }
    }
}
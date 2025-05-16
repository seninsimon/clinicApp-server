import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { doctorRepositoryImpl } from '../../../../infrastructure/database/repositories/doctorMongoRepo';
import { generateAccessToken, generateRefreshToken } from '../../../../application/utils/generateAccessToken';

const doctorRepo = doctorRepositoryImpl();

export const DoctorAuthController = {
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      // Input validation
      const { email, password } = req.body;
      
      if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
      }
      
      if (typeof email !== 'string' || typeof password !== 'string') {
        res.status(400).json({ message: 'Invalid input format' });
        return;
      }

      // Find doctor by email
      const doctor = await doctorRepo.findByEmail(email);
      
      if (!doctor) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
      
      // Check if doctor is blocked
      if (doctor.isBlocked) {
        res.status(403).json({ message: 'Your account has been blocked. Please contact administrator.' });
        return;
      }
      
      // Check if doctor is approved
      if (doctor.status !== 'Approved') {
        res.status(403).json({ 
          message: `Your account is currently ${doctor.status.toLowerCase()}. Please wait for approval.` 
        });
        return;
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, doctor.password);
      
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      // Generate tokens
      const accessToken = generateAccessToken(doctor._id as string, 'doctor');
      const refreshToken = generateRefreshToken(doctor._id as string);

      // Set secure cookies
      const isProduction = process.env.NODE_ENV === 'production';
      
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        maxAge: 15 * 60 * 1000, // 15 minutes
        path: '/',
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/',
      });

      // Return doctor data without sensitive information
      const { password: _, ...safeDoctorData } = doctor;
      
      res.status(200).json({
        message: 'Doctor logged in successfully',
        doctor: safeDoctorData,
        role: 'doctor'
      });
    } catch (error) {
      console.error('Doctor login error:', error);
      
      const errorMessage = error instanceof Error ? 
        error.message : 
        'Authentication failed';
        
      res.status(500).json({ message: errorMessage });
    }
  },
  
  getProfile: async (req: Request & { user?: { sub: string; role: string } }, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.sub) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      
      const { sub } = req.user;
      
      const doctor = await doctorRepo.findByEmail(sub);
      
      if (!doctor) {
        res.status(404).json({ message: 'Doctor not found' });
        return;
      }
      
      // Return doctor data without sensitive information
      const { password: _, ...safeDoctorData } = doctor;
      
      res.status(200).json({
        doctor: safeDoctorData
      });
    } catch (error) {
      console.error('Get doctor profile error:', error);
      
      const errorMessage = error instanceof Error ? 
        error.message : 
        'Failed to retrieve doctor profile';
        
      res.status(500).json({ message: errorMessage });
    }
  }
};

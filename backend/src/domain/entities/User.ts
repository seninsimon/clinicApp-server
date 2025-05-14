export type Role = 'admin' | 'patient' | 'doctor';

export class User {
  constructor(
    
    public readonly name: string,
    public readonly email: string,
    public password: string,
    public role: Role = 'patient',
    public isBlocked: boolean = false,
    public otp? : string,
    public otpExpiry? : Date,
    public isVerified? : Boolean
  ) {}

   setOtp(otp: string, expiryMinutes: number = 10) {
    this.otp = otp;
    this.otpExpiry = new Date(Date.now() + expiryMinutes * 60000);
  }

  verifyOtp(inputOtp: string): boolean {
    return this.otp === inputOtp && new Date() <= this.otpExpiry!;
  }

  block() {
    this.isBlocked = true;
  }

  unblock() {
    this.isBlocked = false;
  }
}

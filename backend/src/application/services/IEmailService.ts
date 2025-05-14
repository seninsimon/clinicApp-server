export interface IEmailService {

  
    sendEmail(to: string, content: string): Promise<void>;
}

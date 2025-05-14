export interface Doctor{
  _id?:string,
  firstname:string,
  lastname:string,
  email:string,
  password:string,
  phone:string,
  specialisation:string|null,
  experience:number,
  fee:number,
  status:"Approved"|"Rejected"|"Pending",
  isBlocked:boolean,
  googleVerified?:boolean,
  additionalInfo?:string,
  profilePicture?:string,
  medicalLicence?:string

}
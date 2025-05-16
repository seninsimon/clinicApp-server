import { Department } from "../../../domain/entities/Department";
import { departmentRepository } from "../../../domain/interfaces/IDepartmentRepository";


export class CreateDepartment {
    constructor( private departmentRepo : departmentRepository){}
       
    async createDepartment( data : Department) : Promise<{message : string , data? : Department}>
    {

        const {name , description} = data
        const deptName = name.trim().toLocaleLowerCase()

        

        try {

            const existingDept = await this.departmentRepo.findByName(deptName)

            if (existingDept)
            {
                throw new Error("department of this name is already exists")
            }

            const newDeptData = { name : deptName , description }

            const department = await this.departmentRepo.create(newDeptData)

            return {message : "department created successfully " , data : department}

        } catch (error) {

          if (error instanceof Error) {
            
            return { message: error.message };
            
        }
        
        return { message: "An unexpected error occurred" };
        
    }
        
    }
       
}
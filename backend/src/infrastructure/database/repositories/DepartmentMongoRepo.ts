import DepartmentModel from "../schemas/DepartmentSchema";
import { Department } from "../../../domain/entities/Department";
import { departmentRepository } from "../../../domain/interfaces/IDepartmentRepository";




export class DepartmentMongoRepository implements departmentRepository 
{
    async create(department: Department): Promise<Department> {

        const dept = await DepartmentModel.create(department)

        return dept
        
    }

    async findAll(): Promise<Department[]> {

        const depts = await DepartmentModel.find()

        return depts
        
    }

    async findById(id: string): Promise<Department | null> {


        const dept = await DepartmentModel.findById(id)

        return dept
        
    }

    async findByName(name: string): Promise<Department | null> {

        const dept = await DepartmentModel.findOne({name})

        return dept
        
    }

    async update(id: string, data: Partial<Department>): Promise<Department | null> {

        const dept = await DepartmentModel.findByIdAndUpdate(id , data , {new : true})

        return dept
        
    }

    async delete(id: string): Promise<Department | null> {

        const dept = await DepartmentModel.findByIdAndDelete(id)

        return dept
        
    }
}
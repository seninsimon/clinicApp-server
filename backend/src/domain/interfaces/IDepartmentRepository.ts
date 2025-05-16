import { Department } from "../entities/Department";

export interface departmentRepository {

    
    create( department : Department) : Promise<Department> ;
    
    findAll() : Promise<Department[]>
    
    update( id : string , data : Partial<Department>) : Promise<Department | null>
    
    delete(id : string) : Promise<Department | null>

    findById( id : string) : Promise<Department | null>

    findByName( name : string) : Promise<Department | null>

}
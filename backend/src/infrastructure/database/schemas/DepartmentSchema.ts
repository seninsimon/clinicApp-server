import mongoose from "mongoose";
import { Department } from "../../../domain/entities/Department";


const departmentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
},
{
    timestamps : true
})


const DepartmentModel = mongoose.model<Department>("Department" , departmentSchema)

export default DepartmentModel ; 
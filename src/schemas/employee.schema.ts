import { Schema, model } from "mongoose";

interface IEmployee {
    name: string,
    code: string,
    age: number,
    salary: number,
    branch: string
}

const employeeSchema = new Schema<IEmployee>({
    name: String,
    code: String,
    age: Number,
    salary: Number,
    branch: String
})

const EmployeeModel = model<IEmployee>('Employee', employeeSchema);

export {EmployeeModel};
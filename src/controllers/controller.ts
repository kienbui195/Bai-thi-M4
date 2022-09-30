
import {Request, Response} from "express";
import { EmployeeModel } from "../schemas/employee.schema"
import { BranchModel } from "../schemas/branch.schema"
import { request } from "http";

class Controller {

    async showFormCreate(req: Request, res: Response) {
        let data = await BranchModel.find();
        res.render('add', { data: data });
    }

    async getDataCreate(req: Request, res: Response) {
        const data = req.body;
        console.log(data);
        
        const newEmployee = new EmployeeModel({
            name: data.name,
            code: data.code,
            age: data.age,
            salary: data.salary,
            branch: data.branch
        });
        await newEmployee.save();
        req.flash('message', 'successCreate');
        res.redirect('/');
    }

    async showFormHome(req: Request, res: Response) {
        let it = await EmployeeModel.find({branch: "IT"});
        let quetrac = await EmployeeModel.find({branch: "Quet Rac"});
        res.render('list', { it: it, quetrac: quetrac, message: req.flash('message') });
    }

    async showFormUpdate(req:Request, res: Response) {
        let data = await EmployeeModel.findOne({ _id: req.params.id });   
        let branch = await BranchModel.find();
        res.render('update', { data: data, branch: branch });
    }
    
    async getDataUpdate(req: Request, res: Response) {
        const data = req.body;
        await EmployeeModel.findOneAndUpdate({ _id: data.id }, {
            name: data.name,
            code: data.code,
            age: data.age,
            salary: data.salary,
            branch: data.branch
        });
        req.flash('message','successUpdate')
        res.redirect('/');
    }

    async detail(req: Request, res: Response) {
        let id = req.params.id;
        let data = await EmployeeModel.findOne({ _id: id});
        res.render('details' ,{data:data})
    }

    async deleteBook(req: Request, res: Response) {
        await EmployeeModel.findOneAndDelete({ _id: req.params.id });
        req.flash('message', 'successDel');
        res.redirect('/');
    }
}

const controller = new Controller();
export default controller;
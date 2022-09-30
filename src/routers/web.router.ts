import express from "express";
import controller from "../controllers/controller";
export const webRouter = express.Router();
import multer from "multer";

const upload = multer();

webRouter.get('/', (req, res) => {
    controller.showFormHome(req, res).catch(err => res.render('error'))
})

webRouter.get('/create', (req, res) => {
    controller.showFormCreate(req, res).catch(err => res.render('error'));
})

webRouter.post('/create', upload.none(), (req, res) => {
    controller.getDataCreate(req, res).catch(err => res.render('error'))
})

webRouter.get('/update/:id', (req, res) => {
    controller.showFormUpdate(req, res).catch(err => res.render('error'))
})

webRouter.post('/update',upload.none(), (req, res) => {
    controller.getDataUpdate(req, res).catch(err => res.render('error'))
})

webRouter.get('/delete/:id', (req, res) => {
    controller.deleteBook(req, res).catch(err => res.render('error'));
})

webRouter.get('/details/:id', (req, res) => {
    controller.detail(req, res).catch(err => res.render('error'));
})

webRouter.get('/*', (req, res) => {
    res.render('error');
})

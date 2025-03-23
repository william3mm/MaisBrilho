import { Router } from "express";

import multerconfig from '../../config/multerConfig';

import multer from "multer";

const upload =  multer(multerconfig)

import fotos_Dos_Produtos_Controller from "../../Controllers/Fotos_Dos_Produtos_Controller/Fotos_Dos_Produtos_Controller";
const app = new Router();

app.get('/', fotos_Dos_Produtos_Controller.index);

app.post('/', upload.array('files',3), fotos_Dos_Produtos_Controller.create)

export default app;

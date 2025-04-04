import { Router } from "express";

import multerconfig from '../../config/multerConfig';

import multer from "multer";

const upload =  multer(multerconfig)

import fotos_Dos_Produtos_Controller from "../../Controllers/Fotos_Dos_Produtos_Controller/Fotos_Dos_Produtos_Controller";

import Vendedor_Login_Required from '../../Middlewares/Vendedor_Login_Required'

import Status_Aprovado_Required from '../../Middlewares/Status_Aprovado_Required'
const app = new Router();

app.get('/', fotos_Dos_Produtos_Controller.index);

app.post('/', Vendedor_Login_Required, Status_Aprovado_Required, upload.array('files',3), fotos_Dos_Produtos_Controller.create)

export default app;

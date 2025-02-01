import { Router } from "express";

import multer from "multer";

import multerConfig from "../../config/multerConfig";

import adminController_Foto_Dos_Produtos from "../../Controllers/AdminController/AdminController_Fotos_Dos_Produtos";



const upload = multer(multerConfig); // Preparamos uma variavel configurada para receber arquivos e passamos as configuracoes do multer para ela
const router = new Router();

router.get('/', adminController_Foto_Dos_Produtos.index);

router.post('/', upload.array('Fotos[]', 3) ,adminController_Foto_Dos_Produtos.create);

export default router;

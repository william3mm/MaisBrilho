import dotenv from 'dotenv'

dotenv.config();

import express from "express";

import './src/Database'

import UsuarioRoutes from './src/Routes/UsuarioRoutes'

import CategoriaRoutes from './src/Routes/CategoriaRoutes'

import ProdutoRoutes from  './src/Routes/ProdutoRoutes'

import Fotos_Dos_ProdutosRoutes from  './src/Routes/Fotos_Dos_Produtos_Routes';

import TokenRoutes from './src/Routes/TokenRoutes'

import AdminRoutes from './src/Routes/AdminRoutes'

class App{

  constructor(){

    this.app = express();

    this.Middlewares();

    this.Routes();

  }

  Middlewares(){

    this.app.use(express.urlencoded({extended:true}));

    this.app.use(express.json()); //Para podermos receber requisicoes por json

  }

  Routes(){


    this.app.use('/usuarios/', UsuarioRoutes);

    this.app.use('/categorias/', CategoriaRoutes);

    this.app.use('/produtos/', ProdutoRoutes);

    this.app.use('/produtos/fotos', Fotos_Dos_ProdutosRoutes);

    this.app.use('/tokens/', TokenRoutes);

    this.app.use('/secure-dashboard/', AdminRoutes);

  }

}


export default new App().app;

import dotenv from 'dotenv'

dotenv.config();

import express from "express";

import './src/Database'

import UsuarioRoutes from './src/Routes/UsuarioRoutes'

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


    this.app.use('/usuarios/', UsuarioRoutes)

  }

}


export default new App().app;

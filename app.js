import dotenv from 'dotenv'

import {resolve} from 'path'

dotenv.config();

import express from "express";

import './src/Database' /*Importamos o arquivo de configuracao da database para que os modelos sejam inicializados antes do servidor começar a executar as rotas,

se nao o fizessemos iriamos ter erros dizendo que os modelos nao foram inicializados.
 */

import UsuarioRoutes from './src/Routes/UsuarioRoutes'

import TokenRoutes from './src/Routes/TokenRoutes'

import AdminRoutes_Fotos_Dos_Produtos from  './src/Routes/AdminRoutes/AdminRoutes_Fotos_Dos_Produtos';

import AdminRoutes_Produtos from './src/Routes/AdminRoutes/AdminRoutes_Produto'

import AdminRoutes_Admin_Generator from './src/Routes/AdminRoutes/AdminRoutes_Admin_Generator'

import AdminRoutes_Categorias from './src/Routes/AdminRoutes/AdminRoutes_Categoria'

import AdminRoutes_Token from './src/Routes/AdminRoutes/AdminRoutes_Token'

class App{

  constructor(){

    this.app = express();

    this.Middlewares();

    this.Routes();

  }

  Middlewares(){

    this.app.use(express.urlencoded({extended:true}));

    this.app.use(express.json()); //Para podermos receber requisicoes por json

    // Vamos comunicar ao express onde está a pasta de arquivos estaticos para que possamos abrir os arquivos

    this.app.use(express.static(resolve(__dirname, 'Uploads')))

  }

  Routes(){


    this.app.use('/usuarios/', UsuarioRoutes);

    // this.app.use('/categorias/', CategoriaRoutes);

    // this.app.use('/produtos/', ProdutoRoutes);

    this.app.use('/produtos/fotos', AdminRoutes_Fotos_Dos_Produtos);

    this.app.use('/tokens/', TokenRoutes);

      this.app.use('/secure-dashboard/produtos', AdminRoutes_Produtos);

      this.app.use('/secure-dashboard/manager-generator/', AdminRoutes_Admin_Generator)

      this.app.use('/secure-dashbooards/categorias/', AdminRoutes_Categorias);

      this.app.use('/secure-dashboard/manager-super-management/token/', AdminRoutes_Token)

  }

}

export default new App().app;

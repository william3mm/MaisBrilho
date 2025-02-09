import dotenv from 'dotenv'

import {resolve} from 'path'

dotenv.config();

import express from "express";

import cors from 'cors';

import helmet from 'helmet';

import './src/Database' /*Importamos o arquivo de configuracao da database para que os modelos sejam inicializados antes do servidor começar a executar as rotas,

se nao o fizessemos iriamos ter erros dizendo que os modelos nao foram inicializados.
 */

import UsuarioRoutes from './src/Routes/UsuarioRoutes'

import TokenRoutes from './src/Routes/TokenRoutes'

import AdminRoutes_Fotos_Dos_Produtos from  './src/Routes/AdminRoutes/AdminRoutes_Fotos_Dos_Produtos';

import AdminRoutes_Produtos from './src/Routes/AdminRoutes/AdminRoutes_Produto'

import AdminRoutes_Admin_Generator from './src/Routes/AdminRoutes/AdminRoutes_Admin_Generator'

import AdminRoutes_Categorias from './src/Routes/AdminRoutes/AdminRoutes_Categoria'

import AdminRoutes_Token from './src/Routes/AdminRoutes/AdminRoutes_Token';

import AdminRoutes_Usuarios from './src/Routes/AdminRoutes/AdminRoutes_Usuarios';

import AdminRoutes_Gerir_Carrinho from './src/Routes/AdminRoutes/AdminRoutes_Gerir_Carrinho';

const whiteList = [

  // 'https://react2.otaviomiranda.com.br',

  'http://localhost:3000'
]

// Vamos escrever as configuracoes do CORS

const corsOptions  = {


  origin: function(origin, callback){

    /* O cabecalho origin vai indicar a origem de um recurso que está a ser procurado, tem as seguintes funcoes:


    1 - Ele vai informar ao navegador quais orignens podem receber solicitacoes

     2 - Vai comparar com as informacoes de metodos e origens na configuracao

     3 - Vai especificar os dominios que têm permissao para acessar o recurso

    */

     // whiteList.indexOf(origin) != -1 significa que a origin está contida e !origin quer dizer que nem sempre ela será envidada

     if(whiteList.indexOf(origin) != -1 || !origin){

      // O primeiro argumento do callback seria um erro, que, vamos setar como null
      callback(null, true)

    }else{

      callback(new Error('NOT ALLOWED BY CORS'))
    }
  }
}

class App{

  constructor(){

    this.app = express();

    this.Middlewares();

    this.Routes();

  }

  Middlewares(){

    this.app.use(cors(corsOptions));

    this.app.use(helmet()); // Previne vunerabilidades comuns

    this.app.use(express.urlencoded({extended:true}));

    this.app.use(express.json()); //Para podermos receber requisicoes por json

    // Vamos comunicar ao express onde está a pasta de arquivos estaticos para que possamos abrir os arquivos

    this.app.use(express.static(resolve(__dirname, 'Uploads')))

  }

  Routes(){


    this.app.use('/usuarios/', UsuarioRoutes);

    this.app.use('/usuarios/carrinho/', UsuarioRoutes);

    // this.app.use('/categorias/', CategoriaRoutes);

    // this.app.use('/produtos/', ProdutoRoutes);


    this.app.use('/produtos/fotos', AdminRoutes_Fotos_Dos_Produtos);

    this.app.use('/tokens/', TokenRoutes);

      this.app.use('/secure-dashboard/produtos', AdminRoutes_Produtos);

      this.app.use('/secure-dashboard/manager-generator/', AdminRoutes_Admin_Generator)

      this.app.use('/secure-dashbooard/categorias/', AdminRoutes_Categorias);

      this.app.use('/secure-dashboard/manager-super-management/token/', AdminRoutes_Token);

      this.app.use('/secure-dashboard/user-management/', AdminRoutes_Usuarios);

      this.app.use('/secure-dashboard/carrinho-management/', AdminRoutes_Gerir_Carrinho)



  }

}

export default new App().app;

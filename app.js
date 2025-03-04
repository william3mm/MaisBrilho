import dotenv from 'dotenv'

import {resolve} from 'path'

dotenv.config();

import express from "express";

import cors from 'cors';

import helmet from 'helmet';

import './src/Database' /*Importamos o arquivo de configuracao da database para que os modelos sejam inicializados antes do servidor começar a executar as rotas,

se nao o fizessemos iriamos ter erros dizendo que os modelos nao foram inicializados.
 */

import UsuarioRoutes from './src/Routes/UsuarioRoutes/UsuarioRoutes'

import Usuario_LoginRoutes from './src/Routes/Usuario_LoginRoutes/LoginRoutes'

import Usuario_Criar_Conta_Routes from './src/Routes/Usuario_Criar_ContaRoutes/Criar_Conta'

import Usuario_Actualiza_Perfil from './src/Routes/Usuario_Actualiza_Perfil_Routes/Actualiza_Pefil'

import AdminRoutes_Fotos_Dos_Produtos from  './src/Routes/AdminRoutes/AdminRoutes_Fotos_Dos_Produtos';

import AdminRoutes_Admin_Generator from './src/Routes/AdminRoutes/AdminRoutes_Admin_Generator'

import AdminRoutes_Categorias from './src/Routes/AdminRoutes/AdminRoutes_Categoria'

import AdminRoutes_Token from './src/Routes/AdminRoutes/AdminRoutes_Token';

import VendedorRoutes from './src/Routes/VendedorRoutes/VendedorRoutes'

import HomeRoutes from './src/Routes/HomeRoutes/HomeRoutes'

import Vendedor_Criar_Conta_Routes from './src/Routes/Vendedor_Criar_ContaRoutes/Criar_Conta'

import Vendedor_LoginRoutes from './src/Routes/Vendedor_LoginRoutes/LoginRoutes'


const whiteList = [

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


    this.app.use('/criar-conta/', Usuario_Criar_Conta_Routes)

    this.app.use('/usuarios/carrinho/', UsuarioRoutes);

    this.app.use('/login/', Usuario_LoginRoutes)

    this.app.use('/usuarios/perfil/', Usuario_Actualiza_Perfil)

    this.app.use('/produtos/fotos', AdminRoutes_Fotos_Dos_Produtos);

    this.app.use('/secure-dashboard/manager-generator/', AdminRoutes_Admin_Generator)

    this.app.use('/secure-dashbooard/categorias/', AdminRoutes_Categorias);

    this.app.use('/secure-dashboard/manager-super-management/token/', AdminRoutes_Token);

    this.app.use('/produtos/', VendedorRoutes)

    this.app.use('/criar-conta/vendedores', Vendedor_Criar_Conta_Routes)

    this.app.use('/', HomeRoutes);

    this.app.use('/login/vendedores/', Vendedor_LoginRoutes)






  }

}

export default new App().app;

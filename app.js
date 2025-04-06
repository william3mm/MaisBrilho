import dotenv from 'dotenv';

import { resolve } from 'path';

import express from 'express';

import cors from 'cors';

import helmet from 'helmet';

import delay from 'express-delay';

import './src/Database'; /* Importamos o arquivo de configuracao da database para que os modelos sejam inicializados antes do servidor começar a executar as rotas,

se nao o fizessemos iriamos ter erros dizendo que os modelos nao foram inicializados.
 */

import * as Routes from './routes';

dotenv.config();
const whiteList = [

  'http://localhost:3000',
];

// Vamos escrever as configuracoes do CORS

const corsOptions = {

  origin(origin, callback) {
    /* O cabecalho origin vai indicar a origem de um recurso que está a ser procurado, tem as seguintes funcoes:

    1 - Ele vai informar ao navegador quais orignens podem receber solicitacoes

     2 - Vai comparar com as informacoes de metodos e origens na configuracao

     3 - Vai especificar os dominios que têm permissao para acessar o recurso

    */

    // whiteList.indexOf(origin) != -1 significa que a origin está contida e !origin quer dizer que nem sempre ela será envidada

    if (whiteList.indexOf(origin) !== -1 || !origin) {
      // O primeiro argumento do callback seria um erro, que, vamos setar como null
      callback(null, true);
    } else {
      callback(new Error('NOT ALLOWED BY CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();

    this.Middlewares();

    this.Routes();
  }

  Middlewares() {
    this.app.use(cors(corsOptions));

    this.app.use(helmet()); // Previne vunerabilidades comuns

    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(express.json()); // Para podermos receber requisicoes por json

    this.app.use(delay(2000));

    // Vamos comunicar ao express onde está a pasta de arquivos estaticos para que possamos abrir os arquivos

    this.app.use(express.static(resolve(__dirname, 'Uploads')));
  }

  Routes() {
    this.app.use('/criar-conta/', Routes.Usuario_Criar_Conta_Routes);

    this.app.use('/usuarios/carrinho/', Routes.UsuarioRoutes);

    this.app.use('/login/usuarios/', Routes.Usuario_LoginRoutes);

    this.app.use('/usuarios/perfil/', Routes.Usuario_Actualiza_Perfil);

    this.app.use('/secure-dashboard/manager-generator/', Routes.AdminRoutes_Admin_Generator);

    this.app.use('/secure-dashboard/categorias/', Routes.AdminRoutes_Categorias);

    this.app.use('/secure-dashboard/manager-super-management/token/', Routes.AdminRoutes_Token);

    this.app.use('/secure-dashboard/vendedores-verificacao/', Routes.Admin_Admite_Rejeita_Vendedores);

    this.app.use('/secure-dashborard/manager-super-management/criar-conta/', Routes.Admin_Criar_Conta);

    this.app.use('/produtos/', Routes.VendedorRoutes);

    this.app.use('/produtos/adicionar-fotos/', Routes.Fotos_Dos_Produtos_Routes);

    this.app.use('/criar-conta/vendedores', Routes.Vendedor_Criar_Conta_Routes);

    this.app.use('/', Routes.HomeRoutes);

    this.app.use('/login/vendedores/', Routes.Vendedor_LoginRoutes);

    this.app.use('/produtos/ativa-desativa-estado/', Routes.Vendedor_Ativa_Desativa_Produtos);
  }
}

export default new App().app;

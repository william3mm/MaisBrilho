import { Sequelize } from 'sequelize';

import databaseconfig from '../config/database';

import Vendedor from '../Models/Vendedor';

import Categoria from '../Models/Categoria';

import Produto from '../Models/Produto';

import Usuario from '../Models/Usuario';

import Produto_Vendedor from '../Models/Produto_Vendedor';

import Carrinho from '../Models/Carrinho';

import Carrinho_Produto from '../Models/Carrinho_Produto';

import Fotos_Dos_Produtos from '../Models/Fotos_Dos_Produtos';

import Admin from '../Models/Admin';

const models = [ Vendedor, Categoria, Produto, Usuario, Produto_Vendedor, Carrinho, Carrinho_Produto, Fotos_Dos_Produtos, Admin ];

const connection = new Sequelize(databaseconfig); // Aqui inicializamos a conexao passando as informacoes da nossa database

models.forEach((model) => model.init(connection));

models.forEach((model) => model.associate && model.associate(connection.models)); /* Uma avaliacao de curto circuito

  Caso o valor da esquerda for verdadeiro, executa o valor da direita, caso nao for retorna um undefined

*/

import { Sequelize } from "sequelize";

import databaseconfig from '../config/database'

import Vendedor from "../Models/Vendedor";

import Categoria from "../Models/Categoria";

import Produto from "../Models/Produto";

import Usuario from "../Models/Usuario";

import Produto_Vendedor from "../Models/Produto_Vendedor"



const models = [Vendedor, Categoria, Produto, Usuario, Produto_Vendedor]


const connection = new Sequelize(databaseconfig); // Aqui inicializamos a conexao passando as informacoes da nossa database

models.forEach(model=> model.init(connection))


models.forEach( (model) => model.associate && model.associate(connection.models)) /* Uma avaliacao de curto circuito

  Caso o valor da esquerda for verdadeiro, executa o valor da direita, caso nao for retorna um undefined

*/

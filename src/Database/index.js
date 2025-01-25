import { Sequelize } from "sequelize";

import databaseconfig from '../config/database'

import Usuario from "../Models/Usuario";
import Categoria from "../Models/Categoria";

import Produto from '../Models/Produto'


const models = [Usuario,Categoria, Produto]


const connection = new Sequelize(databaseconfig)
models.forEach(model=> model.init(connection))


models.forEach( (model) => model.associate && model.associate(connection.models)) /* Uma avaliacao de curto circuito

  Caso o valor da esquerda for verdadeiro, executa o valor da direita, caso nao for retorna um undefined

*/

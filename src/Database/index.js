import { Sequelize } from "sequelize";

import databaseconfig from '../config/database'

import Usuario from "../Models/Usuario";
import Categoria from "../Models/Categoria";

import Produto from '../Models/Produto'

import Fotos_Dos_Produtos from  '../Models/Fotos_Dos_Produtos'

import Admin from "../Models/Admin";

import Carrinho from "../Models/Carrinho";

import Carrinho_Produto from "../Models/Carrinho_Produto";


const models = [Usuario,Categoria, Produto, Fotos_Dos_Produtos, Admin, Carrinho, Carrinho_Produto]


const connection = new Sequelize(databaseconfig)
models.forEach(model=> model.init(connection))


models.forEach( (model) => model.associate && model.associate(connection.models)) /* Uma avaliacao de curto circuito

  Caso o valor da esquerda for verdadeiro, executa o valor da direita, caso nao for retorna um undefined

*/

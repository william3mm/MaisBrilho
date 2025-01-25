import { Sequelize } from "sequelize";

import databaseconfig from '../config/database'

import Usuario from "../Models/Usuario";

import Produto from '../Models/Produto'


const models = [Usuario, Produto]


const connection = new Sequelize(databaseconfig)
models.forEach(model=> model.init(connection))

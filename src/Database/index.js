import { Sequelize } from "sequelize";

import databaseconfig from '../config/database'

import Usuario from "../Models/Usuario";


const models = [Usuario]


const connection = new Sequelize(databaseconfig)
models.forEach(model=> model.init(connection))

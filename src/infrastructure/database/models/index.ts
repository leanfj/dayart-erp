import type { Sequelize, Model } from 'sequelize'
import { ClienteModel } from './cliente.model'

export {
  ClienteModel
}

export function initModels(sequelize: Sequelize) {
  ClienteModel.initModel(sequelize)

  return {
    ClienteModel
  }
}
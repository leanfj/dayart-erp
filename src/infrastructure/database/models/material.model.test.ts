import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Database } from "../sequelize";
import { MaterialModel } from "./material.model";
import { UnidadeMedidaModel } from "./unidadeMedida.model";

describe("MaterialModel", () => {
  const dataBase = new Database();
  beforeEach(async () => {
    dataBase.initModels();
    dataBase.initAssociations()

    await dataBase.connect();
  });

  afterEach(async () => {
    vi.clearAllMocks();
    await dataBase.disconnect();
  });

  it("should be able to get all Material", async () => {
    vi.spyOn(MaterialModel, 'findAll')

    const materiais = await MaterialModel.findAll({
      raw: true,
      include: [
        {
          model: UnidadeMedidaModel,
          as: "unidadeMedida",
        }
      ]
    });
    expect(MaterialModel.findAll).toHaveBeenCalledTimes(1);
    expect(materiais).toBeInstanceOf(Array);
  });
});

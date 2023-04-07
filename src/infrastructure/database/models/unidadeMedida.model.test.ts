import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Database } from "../sequelize";
import { UnidadeMedidaModel } from "./unidadeMedida.model";

describe("UnidadeMedidaModel", () => {
  const dataBase = new Database();
  beforeEach(async () => {
    dataBase.initModels();

    await dataBase.connect();
  });

  afterEach(async () => {
    vi.clearAllMocks();
    await dataBase.disconnect();
  });

  it("should be able to get all Unidades de Medidas", async () => {
    vi.spyOn(UnidadeMedidaModel, 'findAll')

    const unidadesMedidas =  await UnidadeMedidaModel.findAll({
      raw: true,
    });
    expect(UnidadeMedidaModel.findAll).toHaveBeenCalledTimes(1);
    expect(unidadesMedidas).toBeInstanceOf(Array);
  });
});

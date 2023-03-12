import { Material } from "../../entities/material/material.entity";
import { RandomCode } from "../../../core/domain/valueObjects/randomCode";
import { MaterialInputDTO } from "./material.dto";
import { validatorDTO } from "../../../core/domain/validatorDTO";
import { Left } from "../../../core/logic/result";
import { describe, it, expect} from 'vitest';

describe("Material DTO", () => {
  it("should create a valid Material",async () => {
    const input: MaterialInputDTO = {
      titulo: "Material 1",
      descricao: "Descrição do material 1",
      valor: 10,
      unidadeMedida: "un"
    };

    const material = Material.create({...input});

    expect(material.titulo).toBe(input.titulo);
    expect(material.descricao).toBe(input.descricao);
    expect(material.valor).toBe(input.valor);    
  });

  it("should return error on data is empty ",async () => {
    const input: MaterialInputDTO = {
      titulo: "Material 1",
      codigo: new RandomCode(),
      descricao: "Descrição do material 1",
      valor: 10,
      unidadeMedida: ""
    };

    const validOrError = await validatorDTO(MaterialInputDTO, input, {});
    
    expect(validOrError).toBeInstanceOf(Left);
    
  });
});

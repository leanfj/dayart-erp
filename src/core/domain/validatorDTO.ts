import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Either, Result, left, right } from "../logic/result";
import { AppError } from "../shared/appError";
import { ValidatorDTOErrors } from "./validatorDTOErros";
type Response = Either<AppError.UnexpectedError,  Result<any>>;
export const validatorDto = async <T extends ClassConstructor<any>>(
  dto: T,
  obj: Object
): Promise<Response> => {
  const objInstance = plainToClass(dto, obj);
  const errors = await validate(objInstance);
  if (errors.length > 0) {
    return left(
      new ValidatorDTOErrors.ValidatorErrors(
        `Validation failed. The error fields : ${errors.map(
          ({ constraints }) => Object.keys(constraints).map(
            (key) => constraints[key] + ' '
          )
        )}`
      )
    );
  } else {
    return right(Result.ok<any>());
  }
};

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { prisma } from "../prisma";

@ValidatorConstraint({ async: true })
export class IsExistingUserConstraint implements ValidatorConstraintInterface {
  async validate(email: string) {
    let user = await prisma.user.findOne({ where: { email } });
    return !user;
  }
}

export const IsExistingUser = (options?: ValidationOptions) => (
  object: Object,
  propertyName: string
) =>
  registerDecorator({
    target: object.constructor,
    propertyName,
    options,
    constraints: [],
    validator: IsExistingUserConstraint,
  });

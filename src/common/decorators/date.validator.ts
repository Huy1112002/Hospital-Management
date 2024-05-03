import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'dateValidator', async: false })
@Injectable()
export class DateValidator implements ValidatorConstraintInterface {
validate(text: string, args: ValidationArguments) {
// Regex to check if the string matches the format 'dd-%mm-%YYYY'
const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
return dateRegex.test(text);
}

defaultMessage(args: ValidationArguments) {
return 'Text ($value) does not match the required format of %dd/%mm/%YYYY for example 01/11/2024';
}
}
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (this.isEmpty(value)) {
      const valueClass = plainToClass(metadata.metatype, value);

      const errors = await validate(valueClass, {
        stopAtFirstError: true,
        validationError: { target: false, value: false },
      });
      if (errors?.length) {
        throw new HttpException(
          this.formatError(errors[0]),
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return value;
  }

  private isEmpty(value: any) {
    return !!Object.keys(value)?.length;
  }

  private formatErrors(errors: ValidationError[]) {
    return errors
      .map((error) => {
        for (const key in error.constraints) {
          return error.constraints[key];
        }
      })
      .join(', ');
  }

  private formatError(error: ValidationError) {
    return Object.values(error.constraints)?.[0] || 'validation error';
  }
}

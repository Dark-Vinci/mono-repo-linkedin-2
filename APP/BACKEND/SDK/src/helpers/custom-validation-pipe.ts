import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    const object = plainToInstance(metatype as any, value);

    const errors = await validate(object);

    if (errors.length > 0) {
      throw new HttpException(
        `validation failed: ${this.formatError(errors)}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }

  private formatError(errors: any[]) {
    let message = '';

    errors.map((error) => {
      message += this.formatChildrenError(error);

      message += this.formatConstraintError(error);
    });

    // remove comma at the end
    return message.slice(0, message.length - 2);
  }

  private formatChildrenError(error: any) {
    let message = '';

    if (error?.children) {
      for (const childError of error?.children) {
        for (const key in childError?.constraints) {
          message += `${childError.constraints[key]}, `;
        }
      }
    }

    return message;
  }

  private formatConstraintError(error: any) {
    let message = '';

    if (error?.constraints) {
      for (const key in error?.constraints) {
        message += `${error.constraints[key]}, `;
      }
    }

    return message;
  }
}

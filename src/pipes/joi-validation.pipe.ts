import {
  PipeTransform, Injectable, ArgumentMetadata, BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  private schema: ObjectSchema;

  constructor(schema: ObjectSchema) {
    this.schema = schema;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    console.log({ metadata });
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}

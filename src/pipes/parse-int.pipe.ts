import {
  PipeTransform, Injectable, ArgumentMetadata, BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    console.log({ metadata });
    const val = parseInt(value, 10);
    if (Number.isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}

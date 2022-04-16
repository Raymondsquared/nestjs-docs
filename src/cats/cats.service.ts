import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(createCatDto: CreateCatDto): string {
    console.log({ createCatDto });
    this.cats.push(createCatDto);
    return createCatDto?.name;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  async findAllAsync(): Promise<Cat[]> {
    return [
      { name: 'cat-1', age: 1, breed: 'cat' },
    ] as Cat[];
  }

  findAllObservable(): Observable<Cat[]> {
    const cats1 = [{ name: 'cat-1', age: 1, breed: 'cat' }];
    const cats23 = [{ name: 'cat-2', age: 2, breed: 'cat' }, { name: 'cat-3', age: 1, breed: 'dog' }];
    const cats4 = [{ name: 'cat-4', age: 4, breed: 'cat' }];

    const output = new Observable<Cat[]>(
      (subscriber) => {
        subscriber.next(cats1);
        subscriber.next(cats23);
        setTimeout(() => {
          subscriber.next(cats4);
          subscriber.complete();
        }, 1000);
      },
    );
    return output;
  }

  findOne(id: number): string {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto): string {
    console.log({ updateCatDto });
    return `This action updates a #${id} cat`;
  }

  remove(id: number): string {
    return `This action removes a #${id} cat`;
  }
}

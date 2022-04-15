import { Observable, Observer } from 'rxjs';
import { Cat } from '../../src/cats/entities/cat.entity';
import { CatsService } from '../../src/cats/cats.service';

const nextFunction = (value: Cat[]): void => {
  console.log(`Receiving: ${JSON.stringify(value)}`);
};

const errorFunction = (err: Error): void => {
  console.error(`Failed subscribing to cats: ${err}`);
};

const completeFunction = (): void => {
  console.log('Subscription completed');
};

const catsObserver: Observer<Cat[]> = {
  next: nextFunction,
  error: errorFunction,
  complete: completeFunction,
};

console.log('Starting subscription;');
const catService = new CatsService();
const catsObservable: Observable<Cat[]> = catService?.findAllObservable();
catsObservable?.subscribe(catsObserver);
console.log('End of subscription');

import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../interfaces/iproduct';

@Pipe({
  name: 'category',
  standalone: true
})
export class CategoryPipe implements PipeTransform {


  transform(products: Iproduct[], term: string): any[] {

    return products.filter((product) => product.category.name.toLowerCase().includes(term.toLocaleLowerCase()));
  }


}

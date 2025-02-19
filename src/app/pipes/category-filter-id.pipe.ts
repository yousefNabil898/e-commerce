import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../core/interfaces/iproduct';

@Pipe({
  name: 'categoryFilterId',
  standalone: true
})
export class CategoryFilterIdPipe implements PipeTransform {

  transform(products: Iproduct[], term: string): any[] {

    return products.filter((product) => product.category._id.toLowerCase().includes(term.toLocaleLowerCase()));
  }

}

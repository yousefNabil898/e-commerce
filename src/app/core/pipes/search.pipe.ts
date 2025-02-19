import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../interfaces/iproduct';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: Iproduct[], term: string): any[] {

    return products.filter((product)=>product.title.toLowerCase().includes(term.toLocaleLowerCase()));
  }

}

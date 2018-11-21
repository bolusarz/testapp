import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FormatQuantity'
})
export class FormatquantityPipe implements PipeTransform {

  transform(quantity: number, total: number, pieces: number, measure: string): any {
   if (total % pieces === 0) {
     return quantity + ' ' + measure + '(s)';
   } else {
     return `${Math.floor(total / pieces)} ${measure}(s) and ${total % pieces} piece(s)  remaining`;
   }
  }

}

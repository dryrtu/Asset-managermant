import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value) {

      return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    return '';
  }
}

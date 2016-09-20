import { Pipe, PipeTransform } from '@angular/core';

/**
 * Capitalize String Pipe
 */
@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {

  transform(value: string) {

    return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
  }
}

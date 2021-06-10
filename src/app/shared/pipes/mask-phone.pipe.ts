import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskPhone'
})

export class MaskPhonePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return;
    }
    return value.replace(value.substring(0, 6), 'XXX XXX ');
  }
}

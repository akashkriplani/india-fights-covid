import { Pipe, PipeTransform } from '@angular/core';
import { MaskKey } from '../enumerations';

@Pipe({
  name: 'maskPhone'
})

export class MaskPhonePipe implements PipeTransform {
  transform(number: string, maskNumberLength: number = 4, maskKey: MaskKey = MaskKey.CROSS): string {
    const visibleDigits = maskNumberLength;
    let maskedSection = number.slice(0, -visibleDigits);
    let visibleSection = number.slice(-visibleDigits);
    return maskedSection.replace(/./g, maskKey) + visibleSection;
  }
}

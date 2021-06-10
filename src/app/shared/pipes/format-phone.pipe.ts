import { Pipe, PipeTransform } from '@angular/core';

enum PhoneNumberSeparator {
  SPACE = ' ',
  HYPHEN = '-',
  DOT = '.'
}

@Pipe({
  name: 'formatPhone'
})

export class FormatPhonePipe implements PipeTransform {
  transform(value: string, separator: PhoneNumberSeparator = PhoneNumberSeparator.SPACE): string {
    if (!value) {
      return;
    }
    if (value?.length === 10) {
      return value.substring(0, 3) + separator + value.substring(3, 6) + separator + value.substring(6, 10);
    }
  }
}

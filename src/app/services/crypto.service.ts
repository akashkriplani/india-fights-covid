import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  public encrypt(value: string): string {
    return CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
  }
}

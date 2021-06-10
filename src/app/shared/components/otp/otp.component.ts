import { Component, OnInit, ViewChildren, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CryptoService } from '../../../services/crypto.service';

@Component({
  selector: 'ifc-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  @Input() public buttonLabel: string = 'Submit';
  @Output() public submit: EventEmitter<string> = new EventEmitter<string>();
  @ViewChildren('formRow') rows: any;
  public formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  public otpForm: FormGroup;

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.otpForm = this.createForm(this.formInput);
  }


  keyUpEvent(event: KeyboardEvent, index: number): void {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1 ;
    } else {
      pos = index + 1 ;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }
  }

  onSubmit(): void {
    let otpCode = '';
    for (const key in this.otpForm.value) {
      otpCode += this.otpForm.value[key];
    }
    const encryptedOTP = this.cryptoService.encrypt(otpCode);
    this.submit.emit(encryptedOTP);
  }

  private createForm(elements: string[]): FormGroup {
    const group: any = {};

    elements.forEach(key => {
      group[key] = new FormControl('', Validators.required);
    });

    return new FormGroup(group);
  }

}

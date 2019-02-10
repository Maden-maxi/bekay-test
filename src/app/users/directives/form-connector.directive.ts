import { Directive, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[appFormConnector]'
})
export class FormConnectorDirective {
  @Input('appFormConnector')
  set data(value: any) {
    if (value) {
      this._formGroupDirective.form.patchValue(value);
      this._formGroupDirective.form.markAsPristine();
    }
  }
  constructor(private _formGroupDirective: FormGroupDirective) {}
}

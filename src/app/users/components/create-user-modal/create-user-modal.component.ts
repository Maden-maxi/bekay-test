import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PHONE_TEXT_MASK, PHONE_VALIDATOR, REQUIRED_EMAIL_VALIDATOR } from '../../../utils/validations';
import { Store } from '@ngrx/store';
import { State } from '../../reducers/user.reducer';
import { CreateUser } from '../../actions/user.actions';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss']
})
export class CreateUserModalComponent implements OnInit {
  form: FormGroup;
  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private store: Store<State>
  ) {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      email: this.formBuilder.control('', REQUIRED_EMAIL_VALIDATOR),
    });
  }

  ngOnInit() {
  }
  save() {
    this.bsModalRef.hide();
    if (this.form.valid) {
      this.store.dispatch(new CreateUser(this.form.value));
    }
  }

}

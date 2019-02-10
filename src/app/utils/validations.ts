import { Validators } from '@angular/forms';

// tslint:disable-next-line
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const VALIDATORS_OF_EMAIL = [Validators.email, Validators.pattern(EMAIL_REGEX)];
export const REQUIRED_EMAIL_VALIDATOR = [...VALIDATORS_OF_EMAIL, Validators.required, Validators.maxLength(60)];

export const PHONE_REGEX = /^(\+[\d]{1})\s?\(?[\d]{3}\)?\s?[\d]{3}-?[\d]{4}$/;
export const PHONE_VALIDATOR = [Validators.pattern(PHONE_REGEX), Validators.required];
export const PHONE_MASK = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
export const PHONE_TEXT_MASK = {mask: PHONE_MASK, showMask: true, guide: false};

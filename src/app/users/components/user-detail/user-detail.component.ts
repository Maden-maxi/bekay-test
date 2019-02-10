import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, mergeMap } from 'rxjs/internal/operators';
import { Store } from '@ngrx/store';
import { State } from '../../reducers/user.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PHONE_TEXT_MASK } from '../../../utils/validations';
import { UpdateUser } from '../../actions/user.actions';
import { createNumberMask } from 'text-mask-addons/dist/textMaskAddons';

function getLocation() {
  return new Observable((observer) => {
    const geolocation = navigator.geolocation;
    if (geolocation) {
      geolocation.getCurrentPosition(
        (location: Position) => observer.next(location.coords),
        (err) => observer.next(err)
      );
    } else {
      observer.error({message: 'Geo location do not supports on this device.'});
    }
  });
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user$: Observable<User>;
  form: FormGroup;
  phoneMask = PHONE_TEXT_MASK;
  moneyMask = {mask: createNumberMask({
      allowDecimal: true
    })};
  eyeColor: string;
  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.user$ = route.data.pipe(
      mergeMap((data: {user: User}) => {
        const user = data.user;
        if (user.latitude && user.longitude) {
          return of(user);
        } else {
          return getLocation().pipe(
            map((coords: Coordinates) => {
              if (coords.latitude && coords.longitude) {
                return {
                  ...user,
                  latitude: coords.latitude,
                  longitude: coords.longitude
                };
              } else {
                return user;
              }
            }),
            catchError(() => of(user))
          );
        }
      })
    );
    this.form = this.formBuilder.group({
      _id: '',
      guid: '',
      isActive: null,
      balance: '',
      picture: '',
      age: '',
      eyeColor: '',
      name: this.formBuilder.control('', [Validators.required]),
      gender: '',
      company: '',
      email: '',
      phone: '',
      address: '',
      about: '',
      registered: '',
      latitude: null,
      longitude: null,
      tags: this.formBuilder.control([]),
    });
  }

  ngOnInit() {
  }

  save() {
    if (this.form.valid) {
      this.store.dispatch(new UpdateUser(this.form.value));
    }
  }
  changePicture($event) {
    if ($event.target.files.length) {
      const fileReader = new FileReader();
      const file = $event.target.files.item(0);
      fileReader.onload = (event: any) => {
        this.form.patchValue({picture: event.target.result});
        this.cdr.detectChanges();
      };
      fileReader.readAsDataURL(file);
    }
  }
  eyeColorChange($event) {
    this.form.patchValue({eyeColor: $event});
  }
  changeLocation($event) {
    this.form.patchValue({
      latitude: $event.coords.lat,
      longitude: $event.coords.lng
    });
  }
}

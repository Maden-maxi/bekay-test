import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../reducers/user.reducer';
import { LoadUser } from '../actions/user.actions';
import { map, take } from 'rxjs/internal/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable()
export class UserResolverService implements Resolve<User | User[]> {
  constructor(private store: Store<State>, private localStorage: LocalStorage) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User | User[]> {
    this.store.dispatch(new LoadUser(route.params.id));
    return this.localStorage.getItem('users').pipe(
      map((users: User[]) => users.find(user => user._id === route.params.id)),
      take(1)
    );
  }
}

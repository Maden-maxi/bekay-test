import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';



import {
  CreateUser,
  CreateUserSuccess,
  DeleteUser, DeleteUserSuccess,
  LoadUsers,
  LoadUsersFailure,
  LoadUsersSuccess, UpdateUser, UpdateUserSuccess,
  UserActionTypes
} from '../actions/user.actions';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { of } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';

function makeid() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 24; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}


@Injectable()
export class UserEffects {


  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType<LoadUsers>(UserActionTypes.LoadUsers),
    exhaustMap(
      () => this.localStorage.getItem('users').pipe(
        mergeMap((storedUsers: User[]) => {
          if (storedUsers) {
            return of(new LoadUsersSuccess(storedUsers));
          } else {
            return this.http.get('assets/mock-data/users.json').pipe(
              mergeMap(
                (users: User[]) => this.localStorage.setItem('users', users).pipe(
                  map(() => new LoadUsersSuccess(users))
                )
              ),
              catchError(err => of(new LoadUsersFailure(err)))
            );
          }
        })
      )
    )
  );

  @Effect()
  createUser$ = this.actions$.pipe(
    ofType<CreateUser>(UserActionTypes.CreateUser),
    map((action: CreateUser) => action.payload),
    exhaustMap(
      payload => this.localStorage.getItem('users').pipe(
        mergeMap((users: User[]) => {
          const user = {
            ...payload,
            _id: makeid(),
            guid: makeid(),
            registered: new Date().toJSON(),
            isActive: false,
            balance: 0,
            picture: null,
            age: null,
            eyeColor: null,
            gender: null,
            company: null,
            phone: null,
            address: null,
            about: '',
            latitude: 0,
            longitude: 0,
            tags: [],
          };
          const newUsers = [...users, user];
          return this.localStorage.setItem('users', newUsers).pipe(
            map(() => new CreateUserSuccess({user}))
          );
        })
      )
    )
  );

  @Effect()
  deleteUser$ = this.actions$.pipe(
    ofType<DeleteUser>(UserActionTypes.DeleteUser),
    map((action: DeleteUser) => action.payload),
    exhaustMap(
      payload => this.localStorage.getItem('users').pipe(
        mergeMap(
          (users: User[]) => {
            const deleteUser = users.filter(user => user._id !== payload);
            return this.localStorage.setItem('users', deleteUser).pipe(
              map(() => new DeleteUserSuccess({id: payload}))
            );
          }
        )
      )
    )
  );

  @Effect()
  updateUser$ = this.actions$.pipe(
    ofType<UpdateUser>(UserActionTypes.UpdateUser),
    map((action: UpdateUser) => action.payload),
    exhaustMap(
      payload => this.localStorage.getItem('users').pipe(
        mergeMap(
          (users: User[]) => {
            const updateUser = users.map(user => user._id === payload._id ? payload : user);
            const updatedUser = {id: payload._id, changes: payload};
            return this.localStorage.setItem('users', updateUser).pipe(
              map(() => new UpdateUserSuccess({user: updatedUser}))
            );
          }
        )
      )
    )
  );

  @Effect({dispatch: false})
  updateUserSuccess$ = this.actions$.pipe(
    ofType<UpdateUserSuccess>(UserActionTypes.UpdateUserSuccess),
    map(() => this.router.navigate(['']))
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private localStorage: LocalStorage,
    private router: Router
  ) {}

}

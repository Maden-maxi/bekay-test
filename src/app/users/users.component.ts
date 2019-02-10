import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './reducers/user.reducer';
import { LoadUsers } from './actions/user.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private store: Store<State>,
  ) {}

  ngOnInit() {
    console.log('init');
    this.store.dispatch(new LoadUsers());
  }
}

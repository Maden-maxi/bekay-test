import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectAllUsers, State } from '../../reducers/user.reducer';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CreateUserModalComponent } from '../create-user-modal/create-user-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { DeleteUser } from '../../actions/user.actions';
import { fadeOutElement } from '../../../utils/animations';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [fadeOutElement]
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  order = 'registered';
  filterValue = new FormControl();
  reverse = false;
  orders = [
    {sort: 'name'},
    {sort: 'email'},
    {sort: 'registered'}
  ];
  constructor(
    private store: Store<State>,
    private modalService: BsModalService
  ) {
    this.users$ = store.pipe(select(selectAllUsers));
  }

  ngOnInit() {
  }

  openModal() {
    const modal: BsModalRef = this.modalService.show(CreateUserModalComponent);
  }
  askForDelete(id) {
    const modal: BsModalRef = this.modalService.show(ConfirmModalComponent);
    modal.content.onConfirm = () => {
      this.store.dispatch(new DeleteUser(id));
      modal.hide();
    };
  }
  changeOrder(order) {
    if (this.order === order) {
      this.reverse = !this.reverse;
    }
    this.order = order;
  }
}

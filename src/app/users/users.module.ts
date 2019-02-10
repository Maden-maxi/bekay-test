import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUser from './reducers/user.reducer';
import { UserEffects } from './effects/user.effects';
import { UsersComponent } from './users.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { ButtonsModule, ModalModule } from 'ngx-bootstrap';
import { CreateUserModalComponent } from './components/create-user-modal/create-user-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { TextMaskModule } from 'angular2-text-mask';
import { FormConnectorDirective } from './directives/form-connector.directive';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrderModule } from 'ngx-order-pipe';
import { AgmCoreModule } from '@agm/core';
import { FilterPipeModule } from 'ngx-filter-pipe';


@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
    UserDetailComponent,
    CreateUserModalComponent,
    ConfirmModalComponent,
    FormConnectorDirective
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    EffectsModule.forFeature([UserEffects, UserEffects]),
    StoreModule.forFeature('user', fromUser.reducer),
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    ReactiveFormsModule,
    TextMaskModule,
    ColorPickerModule,
    NgSelectModule,
    OrderModule,
    FilterPipeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC8zWNC7q2vc4bd890BgDf3iAicSyOo_U8'
    })
  ],
  entryComponents: [CreateUserModalComponent, ConfirmModalComponent]
})
export class UsersModule { }

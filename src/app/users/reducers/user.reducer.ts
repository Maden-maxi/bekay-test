import { LoadUsersSuccess, UserActions, UserActionTypes } from '../actions/user.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../models/user';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends EntityState<User> {
  selectedUserId: string | null;
}

function selectUserId(user: User) {
  return user._id;
}

function sortByRegistered(prev: User, next: User) {
  return prev.registered.localeCompare(next.registered);
}

const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: selectUserId,
  sortComparer: sortByRegistered
});

export const initialState: State = adapter.getInitialState({
  selectedUserId: null
});

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.LoadUsersSuccess:
      return adapter.addAll(action.payload, state);
    case UserActionTypes.LoadUser:
      return {
        ...state,
        selectedUserId: action.payload
      };
    case UserActionTypes.CreateUserSuccess:
      return adapter.addOne(action.payload.user, state);
    case UserActionTypes.UpdateUserSuccess:
      return adapter.updateOne(action.payload.user, state);
    case UserActionTypes.DeleteUserSuccess:
      return adapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}

export const getSelectedUserId = (state: State) => state.selectedUserId;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectUsersState = createFeatureSelector<State>('user');
export const selectAllUsers = createSelector(selectUsersState, selectAll);
export const selectUserEntities = createSelector(selectUsersState, selectEntities);
export const selectSelectedUserId = createSelector(selectUsersState, getSelectedUserId);
export const selectSelectedUser = createSelector(selectUserEntities, selectSelectedUserId, (users, id) => users[id]);

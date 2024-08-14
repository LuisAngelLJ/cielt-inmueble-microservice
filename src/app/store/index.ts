import { ActionReducerMap } from "@ngrx/store";
import * as fromUser from './user';

export interface State {
  user: fromUser.UserState;//reducer - mantiene la informacion
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer
}

export const effects = [
  fromUser.UserEffects
]

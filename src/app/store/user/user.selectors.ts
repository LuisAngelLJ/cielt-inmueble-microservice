import { createSelector, createFeatureSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

//crear el acceso
export const getUserState = createFeatureSelector<UserState>('user');

//obtener información del usuario
export const getUser = createSelector(
  getUserState,
  (state) => state.entity
);

//obtener el estado del loading
export const getLoading = createSelector(
  getUserState,
  (state) => state.loading
);

//saber si el usuario esta en sesion o no
export const getIsAuthorized = createSelector(
  getUserState,
  (state) => {
    console.log('User state:', state);
    return !!state.email;
  }
);

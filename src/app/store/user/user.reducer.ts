import { UserResponse } from "./user.models";
import * as fromActions from './user.actions';
import { INIT } from "@ngrx/store";

//defino la informacion que voy a guardar en la memoria local de ngrx
export interface UserState {
  entity: UserResponse | null;
  id: string | null;
  loading: boolean | null;
  error: string | null;
  email: string | null;
}

//inicializar
const initialstate: UserState = {
  entity: null,
  id: null,
  loading: null,
  error: null,
  email: null
}

//metodo que permite actualizar la informacion de UserState en la sesion
export function reducer(state = initialstate, action: fromActions.All | any): UserState {
  switch(action.type) {
    //Init
    case fromActions.Types.INIT: {
      return {...state, loading: true};
    }

    case fromActions.Types.INIT_AUTHORIZED: {
      return {...state, loading: false, entity: action.user, id: action.id, error: null, email: action.email};
    }

    case fromActions.Types.INIT_ERROR: {
      return {...state, loading: false, entity: null, id: null, error: action.error, email: null};
    }

    case fromActions.Types.INIT_UNAUTHORIZED: {
      return {...state, loading: false, entity: null, id: null, error: null, email: null};
    }

    //Login
    case fromActions.Types.SIGN_IN_EMAIL: {
      return {...state, loading: true, entity: null, id: null, error: null, email: null};
    }

    case fromActions.Types.SIGN_IN_EMAIL_SUCCESS: {
      return {...state, loading: false, entity: action.user, id: action.id, error: null, email: action.email};
    }

    case fromActions.Types.SIGN_IN_EMAIL_ERROR: {
      return {...state, loading: false, entity: null, id: null, error: action.error, email: null};
    }

    //registro de usuarios
    case fromActions.Types.SIGN_UP_EMAIL: {
      return {...state, loading: true, entity: null, id: null, error: null, email: null};
    }

    case fromActions.Types.SIGN_UP_EMAIL_SUCCESS: {
      return {...state, loading: false, entity: action.user, id: action.id, error: null, email: action.email};
    }

    case fromActions.Types.SIGN_UP_EMAIL_ERROR: {
      return {...state, loading: false, entity: null, id: null, error: action.error, email: null};
    }

    //salir de seiion
    case fromActions.Types.SIGIN_OUT_EMAIL: {
      return {...initialstate};
    }

    case fromActions.Types.SIGIN_OUT_EMAIL_SUCCESS: {
      return {...initialstate};
    }

    case fromActions.Types.SIGIN_OUT_EMAIL_ERROR: {
      return {...state, loading: false, entity: null, id: null, error: action.error, email: null};
    }


    default: {
      return state;
    }
  }
}

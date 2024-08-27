import * as fromList from './save/save.reducer';
import { SaveEffects } from './save/save.effects';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface InmuebleState {
  list: fromList.ListState;
}

//reducer
export const reducers: ActionReducerMap<InmuebleState> = {
  list: fromList.reducer
}

//effects
export const effects : any = [
  SaveEffects
]

//almacenar en el store
export const getInmuebleState = createFeatureSelector<InmuebleState>('inmueble');

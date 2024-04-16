import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { getArti } from './arti.service';
import { ArtiResponse } from '../models/arti-response.model';
import { ArtiRequest } from '../models/arti-request.model';

type State = {
  artiResponse: ArtiResponse | null,
};


export const ArtiStore = signalStore(
  { providedIn: 'root' },
  withState<State>(({
      artiResponse: null
    })
  ),
  withMethods(store => ({
      async load(request: ArtiRequest) {
        try {
          const response = await getArti(request);
          patchState(store, { artiResponse: response });

        } catch (error) {
          console.error(error);
        }

      }
    })
  )
);

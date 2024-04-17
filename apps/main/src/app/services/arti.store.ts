import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { getArti } from './arti.service';
import { ArtiRequest } from '../models/arti-request.model';
import { Message } from '../models/message.model';
import { ArtiResponse } from '../models/arti-response.model';

type State = {
  artiResponse: ArtiResponse | null,
  messages: Message[];
};


export const ArtiStore = signalStore(
  { providedIn: 'root' },
  withState<State>(({
      messages: [],
      artiResponse: null
    })
  ),
  withMethods(store => ({
      async load(request: ArtiRequest) {
        patchState(store, ({ messages }) => ({ messages: [...messages, { isGPT: false, msg: request.userInput }] }));
        try {
          const response = await getArti(request);
          patchState(store, ({ messages }) => (
            {
              messages: [...messages, { isGPT: true, msg: response.result }],
              artiResponse: response
            }));

        } catch (error) {
          console.error(error);
        }

      }
    })
  )
);

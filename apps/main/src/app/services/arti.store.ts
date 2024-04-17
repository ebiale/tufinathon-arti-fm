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
        let newMessage = request.userInput;
        if (request.mode === 'summarize') {
          newMessage = ' What does the code do?'
        }
        if (request.mode === 'optimize') {
          newMessage = ' How can I make it better?';
        }
        patchState(store, ({ messages }) => ({ messages: [...messages, { isGPT: false, msg: newMessage }] }));
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

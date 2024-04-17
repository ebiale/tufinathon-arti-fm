import { effect, inject, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ArtiStore } from './arti.store';

@Injectable({
  providedIn: 'root'
})
export class ArtiControlsService {
  requestLanguageCtrl = new FormControl<string>('java', { nonNullable: true });
  responseLanguageCtrl = new FormControl<string>({ value: 'java', disabled: true }, { nonNullable: true });
  requestCodeCtrl = new FormControl<string>('', { nonNullable: true });
  responseCodeCtrl = new FormControl<string>({ value: '', disabled: true }, { nonNullable: true });

  private artiStore = inject(ArtiStore);
  artiResponse = this.artiStore.artiResponse;

  constructor() {
    effect(() => {
      if (this.artiResponse()) {
        this.responseLanguageCtrl.setValue(this.artiResponse()!.language);
        this.responseCodeCtrl.setValue(this.artiResponse()!.code);
      }
    }, { allowSignalWrites: true });
  }
}

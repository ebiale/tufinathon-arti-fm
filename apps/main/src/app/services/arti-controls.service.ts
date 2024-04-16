import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ArtiControlsService {
  languageCtrl = new FormControl<string>('java', {nonNullable: true});
  codeCtrl = new FormControl<string>('', {nonNullable: true});

  constructor() {
    this.codeCtrl.valueChanges.subscribe(value => console.log('code ', value));
  }
}

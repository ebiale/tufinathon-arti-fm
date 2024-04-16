import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ArtiControlsService {
  languageCtrl = new FormControl<string>('typescript', {nonNullable: true});
  codeCtrl = new FormControl<string>('', {nonNullable: true});
}

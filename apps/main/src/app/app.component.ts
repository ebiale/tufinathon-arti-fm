import { Component } from '@angular/core';
import { ContentComponent } from './components/content/content.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { JsonPipe } from '@angular/common';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import {ResponseContentComponent} from './components/content/response-content.component';

@Component({
  standalone: true,
  imports: [
    ContentComponent,
    CodeEditorComponent,
    ReactiveFormsModule,
    JsonPipe,
    LanguageSelectorComponent,
    ResponseContentComponent
  ],
  selector: 'taf-root',
  template: `
    <div class="top">
      <span class="title">Hey There Tufiner!</span>
      <span class="sub-title">Drop sample code here and let's do some magic:</span>
      <taf-language-selector class="language-selector" [formControl]="languageCtrl" />
    </div>
    <taf-code-editor class="content code-editor" [formControl]="codeCtrl" [language]="languageCtrl.value" />
    <taf-response-content class="content response-content"/>

  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  languageCtrl = new FormControl<string>('typescript', {nonNullable: true});
  codeCtrl = new FormControl<string>('');
}

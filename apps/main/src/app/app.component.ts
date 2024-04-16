import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { JsonPipe } from '@angular/common';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import {ResponseContentComponent} from './components/content/response-content.component';
import { ArtiControlsService } from './services/arti-controls.service';

@Component({
  standalone: true,
  imports: [
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
    </div>
    <div class="content code-editor-wrapper">
      <taf-language-selector class="language-selector" [formControl]="languageCtrl" />
      <taf-code-editor  [formControl]="codeCtrl" [language]="languageCtrl.value" />
    </div>

    <taf-response-content class="content response-content"/>

  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private artiControlsService = inject(ArtiControlsService);

  languageCtrl = this.artiControlsService.languageCtrl;
  codeCtrl = this.artiControlsService.codeCtrl;
}

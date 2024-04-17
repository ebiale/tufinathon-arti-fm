import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CodeEditorComponent} from './components/code-editor/code-editor.component';
import {JsonPipe, NgOptimizedImage} from '@angular/common';
import {LanguageSelectorComponent} from './components/language-selector/language-selector.component';
import {ResponseContentComponent} from './components/content/response-content.component';
import {ArtiControlsService} from './services/arti-controls.service';

@Component({
  standalone: true,
  imports: [
    CodeEditorComponent,
    ReactiveFormsModule,
    JsonPipe,
    LanguageSelectorComponent,
    ResponseContentComponent,
    NgOptimizedImage
  ],
  selector: 'taf-root',
  template: `
    <div class="top">
      <img class="logo" src="./../assets/img.png" >
      <span class="title">Hey There Tufiner!</span>

    </div>
    <div class="content code-editor-wrapper">
      <div class="header">
        <span class="sub-title">Drop sample code here and let's do some magic:</span>
        <taf-language-selector class="language-selector" [formControl]="languageCtrl"/>
      </div>
      <taf-code-editor [formControl]="codeCtrl" [language]="languageCtrl.value"/>
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

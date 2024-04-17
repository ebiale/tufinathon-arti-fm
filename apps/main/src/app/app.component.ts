import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { JsonPipe } from '@angular/common';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { ResponseContentComponent } from './components/content/response-content.component';
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
    <div class="content code-editor-wrapper request-code">
      <taf-language-selector class="language-selector" [formControl]="requestLanguageCtrl" labelText="Pick language"/>
      <taf-code-editor [formControl]="requestCodeCtrl" [language]="requestLanguageCtrl.value" uri="request.json"/>
    </div>

    <div class="content code-editor-wrapper response-code">
      <taf-language-selector class="language-selector" [formControl]="responseLanguageCtrl" labelText="Language"/>
      <taf-code-editor [formControl]="responseCodeCtrl" [language]="responseLanguageCtrl.value"  uri="response.json"/>
    </div>


    <taf-response-content class="content response-content" />

  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private artiControlsService = inject(ArtiControlsService);

  requestLanguageCtrl = this.artiControlsService.requestLanguageCtrl;
  requestCodeCtrl = this.artiControlsService.requestCodeCtrl;
  responseLanguageCtrl = this.artiControlsService.responseLanguageCtrl;
  responseCodeCtrl = this.artiControlsService.responseCodeCtrl;
}

import { Component } from '@angular/core';
import { ContentComponent } from './components/content/content.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    ContentComponent,
    CodeEditorComponent,
    ReactiveFormsModule,
    JsonPipe
  ],
  selector: 'taf-root',
  template: `
    <taf-code-editor [formControl]="codeCtrl"/>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  codeCtrl = new FormControl<string>('');
}

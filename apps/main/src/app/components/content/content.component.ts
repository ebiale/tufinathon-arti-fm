import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';

@Component({
  selector: 'taf-content',
  standalone: true,
  imports: [CodeEditorModule],
  template: `
    <ngs-code-editor [theme]="theme" [codeModel]="model" [options]="options" (valueChanged)="onCodeChanged($event)"></ngs-code-editor>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
  theme = 'vs-dark';

  model: CodeModel = {
    language: 'postiats',
    uri: 'main.json',
    value: '{}'
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    }
  };

  onCodeChanged(value: string) {
    console.log('CODE', value);
  }

}

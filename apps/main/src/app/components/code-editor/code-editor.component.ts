import { ChangeDetectionStrategy, Component, effect, forwardRef, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'taf-code-editor',
  standalone: true,
  imports: [CommonModule,
    CodeEditorModule, MatFormField,
    ReactiveFormsModule, MatAutocompleteTrigger,
    MatAutocomplete, MatOption, MatInput, MatLabel],
  template: `

    <ngs-code-editor [theme]="theme" [codeModel]="model"
                     (valueChanged)="onCodeChanged($event)"></ngs-code-editor>

  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }



    .ngs-code-editor {
      height: 100%;
    }

    .ngs-code-editor::ng-deep {
      .overflow-guard {
        border-radius: var(--content-border-radius);
      }

      .monaco-editor {
        border-radius: var(--content-border-radius);
        --vscode-focusBorder: transparent;
      }


    }


  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeEditorComponent),
      multi: true
    }
  ]
})
export class CodeEditorComponent implements ControlValueAccessor {


  language = input.required<string>();

  onChange: (code: string) => void;
  onTouch: () => void;


  theme = 'vs-dark';

  model: CodeModel = {
    language: 'typescript',
    uri: 'main.json',
    value: '{}'
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    }
  };





  constructor() {
    effect(() => {
      this.model = {...this.model, language: this.language()};
    });
  }

  writeValue(code: string): void {
    this.model = { ...this.model, value: code };
  }

  registerOnChange(fn: (code: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  onCodeChanged(code: string) {
    this.onChange(code);
    this.onTouch();
  }
}

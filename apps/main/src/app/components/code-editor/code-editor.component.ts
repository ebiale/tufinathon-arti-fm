import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  forwardRef,
  inject,
  input,
  signal
} from '@angular/core';
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
    @if (model().uri) {
      <ngs-code-editor [theme]="theme" [codeModel]="model()!" [readOnly]="readonly"
                       (valueChanged)="onCodeChanged($event)" />
    }
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


  changeDetector = inject(ChangeDetectorRef);

  language = input.required<string>();
  uri = input.required<string>();
  readonly = false;

  onChange: (code: string) => void;
  onTouch: () => void;


  theme = 'vs-dark';

  model = signal<CodeModel>({
    value: '',
    uri: '',
    language: ''
  });

  options = {
    contextmenu: true,
    lineNumbers: true,
    minimap: {
      enabled: true
    }
  };

  constructor() {
    effect(() => {
      // this.model = {...this.model, language: this.language(), uri: this.uri()};
      this.model.update(model => ({ ...model, language: this.language(), uri: this.uri() }));
    }, { allowSignalWrites: true });
  }

  writeValue(code: string): void {
    this.model.update(model => ({ ...model, value: code }));
  }

  registerOnChange(fn: (code: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.readonly = isDisabled;
  }

  onCodeChanged(code: string) {
    this.onChange(code);
    this.onTouch();
  }
}

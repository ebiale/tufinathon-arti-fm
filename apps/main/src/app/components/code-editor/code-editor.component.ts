import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'taf-code-editor',
  standalone: true,
  imports: [CommonModule],
  template: `<p>code-editor works!</p>`,
  styles: ``,
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

  onChange: (code: string) => void;
  onTouch: () => void;

  codeCtrl = new FormControl<string>('', );

  writeValue(code: string): void {
    this.codeCtrl.setValue(code, {emitEvent: false});
  }

  registerOnChange(fn: (code: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

}

import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'taf-language-selector',
  standalone: true,
  imports: [MatFormField,
    ReactiveFormsModule, MatAutocompleteTrigger,
    MatAutocomplete, MatOption, MatInput, MatLabel],
  template: `

      <mat-form-field>
        <mat-label>Pick Language</mat-label>
        <input #inputLanguage
               type="text"
               placeholder="Pick language"
               matInput
               [formControl]="languageCtrl"
               [matAutocomplete]="auto"
               (input)="filterLanguages()"
               (focus)="filterLanguages()">
        <mat-autocomplete requireSelection #auto="matAutocomplete">
          @for (language of filteredLanguages; track language) {
            <mat-option [value]="language">{{ language }}</mat-option>
          }
        </mat-autocomplete>
      </mat-form-field>

  `,
  styles: `

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LanguageSelectorComponent),
      multi: true
    }
  ],
})
export class LanguageSelectorComponent implements ControlValueAccessor {

  onChange: (code: string) => void;
  onTouch: () => void;


  // theme = 'vs-dark';

  @ViewChild('inputLanguage') inputLanguage: ElementRef<HTMLInputElement>;
  languageCtrl = new FormControl('typescript', {nonNullable: true});
  languages = [
    'plaintext',
    'abap',
    'apex',
    'azcli',
    'bat',
    'bicep',
    'cameligo',
    'clojure',
    'coffeescript',
    'c',
    'cpp',
    'csharp',
    'csp',
    'css',
    'cypher',
    'dart',
    'dockerfile',
    'ecl',
    'elixir',
    'flow9',
    'fsharp',
    'freemarker2',
    'go',
    'graphql',
    'handlebars',
    'hcl',
    'html',
    'ini',
    'java',
    'javascript',
    'julia',
    'kotlin',
    'less',
    'lexon',
    'lua',
    'liquid',
    'm3',
    'markdown',
    'mdx',
    'mips',
    'msdax',
    'mysql',
    'objective-c',
    'pascal',
    'pascaligo',
    'perl',
    'pgsql',
    'php',
    'pla',
    'postiats',
    'powerquery',
    'powershell',
    'proto',
    'pug',
    'python',
    'qsharp',
    'r',
    'razor',
    'redis',
    'redshift',
    'restructuredtext',
    'ruby',
    'rust',
    'sb',
    'scala',
    'scheme',
    'scss',
    'shell',
    'sol',
    'aes',
    'sparql',
    'sql',
    'st',
    'swift',
    'systemverilog',
    'verilog',
    'tcl',
    'twig',
    'typescript',
    'vb',
    'wgsl',
    'xml',
    'yaml',
    'json'
  ];
  filteredLanguages: string[];



  constructor() {
    this.filteredLanguages = [...this.languages];
    this.languageCtrl.valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe(language => {
      console.log('language', language);
      this.onChange(language);
      this.onTouch();
    })
  }

  filterLanguages(): void {
    const filterValue = this.inputLanguage.nativeElement.value.toLowerCase();
    this.filteredLanguages = this.languages.filter(o => o.toLowerCase().includes(filterValue));
  }


  writeValue(language: string): void {
    // this.model = { ...this.model, value: code };
    this.languageCtrl.setValue(language, {emitEvent: false});
  }

  registerOnChange(fn: (code: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  // onCodeChanged(code: string) {
  //   this.onChange(code);
  //   this.onTouch();
  // }
}


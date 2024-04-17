import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArtiRequest } from '../../../models/arti-request.model';
import { ArtiStore } from '../../../services/arti.store';
import { ArtiControlsService } from '../../../services/arti-controls.service';

@Component({
  selector: 'taf-text-box',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './text-box.component.html',
  styleUrl: './text-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextBoxComponent implements OnInit {
  @Input() placeholder = '';

  private artiStore = inject(ArtiStore);
  loading = this.artiStore.loading;
  private artiControlsService = inject(ArtiControlsService);

  fb: FormBuilder = inject(FormBuilder);
  form: FormGroup<any> = this.fb.group({
    prompt: [''],
  });

  ngOnInit(): void {
    const promptControl = this.form.get('prompt');
    promptControl?.setValidators([Validators.required]);
    promptControl?.updateValueAndValidity();
  }

  send(mode: ArtiRequest['mode']) {
    if (!this.loading()) {

      let userInput = '';
      if (mode === 'advanced') {
        userInput = this.form?.value.prompt;
      }
      this.artiStore.load({
        code: this.artiControlsService.requestCodeCtrl.value,
        mode,
        language: this.artiControlsService.requestLanguageCtrl.value,
        userInput
      });
      this.form?.reset();
    }
  }
}




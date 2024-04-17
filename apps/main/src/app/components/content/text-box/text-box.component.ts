import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArtiRequest } from '../../../models/arti-request.model';

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
  @Output() sendMessage = new EventEmitter<string>();

  fb: FormBuilder = inject(FormBuilder);
  form: FormGroup<any> = this.fb.group({
    prompt: [''],
  });

  ngOnInit(): void {
    const promptControl = this.form.get('prompt');
    promptControl?.setValidators([Validators.required]);
    promptControl?.updateValueAndValidity();
  }

  handleSubmit() {
    if(this.form?.invalid) return;
    const prompt = this.form?.value.prompt;
    this.sendMessage.emit(prompt);
    this.form?.reset();
  }

  send(mode: ArtiRequest['mode']) {

  }
}




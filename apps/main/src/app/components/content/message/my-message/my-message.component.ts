import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'taf-my-message',
  standalone: true,
  templateUrl: './my-message.component.html',
  styleUrl: './my-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MyMessageComponent {
  @Input({required: true}) text!: string;
}

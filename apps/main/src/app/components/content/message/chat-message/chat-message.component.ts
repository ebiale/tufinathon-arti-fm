import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'taf-chat-message',
  standalone: true,
  imports: [
  ],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent {
  @Input({required: true}) text!: string;

}

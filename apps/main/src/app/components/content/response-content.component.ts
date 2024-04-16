import {ChangeDetectionStrategy, Component, effect, ElementRef, signal, ViewChild} from '@angular/core';
import {TextBoxComponent} from './text-box/text-box.component';
import {MyMessageComponent} from './message/my-message/my-message.component';
import {ChatMessageComponent} from './message/chat-message/chat-message.component';

@Component({
  selector: 'taf-response-content',
  standalone: true,
  templateUrl: './response-content.component.html',
  styleUrl: './response-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TextBoxComponent,
    MyMessageComponent,
    ChatMessageComponent

  ],
})
export class ResponseContentComponent {
  @ViewChild('container') containerRef: ElementRef;

  constructor() {
    effect(() => {
      if (this.messages()) {
        this.focusLastItem();
      }

    });
  }

  messages = signal<{msg: string, isGPT: boolean }[]>([
    {isGPT: true, msg: 'First message test'},{ isGPT: false, msg: 'Second message test'}
  ]);
  isLoading = signal(false);



  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.updateMessages(prompt, false);
  //  this.service.getResponse(prompt).subscribe(resp => {
      this.isLoading.set(false);
    //  if (resp.ok) {
    //todo get response from the api
    const resp = {message: 'test'}
        this.updateMessages(resp.message, true);

   //   } else {
    //    this.updateMessages(resp.message, true);
 //     }
 //   });
  }

  focusLastItem() {
    const container = this.containerRef.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  private updateMessages(msg: string, isGPT: boolean) {
    this.messages.update((prevMessages) => [
      ...prevMessages,
      {
        isGPT,
        msg,
      }
    ])

  }
}

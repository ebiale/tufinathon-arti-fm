import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { TextBoxComponent } from './text-box/text-box.component';
import { MyMessageComponent } from './message/my-message/my-message.component';
import { ChatMessageComponent } from './message/chat-message/chat-message.component';
import { ArtiStore } from '../../services/arti.store';
import { ArtiControlsService } from '../../services/arti-controls.service';

@Component({
  selector: 'taf-response-content',
  standalone: true,
  templateUrl: './response-content.component.html',
  styleUrl: './response-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TextBoxComponent,
    MyMessageComponent,
    ChatMessageComponent,
  ]
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

  private artiStore = inject(ArtiStore);
  private artiControlsService = inject(ArtiControlsService);
  messages = this.artiStore.messages;


  handleMessage(prompt: string) {

    this.artiStore.load({
      code: this.artiControlsService.requestCodeCtrl.value,
      mode: 'summarize',
      language: this.artiControlsService.requestLanguageCtrl.value,
      userInput: prompt
    });
  }

  focusLastItem() {
    const container = this.containerRef.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

}

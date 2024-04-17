import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { TextBoxComponent } from './text-box/text-box.component';
import { MyMessageComponent } from './message/my-message/my-message.component';
import { ChatMessageComponent } from './message/chat-message/chat-message.component';
import { ArtiStore } from '../../services/arti.store';
import {LoaderComponent} from '../loader/loader.component';

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
    LoaderComponent,
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
  loading = this.artiStore.loading;
  messages = this.artiStore.messages;


  focusLastItem() {
    const container = this.containerRef.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

}

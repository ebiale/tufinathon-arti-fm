import { Component } from '@angular/core';
import { ContentComponent } from './components/content/content.component';

@Component({
  standalone: true,
  imports: [
    ContentComponent
  ],
  selector: 'taf-root',
  template: `
    <taf-content/>
  `,
  styles: `
    :host {
      color: blue;
    }

  `,
})
export class AppComponent {
  title = 'main';
}

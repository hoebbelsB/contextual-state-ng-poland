import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

enum ActiveDemo {
  Demo1 = 'demo1',
  Demo2 = 'demo2',
  Demo3 = 'demo3',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}

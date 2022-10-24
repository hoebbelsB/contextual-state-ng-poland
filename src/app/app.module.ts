import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LetModule } from '@rx-angular/template/let';

import { AppComponent } from './app.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { StarRatingModule } from './star-rating/star-rating.module';
import { DemoOneComponent } from './demo-one.component';
import { DemoThreeComponent } from './demo-three.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    DemoOneComponent,
    DemoThreeComponent,
  ],
  imports: [
    BrowserModule,
    StarRatingModule,
    LetModule,
    RouterModule.forRoot([
      {
        path: 'demo1',
        component: DemoOneComponent,
      },
      {
        path: 'demo3',
        component: DemoThreeComponent,
      },
      /*{
        path: '',
        redirectTo: 'demo1',
      },*/
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

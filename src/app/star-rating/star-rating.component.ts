import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TrackByFunction,
  ViewEncapsulation,
} from '@angular/core';

const range = 10;
const numStars = 5;
const starsArray: number[] = new Array(numStars).fill(1);

@Component({
  selector: 'ui-star-rating',
  template: `
    <div class="stars">
      <span
        *ngFor="let fill of stars; trackBy: trackByIndex"
        class="star"
        [ngClass]="{
          'star-half': fill === 0,
          'star-empty': fill === -1
        }"
        >★</span
      >
    </div>
    <div class="rating-value" *ngIf="showRating">{{ rating }}</div>
  `,
  styleUrls: ['star-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class StarRatingComponent {
  range = range;
  numStars = numStars;
  stars: number[] = starsArray;
  @Input() showRating = false;
  tooltipText = `0 average rating`;
  trackByIndex: TrackByFunction<number> = i => i;

  private _rating = 5;
  @Input()
  set rating(rating: number | undefined) {
    this._rating = rating || 0;

    this.setToolTopText(this.rating);

    const scaledRating = this._rating / (this.range / this.numStars);
    const full = Math.floor(scaledRating);
    const half = scaledRating % 1 > 0.5 ? 1 : 0;
    const empty = this.numStars - full - half;
    this.stars = new Array(full)
      .fill(1)
      .concat(new Array(half).fill(0))
      .concat(new Array(empty).fill(-1));
  }
  get rating(): number {
    return this._rating;
  }

  private setToolTopText(rating: number) {
    this.tooltipText = `${rating} average rating`;
  }
}

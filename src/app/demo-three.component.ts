import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { setTimeout } from '@rx-angular/cdk/zone-less/browser';
import {
  BehaviorSubject,
  catchError,
  map,
  of,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-demo-three',
  templateUrl: './demo-three.component.html',
  styleUrls: ['./demo-three.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoThreeComponent {
  private searchTerm$ = new BehaviorSubject<string>('');

  /** state creation functions **/

  /** async start **/
  createState = () =>
    this.searchTerm$.pipe(
      switchMap(term => this.movieService.searchMovies(term))
    );

  /** async final **/
  /*createState = () => {
    // introduce movie cache to not lose data when searching
    let movieCache: Movie[] = [];
    return this.searchTerm$.pipe(
      switchMap(term => {
        return this.movieService.searchMovies(term).pipe(
          map(movies => {
            // cache latest movie values when
            movieCache = movies;
            return { movies };
          }),
          catchError(e =>
            of({ loading: false, movies: movieCache, error: true })
          ),
          /!** when we start the search, emit loading true + cached movies **!/
          startWith({ loading: true, movies: movieCache, error: false })
        );
      })
    );
  };*/

  /** rxlet **/
  /*createState = () =>
    this.searchTerm$.pipe(
      switchMap(term => this.movieService.searchMovies(term))
    );*/

  /** template state **/
  state$ = this.createState();

  /** template triggers **/
  suspenseTrigger$ = new Subject<void>();
  completeTrigger$ = new Subject<void>();
  errorTrigger$ = new Subject<void>();
  nextTrigger$ = new Subject<void>();

  constructor(private readonly movieService: MovieService) {}

  /** methods to implement **/
  search(term: string) {
    this.triggerSuspense();
    this.searchTerm$.next(term);
  }

  /** demo ui bindings **/

  showError() {
    this.movieService.withError = true;
    this.reset();
    setTimeout(() => (this.movieService.withError = false));
  }

  reset() {
    this.state$ = this.createState();
  }

  triggerSuspense() {
    this.suspenseTrigger$.next();
  }

  triggerComplete() {
    this.completeTrigger$.next();
  }

  triggerNext() {
    this.nextTrigger$.next();
  }

  triggerError() {
    this.errorTrigger$.next();
  }
}

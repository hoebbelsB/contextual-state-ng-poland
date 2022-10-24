import { Injectable } from '@angular/core';
import {
  catchError,
  concatMap,
  delay,
  endWith,
  from,
  interval,
  map,
  Observable,
  of,
  scan,
  startWith,
  Subject,
  switchMap,
  takeWhile,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // extremely ugly hack just for the demo to have less bloat
  withError = false;

  getMovies(): Observable<Movie[]> {
    const withError = this.withError;
    return timer(2500).pipe(
      map(() => [...movies]),
      o$ => {
        if (withError) {
          return o$.pipe(
            switchMap(() =>
              throwError(() => new Error('thrown from MovieService#getMovies'))
            )
          );
        }
        return o$;
      }
    );
  }

  streamMovies(): Observable<Movie[]> {
    const withError = this.withError;
    return from([...movies].slice(0, 4)).pipe(
      concatMap(movie => timer(1000).pipe(map(() => movie))),
      scan((movies, movie) => [movie, ...movies], [] as Movie[]),
      o$ => {
        if (withError) {
          return o$.pipe(
            switchMap(() =>
              throwError(
                () => new Error('thrown from MovieService#streamMovies')
              )
            )
          );
        }
        return o$;
      }
    );
  }

  searchMovies(term: string): Observable<Movie[]> {
    const withError = this.withError;
    return timer(1250).pipe(
      map(() => {
        if (term === 'error') {
          throw new Error('searched for error');
        }
        return term
          ? [...movies].filter(m =>
              m.title.toLowerCase().includes(term.toLowerCase())
            )
          : [...movies];
      }),
      o$ => {
        if (withError) {
          return o$.pipe(
            switchMap(() =>
              throwError(
                () => new Error('thrown from MovieService#searchMovies')
              )
            )
          );
        }
        return o$;
      }
    );
  }
}

const movies: Movie[] = [
  {
    id: 414906,
    poster_path: '/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    title: 'The Batman',
    vote_average: 7.9,
  },
  {
    adult: false,
    backdrop_path: '/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg',
    genre_ids: [28, 12, 878],
    id: 634649,
    original_language: 'en',
    original_title: 'Spider-Man: No Way Home',
    overview:
      'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.',
    popularity: 5456.823,
    poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    release_date: '2021-12-15',
    title: 'Spider-Man: No Way Home',
    video: false,
    vote_average: 8.2,
    vote_count: 11855,
  },
  {
    adult: false,
    backdrop_path: '/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg',
    genre_ids: [16, 10751, 35, 14],
    id: 508947,
    original_language: 'en',
    original_title: 'Turning Red',
    overview:
      'Thirteen-year-old Mei is experiencing the awkwardness of being a teenager with a twist – when she gets too excited, she transforms into a giant red panda.',
    popularity: 4409.897,
    poster_path: '/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg',
    release_date: '2022-03-10',
    title: 'Turning Red',
    video: false,
    vote_average: 7.5,
    vote_count: 1788,
  },
  {
    adult: false,
    backdrop_path: '/egoyMDLqCxzjnSrWOz50uLlJWmD.jpg',
    genre_ids: [28, 878, 35, 10751],
    id: 675353,
    original_language: 'en',
    original_title: 'Sonic the Hedgehog 2',
    overview:
      'After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles, in search for an emerald that has the power to destroy civilizations. Sonic teams up with his own sidekick, Tails, and together they embark on a globe-trotting journey to find the emerald before it falls into the wrong hands.',
    popularity: 4025.233,
    poster_path: '/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg',
    release_date: '2022-03-30',
    title: 'Sonic the Hedgehog 2',
    video: false,
    vote_average: 7.7,
    vote_count: 606,
  },
  {
    adult: false,
    backdrop_path: '/dqWiut9F30jkiKHHkYTf2RIy1g7.jpg',
    genre_ids: [878, 28],
    id: 919689,
    original_language: 'en',
    original_title: 'War of the Worlds: Annihilation',
    overview:
      'A mother and son find themselves faced with a brutal alien invasion where survival will depend on discovering the unthinkable truth about the enemy.',
    popularity: 2603.403,
    poster_path: '/9eiUNsUAw2iwVyMeXNNiNQQad4E.jpg',
    release_date: '2021-12-22',
    title: 'War of the Worlds: Annihilation',
    video: false,
    vote_average: 6.1,
    vote_count: 29,
  },
  {
    adult: false,
    backdrop_path: '/6MwsrP7QHzLwqy6NXKEXvlUdlem.jpg',
    genre_ids: [53, 28],
    id: 294793,
    original_language: 'en',
    original_title: 'All the Old Knives',
    overview:
      'When the CIA discovers one of its agents leaked information that cost more than 100 people their lives, veteran operative Henry Pelham is assigned to root out the mole with his former lover and colleague Celia Harrison.',
    popularity: 3520.129,
    poster_path: '/g4tMniKxol1TBJrHlAtiDjjlx4Q.jpg',
    release_date: '2022-04-08',
    title: 'All the Old Knives',
    video: false,
    vote_average: 6,
    vote_count: 140,
  },
  {
    adult: false,
    backdrop_path: '/x747ZvF0CcYYTTpPRCoUrxA2cYy.jpg',
    genre_ids: [28, 12, 878],
    id: 406759,
    original_language: 'en',
    original_title: 'Moonfall',
    overview:
      'A mysterious force knocks the moon from its orbit around Earth and sends it hurtling on a collision course with life as we know it.',
    popularity: 3023.345,
    poster_path: '/odVv1sqVs0KxBXiA8bhIBlPgalx.jpg',
    release_date: '2022-02-03',
    title: 'Moonfall',
    video: false,
    vote_average: 6.5,
    vote_count: 740,
  },
  {
    adult: false,
    backdrop_path: '/hXTWVJMsI9BkxMLliqL1j0FT55t.jpg',
    genre_ids: [28],
    id: 606402,
    original_language: 'ko',
    original_title: '야차',
    overview:
      'Nicknamed after a human-devouring spirit, the ruthless leader of an overseas black ops team takes up a dangerous mission in a city riddled with spies.',
    popularity: 3633.52,
    poster_path: '/7MDgiFOPUCeG74nQsMKJuzTJrtc.jpg',
    release_date: '2022-04-08',
    title: 'Yaksha: Ruthless Operations',
    video: false,
    vote_average: 6.2,
    vote_count: 47,
  },
  {
    adult: false,
    backdrop_path: '/2n95p9isIi1LYTscTcGytlI4zYd.jpg',
    genre_ids: [18, 53, 80],
    id: 799876,
    original_language: 'en',
    original_title: 'The Outfit',
    overview:
      'Leonard is an English tailor who used to craft suits on London’s world-famous Savile Row. After a personal tragedy, he’s ended up in Chicago, operating a small tailor shop in a rough part of town where he makes beautiful clothes for the only people around who can afford them: a family of vicious gangsters.',
    popularity: 2990.317,
    poster_path: '/lZa5EB6PVJBT5mxhgZS5ftqdAm6.jpg',
    release_date: '2022-02-25',
    title: 'The Outfit',
    video: false,
    vote_average: 7.1,
    vote_count: 95,
  },
  {
    adult: false,
    backdrop_path: '/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg',
    genre_ids: [16, 35, 10751, 14],
    id: 568124,
    original_language: 'en',
    original_title: 'Encanto',
    overview:
      "The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family's last hope.",
    popularity: 1946.774,
    poster_path: '/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
    release_date: '2021-11-24',
    title: 'Encanto',
    video: false,
    vote_average: 7.7,
    vote_count: 6116,
  },
  {
    adult: false,
    backdrop_path: '/iDeWAGnmloZ5Oz3bocDp4rSbUXd.jpg',
    genre_ids: [28, 53],
    id: 823625,
    original_language: 'en',
    original_title: 'Blacklight',
    overview:
      'Travis Block is a shadowy Government agent who specializes in removing operatives whose covers have been exposed. He then has to uncover a deadly conspiracy within his own ranks that reaches the highest echelons of power.',
    popularity: 1715.914,
    poster_path: '/bv9dy8mnwftdY2j6gG39gCfSFpV.jpg',
    release_date: '2022-02-10',
    title: 'Blacklight',
    video: false,
    vote_average: 6.1,
    vote_count: 291,
  },
  {
    adult: false,
    backdrop_path: '/ewUqXnwiRLhgmGhuksOdLgh49Ch.jpg',
    genre_ids: [28, 12, 35, 878],
    id: 696806,
    original_language: 'en',
    original_title: 'The Adam Project',
    overview:
      'After accidentally crash-landing in 2022, time-traveling fighter pilot Adam Reed teams up with his 12-year-old self on a mission to save the future.',
    popularity: 1810.633,
    poster_path: '/wFjboE0aFZNbVOF05fzrka9Fqyx.jpg',
    release_date: '2022-03-11',
    title: 'The Adam Project',
    video: false,
    vote_average: 7,
    vote_count: 1876,
  },
];

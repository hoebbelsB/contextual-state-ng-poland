export interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  // didn't want to clean all json data :)
  [key: string]: any;
}

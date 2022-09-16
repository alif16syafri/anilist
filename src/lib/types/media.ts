export type Media = {
  id: number;
  coverImage: {
    large: string;
  };
  title: {
    userPreferred: string;
  }
  description?: string;
  episodes?: number;
  genres?: string[];
}

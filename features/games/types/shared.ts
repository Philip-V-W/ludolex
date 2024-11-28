export interface TransformedGame {
  id: string;
  title: string;
  description: string;
  mainImage: string;
  thumbnails: string[];
  platforms: {
    name: string;
    slug: string;
  }[];
  genres: string[];
  score: number;
}

// TODO: add other shared interfaces like Platform, Store, etc.
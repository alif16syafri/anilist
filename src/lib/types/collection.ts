import { Media } from './media';

export type Collection = {
  id: string;
  name: string;
  media: Media[];
}

export type CollectionInput = {
  collectionName: string;
}

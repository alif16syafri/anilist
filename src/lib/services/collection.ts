import { ErrorCode } from '../config';

import type { Collection } from '../types/collection';
import type { Media } from '../types/media';
import { error } from '../config';
import { ErrorMessage } from '../config';

const COLLECTIONS_KEY = '__ani_collections';
const GET_TIMEOUT_DURATION = 1000;
const POST_TIMEOUT_DURATION = 200;

export const saveCollections = (collections: Collection[]) => {
  localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
};

export const getCollections = (): Promise<Collection[]> => {
  return new Promise((resolve) => {
    const collections: Collection[] = JSON.parse(localStorage.getItem(COLLECTIONS_KEY) ?? '[]');

    setTimeout(() => resolve(collections), GET_TIMEOUT_DURATION);
  });
};

export const getCollectionById = (id: string): Promise<Collection | undefined> => {
  return new Promise((resolve) => {
    const collections: Collection[] = JSON.parse(localStorage.getItem(COLLECTIONS_KEY) ?? '[]');
    const foundCollection = collections.find((col) => col.id === id);

    setTimeout(() => resolve(foundCollection), GET_TIMEOUT_DURATION);
  });
};

export const addCollection = async (collection: Collection): Promise<Collection[]> => {
  return new Promise(async (resolve, reject) => {
    const collections = await getCollections();
    const foundCollectionIndex = collections.findIndex((col) => col.name === collection.name);
    let copiedCollections = [...collections];

    if (foundCollectionIndex === -1) {
      copiedCollections = [...copiedCollections, collection];
      await saveCollections(copiedCollections);
      setTimeout(() => resolve(copiedCollections), POST_TIMEOUT_DURATION);
    } else {
      setTimeout(() => reject(error({
        code: ErrorCode.ALREADY_EXIST,
        message: ErrorMessage.COLLECTION_ALREADY_EXIST,
      })), POST_TIMEOUT_DURATION);
    }
  });
};

export const editCollectionName = async (id: string, collectionName: string): Promise<Collection[]> => {
  return new Promise(async (resolve, reject) => {
    const collections = await getCollections();
    const foundCollectionIndex = collections.findIndex((col) => col.id === id);
    const foundCollectionNameIndex = collections.findIndex((col) => col.name === collectionName.toLowerCase());
    let copiedCollections = [...collections];

    // name is similar with current name
    if (foundCollectionIndex === foundCollectionNameIndex) resolve(copiedCollections);

    if (foundCollectionIndex > -1) {
      if (foundCollectionNameIndex === -1) {
        copiedCollections[foundCollectionIndex].name = collectionName;
        await saveCollections(copiedCollections);
        setTimeout(() => resolve(copiedCollections), POST_TIMEOUT_DURATION);
      } else {
        setTimeout(() => reject(error({
          code: ErrorCode.ALREADY_EXIST,
          message: ErrorMessage.COLLECTION_ALREADY_EXIST,
        })), POST_TIMEOUT_DURATION);
      }
    }
  });
};

export const deleteCollection = async (id: string): Promise<Collection[]> => {
  return new Promise(async (resolve) => {
    const collections = await getCollections();
    const foundCollectionIndex = collections.findIndex((col) => col.id === id);
    let copiedCollections = [...collections];

    if (foundCollectionIndex > -1) {
      copiedCollections.splice(foundCollectionIndex, 1);
    }

    await saveCollections(copiedCollections);

    setTimeout(() => resolve(copiedCollections), POST_TIMEOUT_DURATION);
  });
};

export const addMediaToCollection = async (media: Media, collectionId: string): Promise<Collection[]> => {
  return new Promise(async (resolve) => {
    const collections = await getCollections();
    const foundCollectionIndex = collections.findIndex((col) => col.id === collectionId);
    let copiedCollections = [...collections];

    if (foundCollectionIndex > -1) {
      copiedCollections[foundCollectionIndex].media = [...copiedCollections[foundCollectionIndex].media, media];
    }

    await saveCollections(copiedCollections);

    setTimeout(() => resolve(copiedCollections), POST_TIMEOUT_DURATION);
  });
};

export const getCollectionsByMediaId = async (id: number): Promise<Collection[]> => {
  return new Promise(async (resolve) => {
    const collections = await getCollections();

    setTimeout(() => resolve(
        collections.filter((collection) => collection.media.some(item => item.id === id))),
      GET_TIMEOUT_DURATION,
    );
  });
};

export const deleteMediaFromCollectionById = (collectionId: string, mediaId: number): Promise<Collection> => {
  return new Promise(async (resolve) => {
    const collections = await getCollections();
    const foundCollectionIndex = collections.findIndex((col) => col.id === collectionId);
    let copiedCollections = [...collections];

    const foundMediaIndex = collections[foundCollectionIndex].media.findIndex((media) => media.id === mediaId);

    if (foundCollectionIndex > -1 && foundMediaIndex > -1) {
      copiedCollections[foundCollectionIndex].media.splice(foundMediaIndex, 1);
    }

    await saveCollections(copiedCollections);

    setTimeout(() => resolve(copiedCollections[foundCollectionIndex]), POST_TIMEOUT_DURATION);
  });
};


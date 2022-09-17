import { useState, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useQuery as useGQLQuery, gql } from '@apollo/client';
import { useQuery as useReactQuery, useMutation } from '@tanstack/react-query';
import { useMatch } from '@tanstack/react-location';
import { v4 as uuid } from 'uuid';

import { useCollections } from 'hooks/useCollections';
import { getCollectionsByMediaId, addMediaToCollection } from 'lib/services/collection';

import type { Collection, CollectionInput } from 'lib/types/collection';
import type { Media } from 'lib/types/media';

type AnimeDetailData = {
  Media: Media;
}

type AnimeDetailVariables = {
  id: number;
}

export const GET_ANIME_DETAIL = gql`
    query GetAnimeDetail ($id: Int!) {
      Media(id: $id) {
        id
        title {
          userPreferred
        }
        coverImage {
          large
        }
        description
        episodes
        genres
      }
    }
`;

const filterCollections = (
  collections: Collection[],
  collectionsByMediaDict: Record<string, Collection>,
) => {
  return collections?.filter((col) => !collectionsByMediaDict[col.id]);
};

export const useAnimeDetailPage = () => {
  const { params: { id } } = useMatch();

  const [isCollectionFormOpen, setIsCollectionFormOpen] = useState(false);
  const [collections, setCollections] = useState<Collection[]>();
  const [isCreatingNewCollection, setIsCreatingNewCollection] = useState(false);

  const {
    register,
    setError,
    reset: resetForm,
    handleSubmit: handleAttemptSubmit,
    formState: { errors: formErrors },
  } = useForm<CollectionInput>();

  const {
    data: collectionsByMedia = [],
    isLoading: isLoadingCollectionsByMedia,
    refetch: refetchCollectionsByMedia,
  } = useReactQuery(['collections-by-media', { id }], () => getCollectionsByMediaId(parseInt(id)));
  const {
    data,
    loading,
    error,
  } = useGQLQuery<AnimeDetailData, AnimeDetailVariables>(GET_ANIME_DETAIL, {
    variables: { id: parseInt(id) },
  });

  /**
   * Storing collection which media already in.
   */
  const collectionsByMediaDict: Record<string, Collection> = useMemo(() => collectionsByMedia.reduce((total, col) => ({
    ...total,
    [col.id]: col,
  }), {}), [collectionsByMedia]);

  const setFilteredCollections = useCallback((data: Collection[]) => {
    setCollections(filterCollections(data, collectionsByMediaDict));
  }, [collectionsByMediaDict]);

  const {
    addMutation: addCollectionMutation,
    isLoading: isLoadingCollections,
    refetch: refetchCollections,
  } = useCollections({
    enabledGetCollections: isCollectionFormOpen,
    onSuccessGetCollections: setFilteredCollections,
    onSuccessSubmitCollection: (data) => {
      handleAddToCollection(data[data.length - 1]);
      setFilteredCollections(data);
    },
    onErrorSubmitCollection: (msg) => setError('collectionName', { message: msg }),
  });
  const addToCollectionMutation = useMutation({
    mutationFn: ({ media, collectionId }: {
      media: Media,
      collectionId: string,
    }) => addMediaToCollection(media, collectionId),
    onSuccess: async () => {
      handleCloseCollectionForm();

      toast('success add to collection');

      await refetchCollectionsByMedia();
      await refetchCollections();
    },
  });

  const handleOpenCollectionForm = useCallback(() => {
    setIsCollectionFormOpen(true);
  }, []);

  const handleCloseCollectionForm = useCallback(() => {
    setIsCollectionFormOpen(false);
    setIsCreatingNewCollection(false);
    resetForm();
  }, [resetForm]);

  const handleAddToCollection = useCallback((collection: Collection) => {
    data && addToCollectionMutation.mutate({ media: data.Media, collectionId: collection.id });
  }, [addToCollectionMutation, data]);

  const handleToggleNewCollection = useCallback(() => {
    setIsCreatingNewCollection(!isCreatingNewCollection);
  }, [isCreatingNewCollection]);

  const handleAddNewCollection = useCallback((form: CollectionInput) => {
    const collection: Collection = {
      id: uuid(),
      name: form.collectionName,
      media: [],
    };

    addCollectionMutation.mutate(collection);
  }, [addCollectionMutation]);

  return {
    register,
    data,
    error,
    formErrors,
    isLoading: loading || isLoadingCollectionsByMedia,
    isLoadingCollections,
    isCollectionFormOpen,
    isCreatingNewCollection,
    collectionsByMedia,
    collections,
    handleOpenCollectionForm,
    handleCloseCollectionForm,
    handleAddToCollection,
    handleToggleNewCollection,
    handleAddNewCollection,
    handleAttemptSubmit,
  };
};

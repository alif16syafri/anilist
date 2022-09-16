import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useMatch } from '@tanstack/react-location';

import { getCollectionById, deleteMediaFromCollectionById } from 'lib/services/collection';
import { useCollections } from 'hooks/useCollections';

import type { Collection, CollectionInput } from 'lib/types/collection';
import type { Media } from 'lib/types/media';

export const useCollectionDetailPage = () => {
  const { params: { id } } = useMatch();

  const [collection, setCollection] = useState<Collection>();
  const [selectedMedia, setSelectedMedia] = useState<Media>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const {
    register,
    setValue,
    setError,
    watch,
    reset: resetForm,
    handleSubmit: handleAttemptSubmit,
    formState: { errors: formErrors },
  } = useForm<CollectionInput>();

  const collectionName = watch('collectionName');

  const { isLoading, isError } = useQuery(['collection-by-id', { id }], () => getCollectionById(id), {
    onSuccess: setCollection,
  });
  const deleteAnimeMutation = useMutation({
    mutationFn: ({ collectionId, mediaId }: {
      collectionId: string,
      mediaId: number,
    }) => deleteMediaFromCollectionById(collectionId, mediaId),
    onSuccess: (data) => {
      handleCloseDelete();
      setCollection(data);
    },
  });
  const { editMutation } = useCollections({
    enabledGetCollections: false,
    onSuccessSubmitCollection: () => {
      handleCloseForm();
      setCollection((prev) => {
        if (prev) {
          return {
            ...prev,
            name: collectionName,
          };
        }
      });
    },
    onErrorSubmitCollection: (msg) => setError('collectionName', { message: msg }),
  });

  const handleOpenForm = useCallback(() => {
    setValue('collectionName', collection?.name ?? '');
    setIsFormOpen(true);
  }, [collection?.name, setValue]);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);

    resetForm();
  }, [resetForm]);

  const handleSubmitEdit = useCallback((form: CollectionInput) => {
    if (collection?.id) {
      editMutation.mutate({
        id: collection.id,
        name: form?.collectionName,
      });
    }
  }, [collection?.id, editMutation]);

  const handleOpenDelete = useCallback((media: Media) => {
    setSelectedMedia(media);
    setIsDeleteOpen(true);
  }, []);

  const handleCloseDelete = useCallback(() => {
    setSelectedMedia(undefined);
    setIsDeleteOpen(false);
  }, []);

  const handleDelete = useCallback(() => {
    if (collection?.id && selectedMedia?.id) {
      deleteAnimeMutation.mutate({
        collectionId: collection.id,
        mediaId: selectedMedia.id,
      });
    }
  }, [collection?.id, deleteAnimeMutation, selectedMedia?.id]);

  return {
    register,
    isFormOpen,
    isDeleteOpen,
    isLoading,
    isError,
    formErrors,
    selectedMedia,
    collection,
    handleOpenForm,
    handleCloseForm,
    handleAttemptSubmit,
    handleSubmitEdit,
    handleOpenDelete,
    handleCloseDelete,
    handleDelete,
  };
};

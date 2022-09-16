import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

import { useCollections } from 'hooks/useCollections';

import type { Collection, CollectionInput } from 'lib/types/collection';

export const useCollectionListPage = () => {
  const [collections, setCollections] = useState<Collection[]>();
  const [selectedCollection, setSelectedCollection] = useState<Collection>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const {
    register,
    setValue,
    setError,
    reset: resetForm,
    handleSubmit: handleAttemptSubmit,
    formState: { errors: formErrors },
  } = useForm<CollectionInput>({
    defaultValues: {
      collectionName: selectedCollection?.name,
    },
  });

  const { addMutation, editMutation, deleteMutation, isLoading, isError } = useCollections({
    onSuccessGetCollections: setCollections,
    onSuccessSubmitCollection: (newCollections) => {
      handleCloseForm();
      setCollections(newCollections);
    },
    onErrorSubmitCollection: (msg) => setError('collectionName', { message: msg }),
    onSuccessDeleteCollection: (newCollections) => {
      handleCloseDelete();
      setCollections(newCollections);
    },
  });

  const handleOpenForm = useCallback((col?: Collection) => {
    setSelectedCollection(col);
    setValue('collectionName', col?.name ?? '');
    setIsFormOpen(true);
  }, [setValue]);

  const handleCloseForm = useCallback(() => {
    setSelectedCollection(undefined);
    setIsFormOpen(false);

    resetForm();
  }, [resetForm]);

  const handleSubmitEdit = useCallback((form: CollectionInput) => {
    if (selectedCollection?.name) {
      editMutation.mutate({
        id: selectedCollection?.id,
        name: form?.collectionName,
      });
    } else {
      const collection: Collection = {
        id: uuid(),
        name: form.collectionName,
        media: [],
      };

      addMutation.mutate(collection);
    }
  }, [addMutation, editMutation, selectedCollection?.id, selectedCollection?.name]);

  const handleOpenDelete = useCallback((col: Collection) => {
    setSelectedCollection(col);
    setIsDeleteOpen(true);
  }, []);

  const handleCloseDelete = useCallback(() => {
    setSelectedCollection(undefined);
    setIsDeleteOpen(false);
  }, []);

  const handleDelete = useCallback(() => {
    selectedCollection?.id && deleteMutation.mutate(selectedCollection?.id);
  }, [deleteMutation, selectedCollection?.id]);

  return {
    register,
    isLoading,
    isError,
    formErrors,
    collections,
    selectedCollection,
    isFormOpen,
    isDeleteOpen,
    handleAttemptSubmit,
    handleOpenForm,
    handleCloseForm,
    handleSubmitEdit,
    handleOpenDelete,
    handleCloseDelete,
    handleDelete,
  };
};

import toast from 'react-hot-toast';
import { useQuery, useMutation } from '@tanstack/react-query';

import { getCollections, addCollection, editCollectionName, deleteCollection } from 'lib/services/collection';

import type { Collection } from 'lib/types/collection';
import type { ErrorResponse } from 'lib/config';

type Params = {
  enabledGetCollections?: boolean;
  onSuccessGetCollections?: (collections: Collection[]) => void;
  onSuccessSubmitCollection?: (collections: Collection[]) => void;
  onErrorSubmitCollection?: (msg: string) => void;
  onSuccessDeleteCollection?: (collections: Collection[]) => void;
}

export const useCollections = ({
  enabledGetCollections = true,
  onSuccessGetCollections,
  onErrorSubmitCollection,
  onSuccessSubmitCollection,
  onSuccessDeleteCollection,
}: Params) => {
  const {
    data,
    isFetching,
    isError,
    refetch,
  } = useQuery(['collections'], () => getCollections(), {
    onSuccess: onSuccessGetCollections,
    enabled: enabledGetCollections,
  });

  const addMutation = useMutation({
    mutationFn: (data: Collection) => addCollection(data),
    onSuccess: (data) => {
      toast('success to create new collection');
      onSuccessSubmitCollection?.(data);
    },
    onError: (error: ErrorResponse) => onErrorSubmitCollection?.(error.message),
  });

  const editMutation = useMutation({
    mutationFn: ({ id, name }: {
      id: string,
      name: string,
    }) => editCollectionName(id, name),
    onSuccess: (data) => {
      toast('success to edit collection name');
      onSuccessSubmitCollection?.(data);
    },
    onError: (error: ErrorResponse) => onErrorSubmitCollection?.(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCollection(id),
    onSuccess: (data) => {
      toast('success to delete collection');
      onSuccessDeleteCollection?.(data);
    },
  });

  return {
    data,
    isLoading: isFetching,
    isError,
    refetch,
    addMutation,
    editMutation,
    deleteMutation,
  };
};

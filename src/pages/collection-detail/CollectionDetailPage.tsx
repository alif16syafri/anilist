/** @jsxImportSource @emotion/react */
import { Layout } from 'components/Layout/Layout';
import { useCallback } from 'react';

import { AnimeFeed } from 'components/AnimeFeed/AnimeFeed';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { CollectionTextInput } from 'components/CollectionTextInput/CollectionTextInput';
import { LoadingState, NotFoundState } from 'components/PageState/PageState';

import { useCollectionDetailPage } from './useCollectionDetailPage';

import * as styles from './CollectionDetailPageStyle';

const CollectionDetailPage = () => {
  const {
    register,
    isFormOpen,
    isDeleteOpen,
    isLoading,
    isError,
    formErrors,
    collection,
    selectedMedia,
    handleOpenForm,
    handleCloseForm,
    handleAttemptSubmit,
    handleSubmitEdit,
    handleOpenDelete,
    handleCloseDelete,
    handleDelete,
  } = useCollectionDetailPage();

  const renderEditModal = useCallback(() => {
    return (
      <Modal
        title="Edit collection"
        primaryButtonText="Edit"
        onClickPrimaryButton={handleAttemptSubmit(handleSubmitEdit)}
        onClose={handleCloseForm}
      >
        <div css={styles.full}>
          <CollectionTextInput
            placeholder="Collection name"
            register={register}
            error={formErrors?.collectionName}
          />
        </div>
      </Modal>
    );
  }, [formErrors?.collectionName, handleAttemptSubmit, handleCloseForm, handleSubmitEdit, register]);

  const renderDeleteModal = useCallback(() => (
    <Modal
      title={`Delete ${selectedMedia?.title.userPreferred}`}
      primaryButtonText="Delete"
      onClickPrimaryButton={handleDelete}
      onClose={handleCloseDelete}
    >
      <p>Are you sure would like to delete this anime?</p>
    </Modal>
  ), [handleCloseDelete, handleDelete, selectedMedia?.title]);

  const renderFeed = useCallback(() => {
    if (isLoading) return <LoadingState />

    if (isError || collection?.media.length === 0) return <NotFoundState />

    return (
      <div>
        <div css={styles.header}>
          <h1 css={styles.pageTitle}>{collection?.name}</h1>
          <Button size="sm" onClick={() => handleOpenForm()}>
            Edit Collection
          </Button>
        </div>
        <AnimeFeed
          css={styles.feed}
          mediaList={collection?.media ?? []}
          withDelete
          onClickDelete={(media) => handleOpenDelete(media)}
        />
      </div>
    );
  }, [collection, handleOpenDelete, handleOpenForm, isError, isLoading]);

  return (
    <Layout>
      {renderFeed()}
      {isFormOpen && renderEditModal()}
      {isDeleteOpen && renderDeleteModal()}
    </Layout>
  );
};

export default CollectionDetailPage;

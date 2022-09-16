/** @jsxImportSource @emotion/react */
import { useCallback } from 'react';
import { Link } from '@tanstack/react-location';

import { AnimeCard } from 'components/AnimeCard/AnimeCard';
import { Button } from 'components/Button/Button';
import { Layout } from 'components/Layout/Layout';
import { Modal } from 'components/Modal/Modal';
import { CollectionCard } from 'components/CollectionCard/CollectionCard';
import { CollectionTextInput } from 'components/CollectionTextInput/CollectionTextInput';
import { Loading } from 'components/Loading/Loading';
import { LoadingState, NotFoundState } from 'components/PageState/PageState';

import { useAnimeDetailPage } from './useAnimeDetailPage';

import * as styles from './AnimeDetailPageStyle';

const AnimeDetailPage = () => {
  const {
    register,
    data,
    isLoading,
    isLoadingCollections,
    error,
    formErrors,
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
  } = useAnimeDetailPage();

  const renderNewCollectionInput = useCallback(() => {
    const isCollectionsEmpty = (collections?.length ?? 0) === 0;

    return (
      <div css={!isCollectionsEmpty && styles.addCollection}>
        {isCreatingNewCollection ? (
          <div css={styles.addInputContainer}>
            <CollectionTextInput
              placeholder="Create new collection"
              register={register}
              error={formErrors?.collectionName}
            />
            <div>
              <Button
                css={styles.addInputBtn}
                onClick={handleAttemptSubmit(handleAddNewCollection)}
              >
                Add
              </Button>
            </div>
          </div>
        ) : (
          <p css={styles.addCollectionBtn} onClick={handleToggleNewCollection}>
            + Add New collection
          </p>
        )}
      </div>
    );
  }, [collections?.length, formErrors, handleAddNewCollection, handleAttemptSubmit, handleToggleNewCollection, isCreatingNewCollection, register]);

  const renderCollectionFeed = useCallback(() => (
    collections?.map((collection, index) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          withDivider={index !== collections.length - 1}
          primaryButtonText="+ Add"
          onClickPrimaryButton={() => handleAddToCollection(collection)}
        />
      ),
    )), [collections, handleAddToCollection]);

  const renderCollectionFormModal = useCallback(() => (
    <Modal
      title="Add to Collection"
      onClose={handleCloseCollectionForm}
    >
      <div css={styles.full}>
        {isLoadingCollections ? (
          <p css={styles.center}>
            <Loading />
          </p>
        ) : (
          <>
            {renderNewCollectionInput()}
            {renderCollectionFeed()}
          </>
        )}
      </div>
    </Modal>
  ), [handleCloseCollectionForm, isLoadingCollections, renderCollectionFeed, renderNewCollectionInput]);

  const renderBody = useCallback(() => {
    if (isLoading) return <LoadingState />

    if (error || !data || !data.Media) return <NotFoundState />

    const media = data.Media;

    return (
      <div css={styles.container}>

        <div css={styles.leftPanel}>
          <AnimeCard css={styles.card} media={media} withTitle={false} />
          <Button css={styles.collectionBtn} onClick={handleOpenCollectionForm}>
            + Add to Collection
          </Button>
        </div>

        <div css={styles.rightPanel}>

          <p css={styles.title}>
            {media.title.userPreferred}
          </p>

          {collectionsByMedia.length > 0 && (
            <p css={styles.content}>
              <span css={styles.label}>In collections:</span>
              <span>
                {collectionsByMedia.map((collection) => (
                  <Link css={styles.collection} key={collection.id} to={`/collection/${collection.id}`}>
                    {collection.name}
                  </Link>
                ))}
              </span>
            </p>
          )}

          <p css={styles.content}>
            <span css={styles.label}>Episodes:</span>
            <span>{media.episodes}</span>
          </p>

          <p css={styles.content}>
            <span css={styles.label}>Genres:</span>
            <span>{media?.genres?.join(',')}</span>
          </p>

          <p
            css={styles.content}
            dangerouslySetInnerHTML={{ __html: media?.description ?? '' }}
          />
        </div>

      </div>
    );
  }, [collectionsByMedia, data, error, handleOpenCollectionForm, isLoading]);

  return (
    <Layout>
      {renderBody()}
      {isCollectionFormOpen && renderCollectionFormModal()}
    </Layout>
  );
};

export default AnimeDetailPage;

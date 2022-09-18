/** @jsxImportSource @emotion/react */
import { useCallback } from 'react';

import { Layout } from 'components/Layout/Layout';
import { AnimeFeed } from 'components/AnimeFeed/AnimeFeed';
import { LoadingState, NotFoundState } from 'components/PageState/PageState';

import { useAnimeListPage } from './useAnimeListPage';

import * as styles from './AnimeListPageStyle';

const AnimeListPage = () => {
  const {
    data,
    loading,
    error,
    hasNextPage,
    currentPage,
    handleLoadNextPage,
    handleLoadPrevPage,
  } = useAnimeListPage();

  const renderPagination = useCallback(() => {
    const isFirstPage = currentPage === 1;

    return (
      <div css={styles.pagination}>
        {!isFirstPage && (
          <button
            css={styles.paginationBtn}
            onClick={handleLoadPrevPage}
          >
            Prev
          </button>
        )}
        {hasNextPage && (
          <button
            css={[styles.paginationBtn, styles.paginationNextBtn]}
            onClick={handleLoadNextPage}
          >
            Next
          </button>
        )}
      </div>
    );
  }, [currentPage, handleLoadNextPage, handleLoadPrevPage, hasNextPage]);

  const renderFeed = useCallback(() => {
    if (loading) return <LoadingState />;

    if (error || !data || data.Page.media.length === 0) return <NotFoundState />;

    const mediaList = data.Page.media;

    return (
      <>
        <AnimeFeed mediaList={mediaList} />
        <div css={styles.divider} />
        {renderPagination()}
      </>
    );
  }, [data, error, loading, renderPagination]);

  return (
    <Layout>
      {renderFeed()}
    </Layout>
  );
};

export default AnimeListPage;

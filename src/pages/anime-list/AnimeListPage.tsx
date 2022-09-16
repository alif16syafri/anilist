/** @jsxImportSource @emotion/react */
import { useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';

import { Layout } from 'components/Layout/Layout';
import { AnimeFeed } from 'components/AnimeFeed/AnimeFeed';

import type { Media } from 'lib/types/media';

import * as styles from './AnimeListPageStyle';

type AnimeListData = {
  Page: {
    media: Media[]
    pageInfo: {
      currentPage: number;
      hasNextPage: number;
    }
  }
}

type AnimeListVariables = {
  page: number;
}

const LIMIT = 10;

const GET_ANIME_LIST = gql`
    query GetAnimeList($page: Int) {
        Page(page: $page, perPage: ${LIMIT}) {
            pageInfo {
                currentPage
                hasNextPage
            }
            media(type: ANIME) {
                id
                coverImage {
                    large
                }
                type
                title {
                    userPreferred
                }
            }
        }
    }
`;

export const AnimeListPage = () => {
  const {
    data,
    loading,
    error,
    fetchMore,
  } = useQuery<AnimeListData, AnimeListVariables>(GET_ANIME_LIST, {
    variables: { page: 1 },
    notifyOnNetworkStatusChange: true,
  });

  const currentPage = data?.Page.pageInfo.currentPage ?? 1;
  const hasNextPage = data?.Page.pageInfo.hasNextPage ?? false;

  const handleLoadPrevPage = useCallback(async () => {
    await fetchMore({ variables: { page: currentPage - 1 } });
  }, [currentPage, fetchMore]);

  const handleLoadNextPage = useCallback(async () => {
    await fetchMore({ variables: { page: currentPage + 1 } });
  }, [currentPage, fetchMore]);

  const renderPagination = useCallback(() => {
    const isFirstPage = currentPage === 1;

    return (
      <div className="flex justify-end">
        {!isFirstPage && (
          <button
            className="px-4 border rounded"
            onClick={handleLoadPrevPage}
          >
            Prev
          </button>
        )}
        {hasNextPage && (
          <button
            className="ml-4 px-4 border rounded"
            onClick={handleLoadNextPage}
          >
            Next
          </button>
        )}
      </div>
    );
  }, [currentPage, handleLoadNextPage, handleLoadPrevPage, hasNextPage]);

  const renderFeed = useCallback(() => {

    if (loading) return <p css={styles.center}>Loading ...</p>;

    if (error || !data) return <p css={styles.center}>Error ...</p>;

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

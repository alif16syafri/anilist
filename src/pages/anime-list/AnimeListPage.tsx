/** @jsxImportSource @emotion/react */
import { useCallback } from 'react';
import { useSearch } from '@tanstack/react-location';
import { gql, useQuery } from '@apollo/client';

import type { MakeGenerics } from '@tanstack/react-location';

import { Layout } from 'components/Layout/Layout';
import { AnimeFeed } from 'components/AnimeFeed/AnimeFeed';
import { LoadingState, NotFoundState } from 'components/PageState/PageState';

import type { Media } from 'lib/types/media';

import * as styles from './AnimeListPageStyle';
import { useNavigate } from '@tanstack/react-location';

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

type Search = MakeGenerics<{ Search: { page: number } }>;

const LIMIT = 10;

export const GET_ANIME_LIST = gql`
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

const AnimeListPage = () => {
  const navigate = useNavigate();
  const { page = 1 } = useSearch<Search>();
  const {
    data,
    loading,
    error,
    fetchMore,
  } = useQuery<AnimeListData, AnimeListVariables>(GET_ANIME_LIST, {
    variables: { page },
    notifyOnNetworkStatusChange: true,
  });

  const currentPage = data?.Page.pageInfo.currentPage ?? 1;
  const hasNextPage = data?.Page.pageInfo.hasNextPage ?? false;

  const handleLoadPrevPage = useCallback(async () => {
    const prevPage = currentPage - 1;

    await fetchMore({ variables: { page: prevPage } });
    navigate({ search: { page: prevPage } });
  }, [currentPage, fetchMore, navigate]);

  const handleLoadNextPage = useCallback(async () => {
    const nextPage = currentPage + 1;

    await fetchMore({ variables: { page: nextPage } });
    navigate({ search: { page: nextPage } });
  }, [currentPage, fetchMore, navigate]);

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

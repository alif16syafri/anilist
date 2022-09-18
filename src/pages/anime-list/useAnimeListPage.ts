import { useCallback } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-location';
import { gql, useQuery } from '@apollo/client';

import type { MakeGenerics } from '@tanstack/react-location';

import type { Media } from 'lib/types/media';

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
                title {
                    userPreferred
                }
                coverImage {
                    large
                }
            }
        }
    }
`;

export const useAnimeListPage = () => {
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

  return {
    data,
    loading,
    error,
    hasNextPage,
    currentPage,
    handleLoadNextPage,
    handleLoadPrevPage,
  };
};

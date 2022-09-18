import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test-utils';

import { mockAnimeList, mockAnimeListPage2 } from 'lib/mocks/animes';

import { GET_ANIME_LIST } from './useAnimeListPage';
import AnimeListPage  from './AnimeListPage';

const GET_ANIME_LIST_MOCK_PAGE_1 = {
  request: {
    query: GET_ANIME_LIST,
    variables: { page: 1 },
  },
  result: {
    data: mockAnimeList,
  },
};
const GET_ANIME_LIST_MOCK_PAGE_2 = {
  request: {
    query: GET_ANIME_LIST,
    variables: { page: 2 },
  },
  result: {
    data: mockAnimeListPage2,
  },
};

describe('Anime list page test', () => {
  const init = () => {
    const utils = render(<AnimeListPage />, { gqlMocks: [GET_ANIME_LIST_MOCK_PAGE_1, GET_ANIME_LIST_MOCK_PAGE_2, GET_ANIME_LIST_MOCK_PAGE_1] });

    const mediaListFirstPage = mockAnimeList.Page.media;
    const mediaListSecondPage = mockAnimeListPage2.Page.media;

    const getLoading = () => screen.queryByTestId('loading');
    const getFirstAnime = () => screen.queryByText(mediaListFirstPage[0].title.userPreferred);
    const getLastAnime = () => screen.queryByText(mediaListFirstPage[mediaListFirstPage.length - 1].title.userPreferred);
    const getSecondPageFirstAnime = () => screen.queryByText(mediaListSecondPage[0].title.userPreferred);
    const getNextPaginationBtn = () => screen.getByText(/next/i);
    const getPrevPaginationBtn = () => screen.queryByText(/prev/i);

    return {
      ...utils,
      getLoading,
      getFirstAnime,
      getLastAnime,
      getSecondPageFirstAnime,
      getNextPaginationBtn,
      getPrevPaginationBtn,
    };
  };

  const assertLoading = async (loading: HTMLElement | null) => {
    expect(loading).toBeInTheDocument();

    await waitFor(() => expect(loading).not.toBeInTheDocument());
  }

  it('Should render anime list page correctly', async () => {
    const { getLoading, getFirstAnime, getLastAnime, getNextPaginationBtn, getPrevPaginationBtn } = init();

    await assertLoading(getLoading())

    expect(getFirstAnime()).toBeInTheDocument();
    expect(getLastAnime()).toBeInTheDocument();
    expect(getNextPaginationBtn()).toBeInTheDocument();
    expect(getPrevPaginationBtn()).not.toBeInTheDocument();
  });

  it('Should able to go paginate page', async () => {
    const { getLoading, getLastAnime, getSecondPageFirstAnime, getNextPaginationBtn, getPrevPaginationBtn } = init();

    await assertLoading(getLoading());

    expect(getLastAnime()).toBeInTheDocument();
    expect(getNextPaginationBtn()).toBeInTheDocument();

    // go to next page
    userEvent.click(getNextPaginationBtn());

    await assertLoading(getLoading());

    expect(getLastAnime()).not.toBeInTheDocument();
    expect(getPrevPaginationBtn()).toBeInTheDocument();
    expect(getSecondPageFirstAnime()).toBeInTheDocument();

    // back to prev page
    const prevBtn = getPrevPaginationBtn();
    prevBtn && userEvent.click(prevBtn);

    await waitFor(() => expect(getLastAnime()).toBeInTheDocument());
    expect(getSecondPageFirstAnime()).not.toBeInTheDocument();
  });
});

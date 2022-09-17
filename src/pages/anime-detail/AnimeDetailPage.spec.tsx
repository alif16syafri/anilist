import userEvent from '@testing-library/user-event';

import { render, screen, waitFor, cleanup } from 'test-utils';

import { mockAnimeDetail } from 'lib/mocks/animes';
import { mockCollections, mockNewCollection } from 'lib/mocks/collection';
import * as CollectionService from 'lib/services/collection';

import { GET_ANIME_DETAIL } from './useAnimeDetailPage';
import AnimeDetailPage from './AnimeDetailPage';

jest.mock('@tanstack/react-location', () => ({
  ...jest.requireActual('@tanstack/react-location'),
  useMatch: () => ({
    params: { id: 1 },
  }),
}));

const GET_ANIME_DETAIL_MOCK = {
  request: {
    query: GET_ANIME_DETAIL,
    variables: { id: 1 },
  },
  result: {
    data: mockAnimeDetail,
  },
};

const spyGetCollectionsByMediaId = jest.spyOn(CollectionService, 'getCollectionsByMediaId');
const spyGetCollections = jest.spyOn(CollectionService, 'getCollections');
const spyAddCollection = jest.spyOn(CollectionService, 'addCollection');
const spyAddMediaToCollection = jest.spyOn(CollectionService, 'addMediaToCollection');

describe('Anime detail page test', () => {
  const init = (mock = [GET_ANIME_DETAIL_MOCK]) => {
    const utils = render(<AnimeDetailPage />, { gqlMocks: mock });

    const anime = mockAnimeDetail.Media;

    const getLoading = () => screen.queryByTestId('loading');
    const getEmptyState = () => screen.queryByTestId('empty-state');
    const getAnimeName = () => screen.getByText(anime.title.userPreferred);
    const getEpisodesCount = () => screen.getByText(anime.episodes);
    const getCollectionName = () => screen.queryByText(mockCollections[0].name);
    const getNewCollectionName = () => screen.queryByText(mockNewCollection.name);
    const getAddToCollectionButton = () => screen.getByText(/add to collection/i);
    const getAddNewCollectionButton = () => screen.queryByText(/add new collection/i);
    const getCollectionInput = () => screen.queryByPlaceholderText(/create new collection/i);
    const getSubmitCollectionInput = () => screen.getByTestId('submit-collection');
    const getAddCollectionCardButtons = () => screen.queryAllByText('+ Add');

    return {
      ...utils,
      getLoading,
      getEmptyState,
      getAnimeName,
      getEpisodesCount,
      getCollectionName,
      getNewCollectionName,
      getAddToCollectionButton,
      getAddNewCollectionButton,
      getCollectionInput,
      getSubmitCollectionInput,
      getAddCollectionCardButtons,
    };
  };

  afterEach(cleanup);

  const assertLoading = async (loading: HTMLElement | null) => {
    expect(loading).toBeInTheDocument();

    await waitFor(() => expect(loading).not.toBeInTheDocument());
  };

  it('Should render empty page correctly', async () => {
    spyGetCollectionsByMediaId.mockImplementationOnce(() => Promise.resolve([]));

    const { getLoading, getEmptyState } = init([]);

    await assertLoading(getLoading());

    await waitFor(() => expect(getEmptyState()).toBeInTheDocument());
  });

  it('Should render anime detail page without collection correctly', async () => {
    spyGetCollectionsByMediaId.mockImplementationOnce(() => Promise.resolve([]));

    const { getLoading, getAnimeName, getEpisodesCount, getCollectionName } = init();

    await assertLoading(getLoading());

    await waitFor(() => expect(getAnimeName()).toBeInTheDocument());

    expect(getEpisodesCount()).toBeInTheDocument();
    expect(getCollectionName()).not.toBeInTheDocument();
  });

  it('Should render anime detail page with collections correctly', async () => {
    spyGetCollectionsByMediaId.mockImplementationOnce(() => Promise.resolve(mockCollections));

    const { getAnimeName, getCollectionName } = init();

    await waitFor(() => expect(getAnimeName()).toBeInTheDocument());

    expect(getCollectionName()).toBeInTheDocument();
  });

  it('Should able to create new collection & add media to newly created collection', async () => {
    spyGetCollectionsByMediaId.mockImplementationOnce(() => Promise.resolve([]));
    spyAddCollection.mockImplementationOnce(() => Promise.resolve([mockNewCollection]));
    spyAddMediaToCollection.mockImplementationOnce(() => Promise.resolve([mockNewCollection]));

    const {
      getAnimeName,
      getAddToCollectionButton,
      getAddNewCollectionButton,
      getCollectionInput,
      getSubmitCollectionInput,
    } = init();

    await waitFor(() => expect(getAnimeName()).toBeInTheDocument());

    expect(getCollectionInput()).not.toBeInTheDocument();

    userEvent.click(getAddToCollectionButton());

    await waitFor(() => expect(getAddNewCollectionButton()).toBeInTheDocument());
    expect(getCollectionInput()).not.toBeInTheDocument();

    const addNewCollectionButton = getAddNewCollectionButton();
    addNewCollectionButton && userEvent.click(addNewCollectionButton);

    await waitFor(() => expect(getCollectionInput()).toBeInTheDocument());
    expect(getSubmitCollectionInput()).toBeInTheDocument();
    expect(addNewCollectionButton).not.toBeInTheDocument();

    const input = getCollectionInput();
    input && userEvent.type(input, mockNewCollection.name);
    userEvent.click(getSubmitCollectionInput());

    await waitFor(() => expect(getAddNewCollectionButton()).not.toBeInTheDocument());
    expect(addNewCollectionButton).not.toBeInTheDocument();

    await waitFor(() => expect(spyAddMediaToCollection).toHaveBeenCalledTimes(1));
  });

  it('Should able to add anime to collection', async () => {
    spyGetCollectionsByMediaId.mockImplementationOnce(() => Promise.resolve([]));
    spyGetCollections.mockImplementationOnce(() => Promise.resolve(mockCollections));

    const copiedCollections = [...mockCollections];
    copiedCollections[0].media = [...copiedCollections[0].media, mockAnimeDetail.Media];

    spyAddMediaToCollection.mockImplementationOnce(() => Promise.resolve(copiedCollections));

    const {
      getAnimeName,
      getAddToCollectionButton,
      getCollectionName,
      getAddCollectionCardButtons,
    } = init();

    await waitFor(() => expect(getAnimeName()).toBeInTheDocument());

    userEvent.click(getAddToCollectionButton());

    await waitFor(() => expect(getCollectionName()).toBeInTheDocument());
    expect(getAddCollectionCardButtons()).toHaveLength(mockCollections.length);

    const firstCollectionAddButton = getAddCollectionCardButtons()[0];

    userEvent.click(firstCollectionAddButton);

    await waitFor(() => expect(firstCollectionAddButton).not.toBeInTheDocument());
    await waitFor(() => expect(spyAddMediaToCollection).toHaveBeenCalledTimes(1));
  });
});

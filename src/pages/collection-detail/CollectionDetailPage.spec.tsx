import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, cleanup } from 'test-utils';

import { mockCollections } from 'lib/mocks/collection';
import * as CollectionService from 'lib/services/collection';

import CollectionDetailPage from './CollectionDetailPage';
import { mockNewCollection } from 'lib/mocks/collection';

const spyGetCollectionById = jest.spyOn(CollectionService, 'getCollectionById');
const spyEditCollection = jest.spyOn(CollectionService, 'editCollectionName');
const spyDeleteMediaFromCollection = jest.spyOn(CollectionService, 'deleteMediaFromCollectionById');

describe('Collection detail page test', () => {
  const init = () => {
    const utils = render(<CollectionDetailPage />);

    const getLoading = () => screen.queryByTestId('loading');
    const getEmptyState = () => screen.queryByTestId('empty-state');
    const getCollectionName = () => screen.queryByText(mockCollections[0].name);
    const getFirstMediaName = () => screen.queryByText(mockCollections[0].media[0].title.userPreferred);
    const getEditedCollectionName = () => screen.queryByText(mockNewCollection.name);
    const getEditButton = () => screen.getByText(/edit/i);
    const getDeleteButtons = () => screen.queryAllByText(/delete/i);
    const getPrimaryButtonModal = () => screen.getByTestId('modal-primary-btn');
    const getCollectionInput = () => screen.getByPlaceholderText(/Collection name/i);

    return {
      ...utils,
      getLoading,
      getEmptyState,
      getCollectionName,
      getFirstMediaName,
      getDeleteButtons,
      getEditButton,
      getPrimaryButtonModal,
      getEditedCollectionName,
      getCollectionInput,
    };
  };

  afterEach(cleanup);

  const assertLoading = async (loading: HTMLElement | null) => {
    expect(loading).toBeInTheDocument();

    await waitFor(() => expect(loading).not.toBeInTheDocument());
  };

  it('Should render empty collection correctly', async () => {
    spyGetCollectionById.mockImplementationOnce(() => Promise.resolve(undefined));

    const { getLoading, getEmptyState, getCollectionName } = init();

    expect(spyGetCollectionById).toHaveBeenCalledTimes(1);

    await assertLoading(getLoading());

    await waitFor(() => expect(getEmptyState()).toBeInTheDocument());

    expect(getCollectionName()).not.toBeInTheDocument();
  });

  it('Should render collection media correctly', async () => {
    spyGetCollectionById.mockImplementationOnce(() => Promise.resolve(mockCollections[0]));

    const { getLoading, getCollectionName, getFirstMediaName } = init();

    expect(spyGetCollectionById).toHaveBeenCalledTimes(1);

    await assertLoading(getLoading());

    await waitFor(() => expect(getCollectionName()).toBeInTheDocument());

    expect(getFirstMediaName()).toBeInTheDocument();
  });

  it('Should able to delete media from collection correctly', async () => {
    const copiedCollections = [...mockCollections];
    copiedCollections[0].media.splice(0, 1);

    spyGetCollectionById.mockImplementationOnce(() => Promise.resolve(mockCollections[0]));
    spyDeleteMediaFromCollection.mockImplementationOnce(() => Promise.resolve(copiedCollections[0]));

    const { getCollectionName, getFirstMediaName, getDeleteButtons, getPrimaryButtonModal } = init();

    await waitFor(() => expect(getCollectionName()).toBeInTheDocument());

    expect(getFirstMediaName()).toBeInTheDocument();
    expect(getDeleteButtons()).toHaveLength(mockCollections[0].media.length);

    const secondDeleteButton = getDeleteButtons()[1];

    userEvent.click(secondDeleteButton);

    expect(getPrimaryButtonModal()).toBeInTheDocument();

    userEvent.click(getPrimaryButtonModal());

    await waitFor(() => expect(spyDeleteMediaFromCollection).toHaveBeenCalledTimes(1));
  });

  it('Should able to edit collection name correctly', async () => {
    const editName = mockNewCollection.name;

    spyGetCollectionById.mockImplementationOnce(() => Promise.resolve(mockCollections[0]));

    const {
      getEditButton,
      getPrimaryButtonModal,
      getCollectionInput,
      getEditedCollectionName,
    } = init();

    await waitFor(() => expect(getEditButton()).toBeInTheDocument());

    userEvent.click(getEditButton());

    mockCollections[0].name = editName;
    spyEditCollection.mockImplementationOnce(() => Promise.resolve(mockCollections));

    expect(getPrimaryButtonModal()).toBeInTheDocument();
    expect(getCollectionInput()).toBeInTheDocument();

    userEvent.type(getCollectionInput(), editName);
    userEvent.click(getPrimaryButtonModal());

    await waitFor(() => expect(getEditedCollectionName()).toBeInTheDocument());
  });
});

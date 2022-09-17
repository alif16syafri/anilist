import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, cleanup } from 'test-utils';

import { ErrorCode, ErrorMessage, error } from 'lib/config';
import { COLLECTION_REQUIRED, COLLECTION_ALPHANUMERIC } from 'components/CollectionTextInput/CollectionTextInput';
import { mockCollections, mockNewCollection } from 'lib/mocks/collection';
import * as CollectionService from 'lib/services/collection';

import CollectionListPage from './CollectionListPage';

const spyGetCollections = jest.spyOn(CollectionService, 'getCollections');
const spyAddCollection = jest.spyOn(CollectionService, 'addCollection');
const spyEditCollection = jest.spyOn(CollectionService, 'editCollectionName');
const spyDeleteCollection = jest.spyOn(CollectionService, 'deleteCollection');

describe('Collection list page test', () => {
  const init = () => {
    const utils = render(<CollectionListPage />);

    const getLoading = () => screen.queryByTestId('loading');
    const getEmptyState = () => screen.queryByTestId('empty-state');
    const getFirstCollection = () => screen.queryByText(mockCollections[0].name);
    const getAddButton = () => screen.getByText(/add new/i);
    const getCollectionInput = () => screen.getByPlaceholderText(/Collection name/i);
    const getPrimaryButtonModal = () => screen.getByTestId('modal-primary-btn');
    const getNewCollection = () => screen.queryByText(mockNewCollection.name);
    const getEmptyMessage = () => screen.queryByText(COLLECTION_REQUIRED);
    const getAlphaNumericMessage = () => screen.queryByText(COLLECTION_ALPHANUMERIC);
    const getCollectionAlreadyExistMessage = () => screen.queryByText(ErrorMessage.COLLECTION_ALREADY_EXIST);
    const getEditButtons = () => screen.queryAllByText(/edit/i);
    const getDeleteButtons = () => screen.queryAllByText(/delete/i);

    return {
      ...utils,
      getLoading,
      getEmptyState,
      getFirstCollection,
      getAddButton,
      getCollectionInput,
      getPrimaryButtonModal,
      getNewCollection,
      getEmptyMessage,
      getAlphaNumericMessage,
      getCollectionAlreadyExistMessage,
      getEditButtons,
      getDeleteButtons,
    };
  };

  afterEach(cleanup);

  const assertLoading = async (loading: HTMLElement | null) => {
    expect(loading).toBeInTheDocument();

    await waitFor(() => expect(loading).not.toBeInTheDocument());
  };

  it('Should render empty collections correctly', async () => {
    spyGetCollections.mockImplementationOnce(() => Promise.resolve([]));

    const { getLoading, getEmptyState, getFirstCollection } = init();

    await assertLoading(getLoading());

    await waitFor(() => expect(getEmptyState()).toBeInTheDocument());

    expect(getFirstCollection()).not.toBeInTheDocument();
  });

  it('Should render collections correctly', async () => {
    spyGetCollections.mockImplementationOnce(() => Promise.resolve(mockCollections));

    const { getLoading, getFirstCollection } = init();

    await assertLoading(getLoading());

    await waitFor(() => expect(getFirstCollection()).toBeInTheDocument());
  });

  it('Should able to validate collection submission', async () => {
    spyGetCollections.mockImplementationOnce(() => Promise.resolve([]));

    const {
      getLoading,
      getAddButton,
      getPrimaryButtonModal,
      getCollectionInput,
      getEmptyMessage,
      getAlphaNumericMessage,
    } = init();

    await assertLoading(getLoading());

    expect(getAddButton()).toBeInTheDocument();

    userEvent.click(getAddButton());

    expect(getPrimaryButtonModal()).toBeInTheDocument();
    expect(getCollectionInput()).toBeInTheDocument();

    // empty validation
    userEvent.click(getPrimaryButtonModal());

    await waitFor(() => expect(getEmptyMessage()).toBeInTheDocument());

    expect(spyAddCollection).not.toHaveBeenCalled();

    // alphanumeric validation
    userEvent.type(getCollectionInput(), '@alif -- 123');
    userEvent.click(getPrimaryButtonModal());

    await waitFor(() => expect(getAlphaNumericMessage()).toBeInTheDocument());

    expect(spyAddCollection).not.toHaveBeenCalled();
  });

  it('Should able to validate collection already exist', async () => {
    spyGetCollections.mockImplementationOnce(() => Promise.resolve(mockCollections));
    spyAddCollection.mockImplementationOnce(() => Promise.reject(error({
      code: ErrorCode.ALREADY_EXIST,
      message: ErrorMessage.COLLECTION_ALREADY_EXIST,
    })));

    const {
      getAddButton,
      getPrimaryButtonModal,
      getCollectionInput,
      getCollectionAlreadyExistMessage,
    } = init();

    expect(getAddButton()).toBeInTheDocument();

    userEvent.click(getAddButton());

    expect(getPrimaryButtonModal()).toBeInTheDocument();
    expect(getCollectionInput()).toBeInTheDocument();

    // already exist validation
    userEvent.type(getCollectionInput(), mockCollections[0].name);
    userEvent.click(getPrimaryButtonModal());

    await waitFor(() => expect(getCollectionAlreadyExistMessage()).toBeInTheDocument());

    expect(spyAddCollection).toHaveBeenCalled();
  });

  it('Should able to add new collection correctly', async () => {
    spyGetCollections.mockImplementationOnce(() => Promise.resolve(mockCollections));

    const {
      getLoading,
      getFirstCollection,
      getAddButton,
      getPrimaryButtonModal,
      getCollectionInput,
      getNewCollection,
    } = init();

    await assertLoading(getLoading());

    expect(spyGetCollections).toHaveBeenCalledTimes(1);

    await waitFor(() => expect(getFirstCollection()).toBeInTheDocument());

    expect(getAddButton()).toBeInTheDocument();

    userEvent.click(getAddButton());

    spyAddCollection.mockImplementationOnce(() => Promise.resolve([...mockCollections, mockNewCollection]));

    expect(getPrimaryButtonModal()).toBeInTheDocument();
    expect(getCollectionInput()).toBeInTheDocument();

    userEvent.type(getCollectionInput(), mockNewCollection.name);
    userEvent.click(getPrimaryButtonModal());

    await waitFor(() => expect(getNewCollection()).toBeInTheDocument());

    expect(spyAddCollection).toHaveBeenCalledTimes(1);
  });

  it('Should able to edit collection correctly', async () => {
    const editName = mockNewCollection.name;

    spyGetCollections.mockImplementationOnce(() => Promise.resolve(mockCollections));

    const {
      getLoading,
      getEditButtons,
      getPrimaryButtonModal,
      getCollectionInput,
      getNewCollection,
    } = init();

    await assertLoading(getLoading());

    await waitFor(() => expect(getEditButtons()).toHaveLength(mockCollections.length));

    const firsEditButton = getEditButtons()[0];

    userEvent.click(firsEditButton);

    mockCollections[0].name = editName;
    spyEditCollection.mockImplementationOnce(() => Promise.resolve(mockCollections));

    expect(getPrimaryButtonModal()).toBeInTheDocument();
    expect(getCollectionInput()).toBeInTheDocument();

    userEvent.type(getCollectionInput(), editName);
    userEvent.click(getPrimaryButtonModal());

    await waitFor(() => expect(getNewCollection()).toBeInTheDocument());

    expect(spyEditCollection).toHaveBeenCalledTimes(1);
  });

  it('Should able to delete collection correctly', async () => {
    spyGetCollections.mockImplementationOnce(() => Promise.resolve(mockCollections));

    const {
      getLoading,
      getDeleteButtons,
      getPrimaryButtonModal,
    } = init();

    await assertLoading(getLoading());

    await waitFor(() => expect(getDeleteButtons()).toHaveLength(mockCollections.length));

    const firstDeleteButton = getDeleteButtons()[0];

    userEvent.click(firstDeleteButton);

    spyDeleteCollection.mockImplementationOnce(() => Promise.resolve([mockCollections[1]]));

    expect(getPrimaryButtonModal()).toBeInTheDocument();

    userEvent.click(getPrimaryButtonModal());

    await waitFor(() => expect(getDeleteButtons()).toHaveLength(1));

    expect(spyDeleteCollection).toHaveBeenCalledTimes(1);
  });
});

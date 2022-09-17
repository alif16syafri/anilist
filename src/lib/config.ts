export const enum ErrorCode {
  ALREADY_EXIST = 'ALREADY_EXIST',
}

export const enum ErrorMessage {
  COLLECTION_ALREADY_EXIST = 'Collection name already exist',
}

export type ErrorResponse = {
  code: ErrorCode,
  message: string;
}

export const error = (e: ErrorResponse): ErrorResponse => ({
  code: e.code,
  message: e.message,
});

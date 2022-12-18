export type PromiseError = {
  promiseError: {
    message: string;
    error: unknown;
  };
};

export type InvalidIdError = {
  invalidIdError: {
    message: string;
    id: string;
  };
};

export function promiseError(error: unknown): PromiseError {
  return {
    promiseError: {
      message: "unable to request the Database",
      error: error,
    },
  };
}

export function invalidIdError(id: string): InvalidIdError {
  return {
    invalidIdError: {
      message: "invalid id on request, please submit a ObjectId",
      id: id,
    },
  };
}

export function invalidBodyError(body: any): any {
  return {
    InvalidBodyError: {
      message: "Invalid body on request, please submit a valid body",
      body: body,
    },
  };
}

export type CustomErrors = PromiseError | InvalidIdError;

export interface FetchCall {
  input: RequestInfo | URL;
  init?: RequestInit;
}

export type MockFetch = typeof fetch & {
  calls: FetchCall[];
};

type Resolver = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export function createMockFetch(...responses: Array<Response | Resolver>): MockFetch {
  const queue = [...responses];
  const calls: FetchCall[] = [];

  const mock = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ input, init });

    const next = queue.shift();
    if (!next) {
      throw new Error(`Unexpected fetch call for ${String(input)}`);
    }

    return next instanceof Response ? next : next(input, init);
  }) as MockFetch;

  mock.calls = calls;
  return mock;
}

export function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
}

export function textResponse(body: string, init: ResponseInit = {}): Response {
  return new Response(body, init);
}

export function binaryResponse(bytes: Uint8Array, init: ResponseInit = {}): Response {
  return new Response(Uint8Array.from(bytes), init);
}

export function abortingFetch(): Resolver {
  return (_input, init) =>
    new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => {
        reject(new DOMException('The operation was aborted.', 'AbortError'));
      });
    });
}

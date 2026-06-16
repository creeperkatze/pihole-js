export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];

export interface JsonObject {
  [key: string]: JsonValue | undefined;
}

export interface ApiResponseBase {
  took?: number;
}

export type QueryValue = string | number | boolean | null | undefined | Array<string | number | boolean>;

export interface QueryParams {
  [key: string]: QueryValue;
}

export interface PiHoleClientOptions {
  baseUrl: string;
  password?: string;
  timeoutMs?: number;
  userAgent?: string;
  fetch?: typeof globalThis.fetch;
  sessionStore?: SessionStore;
}

export interface SessionEntry {
  sid: string;
  expiresAt?: number;
}

export interface SessionStore {
  get(baseUrl: string): Promise<SessionEntry | null>;
  set(baseUrl: string, entry: SessionEntry): Promise<void>;
  delete(baseUrl: string): Promise<void>;
}

export interface ProcessedItemSuccess {
  item: string;
}

export interface ProcessedItemError extends ProcessedItemSuccess {
  error: string;
}

export interface ProcessedItems {
  success?: ProcessedItemSuccess[];
  errors?: ProcessedItemError[];
  failed?: ProcessedItemError[];
}

export interface ProcessedResponse {
  processed?: ProcessedItems | null;
}

export interface ApiErrorBody extends ApiResponseBase {
  error?: {
    key?: string;
    message?: string;
    hint?: string | null;
  };
  message?: string;
}

export interface SuccessResponse extends ApiResponseBase {
  status: string;
}

export interface CountResponse extends ApiResponseBase {
  count: number;
}

export interface GenericApiResponse extends ApiResponseBase, JsonObject {}

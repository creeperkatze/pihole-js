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

/**
 * Options for creating a {@link PiHoleClient}.
 */
export interface PiHoleClientOptions {
  /**
   * Base URL of the Pi-hole instance, for example `http://pi.hole`.
   */
  baseUrl: string;
  /**
   * Web interface password for authenticated installs.
   */
  password?: string;
  /**
   * Request timeout in milliseconds.
   *
   * @defaultValue 10000
   */
  timeoutMs?: number;
  /**
   * Value to send as the `User-Agent` header on every request.
   */
  userAgent?: string;
  /**
   * Custom fetch implementation.
   */
  fetch?: typeof globalThis.fetch;
  /**
   * Session store used to cache Pi-hole session IDs.
   */
  sessionStore?: SessionStore;
}

/**
 * Cached Pi-hole session data.
 */
export interface SessionEntry {
  sid: string;
  expiresAt?: number;
}

/**
 * Storage adapter for persisting Pi-hole session IDs across requests or client instances.
 */
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

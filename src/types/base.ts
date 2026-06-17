/** A JSON scalar value. */
export type JsonPrimitive = string | number | boolean | null;
/** Any valid JSON value. */
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];

/** A JSON object with string keys. */
export interface JsonObject {
  [key: string]: JsonValue | undefined;
}

/** Common base included in all Pi-hole API responses. */
export interface ApiResponseBase {
  took?: number;
}

/** A value that can be serialized as a URL query parameter. */
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

/** Identifies an item that was processed successfully. */
export interface ProcessedItemSuccess {
  item: string;
}

/** Identifies an item that failed processing. */
export interface ProcessedItemError extends ProcessedItemSuccess {
  error: string;
}

/** Summary of batch operation results. */
export interface ProcessedItems {
  success?: ProcessedItemSuccess[];
  errors?: ProcessedItemError[];
  failed?: ProcessedItemError[];
}

/** Mixin for responses that report batch processing results. */
export interface ProcessedResponse {
  processed?: ProcessedItems | null;
}

/** Shape of an error response body from the Pi-hole API. */
export interface ApiErrorBody extends ApiResponseBase {
  error?: {
    key?: string;
    message?: string;
    hint?: string | null;
  };
  message?: string;
}

/** Simple status string response. */
export interface SuccessResponse extends ApiResponseBase {
  status: string;
}

/** Response containing a single count value. */
export interface CountResponse extends ApiResponseBase {
  count: number;
}

/** Loosely typed response for endpoints without a fixed schema. */
export interface GenericApiResponse extends ApiResponseBase, JsonObject {}

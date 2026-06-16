export class PiHoleError extends Error {
  override name = 'PiHoleError' as const;
  status: number;
  response: Response | undefined;
  body: unknown;
  code: string | undefined;

  constructor(message: string, options: {
    status?: number;
    response?: Response;
    body?: unknown;
    code?: string;
  } = {}) {
    super(message);
    this.status = options.status ?? 0;
    this.response = options.response;
    this.body = options.body;
    this.code = options.code;
  }
}

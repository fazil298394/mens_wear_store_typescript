export class AppError extends Error {
  public readonly code: string;
  constructor(message: string, code = "APP_ERROR") {
    super(message);
    this.name = "AppError";
    this.code = code;
  }
}

export class CriticalFailure extends AppError {
  constructor(message: string) {
    super(message, "CRITICAL_FAILURE");
    this.name = "CriticalFailure";
  }
}

export function throwCriticalError(msg: string): never {
  throw new CriticalFailure("Unreachable case reached: " + msg);
}

class CustomError extends Error {
  constructor(
    public level: LogLevel,
    message: string,
    public file: string,
    public line: number,
    public column: number
  ) {
    super(message);
  }

  toString(): string {
    return `${ANSI_CODES[this.level]} [${this.level}] ${ANSI_CODES.RESET} ${
      this.message
    } ${ANSI_CODES.PATH} ${this.file}:${this.line}:${this.column} ${
      ANSI_CODES.RESET
    }`;
  }
}

type LogLevel =
  | "INFO"
  | "WARN"
  | "ERROR"
  | "TRACE"
  | "DEBUG"
  | "RESET"
  | "PATH";

const ANSI_CODES: Record<LogLevel, string> = {
  RESET: "\x1b[0m",
  INFO: "\x1b[34m", // Blue
  WARN: "\x1b[33m", // Yellow
  ERROR: "\x1b[31m", // Red
  TRACE: "\x1b[35m", // Magenta
  DEBUG: "\x1b[32m", // Green
  PATH: "\x1b[36m", // Cyan
};

export class Logger {
  private static logMessage(
    level: LogLevel,
    message: string | Error | unknown
  ): void {
    const stack = new Error().stack;
    if (stack) {
      const regex =
        /at\s+(?:\S+\s)?\((.*?):(\d+):(\d+)\)|at\s+(.*?):(\d+):(\d+)/i;
      const match = regex.exec(stack.split("\n")[3]);
      if (match) {
        const file = match[1] || match[4];
        const line = Number(match[2]) || Number(match[5]);
        const column = Number(match[3]) || Number(match[6]);

        if (message instanceof Error) {
          const customError = new CustomError(
            level,
            message.message,
            file.split("webpack:/")[1],
            line,
            column
          );
          console.log(customError.toString(), message.stack);
        } else {
          const customError = new CustomError(
            level,
            message as string,
            file.split("webpack:/")[1],
            line,
            column
          );
          console.log(customError.toString());
        }
      } else {
        console.log(`[${level}] ${message}`);
      }
    } else {
      console.log(`[${level}] ${message}`);
    }
  }

  static info(message: string | Error | unknown): void {
    Logger.logMessage("INFO", message);
  }

  static warn(message: string | Error | unknown): void {
    Logger.logMessage("WARN", message);
  }

  static error(message: string | Error | unknown): void {
    Logger.logMessage("ERROR", message);
  }

  static trace(message: string | Error | unknown): void {
    Logger.logMessage("TRACE", message);
  }

  static debug(message: string | Error | unknown): void {
    Logger.logMessage("DEBUG", message);
  }
}

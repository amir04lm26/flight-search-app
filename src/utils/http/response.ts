// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  data: T | null;
  error: boolean;
  status_code: number;
  message?: string;
}

export class ResponseUtil {
  static success<T>(
    data: T,
    message: string = "Request successful",
    status_code: number = 200
  ): ApiResponse<T> {
    return {
      data,
      error: false,
      status_code,
      message,
    };
  }

  static error(message: string, status_code: number = 400): ApiResponse {
    return {
      data: null,
      error: true,
      status_code,
      message,
    };
  }
}

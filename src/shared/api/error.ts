export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = '인증이 필요합니다.') {
    super(401, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = '리소스를 찾을 수 없습니다.') {
    super(404, message);
  }
}

export class TimeoutError extends ApiError {
  constructor(message = '타임아웃이 발생했습니다') {
    super(408, message);
  }
}

export class ValidationError extends ApiError {
  constructor(message = '밸리데이션 에러가 발생했습니다') {
    super(422, message);
  }
}

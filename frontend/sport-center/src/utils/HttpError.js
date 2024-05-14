class HttpError extends Error {
  constructor(message, statusCode) {
      super(message || 'HTTP Error');
      this.name = 'HttpError';
      this.statusCode = statusCode || 500;
  }
}

export default HttpError;

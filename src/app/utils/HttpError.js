export class HTTPError extends Error {
    constructor(response) {
      super(response.statusText);
      this.status = response.status;
    }
}
export class IldaHttpResponse {

  constructor(public body: any,
              public headers: any,
              public status: string,
              public statusText: string) {
  }
}

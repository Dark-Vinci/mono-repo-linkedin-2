export class ImprovedError extends Error {
  constructor(props: any) {
    super(props);
  }

  public publicMessage() {}

  public privateMessage() {}
}

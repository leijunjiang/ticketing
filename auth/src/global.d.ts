export declare global {
  declare module globalThis {
    var signin: () =>  Promise<string>;
  }
}
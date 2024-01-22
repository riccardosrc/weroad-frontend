export type PropertyWrapper<N extends string, T> = {
  [K in N]: T;
};

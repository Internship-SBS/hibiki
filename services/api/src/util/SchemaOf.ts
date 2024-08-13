import z from "zod";

export type SchemaOf<T> = {
  [K in keyof T]: z.ZodType<T[K], any, any>;
};

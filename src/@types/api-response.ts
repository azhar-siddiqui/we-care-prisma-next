import { ZodError } from "zod";

export type ValidationError = {
  field: string;
  message: string;
};

export interface ServerResponseType<T> {
  success: boolean;
  message?: string | undefined;
  error?: string | undefined | ZodError[] | ValidationError[];
  data?: T | undefined;
  status?: number | undefined;
}

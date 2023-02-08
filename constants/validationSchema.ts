import { string, StringSchema } from "yup";

export const requiredString = string().required(
  "Required"
) as StringSchema<string>;

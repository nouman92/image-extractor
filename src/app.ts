import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";

import bodyParser from "body-parser";

import { ValidateError } from "tsoa";

import { logger } from "./utils/logger"

import { RegisterRoutes } from "./routes";

export const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(logger);


RegisterRoutes(app);


app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});
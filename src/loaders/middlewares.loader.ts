import cors from 'cors';
// import helmet from 'helmet';
import morgan from 'morgan';
import config from '@config';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express, { Request } from 'express';
import { INestApplication } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';

const corsOptions = {
  origin: config.cors.origin,
  credentials: true,
};

const middlewares = [
  cookieParser(),
  cors(corsOptions),
  express.json({ limit: '2048mb' }),
  express.urlencoded({
    limit: '2048mb',
    extended: false,
  }),
  // helmet({ referrerPolicy: { policy: 'no-referrer' } }),
  compression(),
  graphqlUploadExpress({ maxFileSize: 2000000, maxFiles: 1 }),
];

if (process.env.NODE_ENV === 'development') {
  morgan.token('type', function (req: Request) {
    // return req.body.query.split('{')?.slice(0, 2).join(' - ');

    if (req.originalUrl === '/graphql') {
      return req?.body?.query?.split('{')[0] || 'query';
    } else {
      return `REST`;
    }
  });
  middlewares.push(
    morgan(
      function (tokens: any, req, res) {
        return [
          tokens.type(req),
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'),
          '-',
          tokens['response-time'](req, res),
          'ms',
        ].join(' ');
      },

      {
        skip(req: Request) {
          if (
            req?.body?.query
              ?.split('{')[0]
              ?.includes('query IntrospectionQuery')
          ) {
            return true;
          }
          return false;
        },
      },
    ),
  );
}

export const loadGlobalMiddlewares = (app: INestApplication) =>
  middlewares.forEach((middleware) => app.use(middleware));

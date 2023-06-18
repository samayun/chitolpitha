import config from '@config';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export default function LoadSwaggerModule(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.swagger.title)
    .setDescription(config.swagger.description)
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        in: 'header',
        name: 'authorization',
        description: 'The JWT accessToken',
        bearerFormat: '',
      },
      'authorization',
    )
    // .addCookieAuth(config.api.tenantKey)
    // .addCookieAuth('authorization')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(config.api.swaggerPrefix, app, document);
}

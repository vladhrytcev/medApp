import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io'
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { ApplicationModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { RequestLoggerInterceptor } from './common/interceptors/request-logger.interceptor';

const { API_PORT } = dotenv.parse(fs.readFileSync(process.env.PWD + '/.env'));


async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, { cors: true });
  app.use(helmet());
  app.enableCors({
	 "origin": ["https://medlink-new.now.sh","https://www.medlink.de","https://www.medlink-deutschland.de"] 
  });
  app.useGlobalInterceptors(new RequestLoggerInterceptor);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.useWebSocketAdapter(new IoAdapter(app))
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

  const options = new DocumentBuilder()
    .setTitle('REST API Example')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/api-docs', app, document);

  await app.listen(API_PORT || 3000);
}

bootstrap();

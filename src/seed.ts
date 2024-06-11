import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EmployeeSeederService } from './employee-seeder/employee-seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(EmployeeSeederService);
  await seeder.seed();
  await app.close();
}

bootstrap();

import { Module } from '@nestjs/common';
import { EmployeeSeederService } from './employee-seeder.service';
import { Employee } from '../employee/entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeeSeederService],
  exports: [EmployeeSeederService],
})
export class EmployeeSeederModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { employeeList } from '../constant/employeeList';
@Injectable()
export class EmployeeSeederService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async seed() {
    for (const employee of employeeList) {
      const exists = await this.employeeRepository.findOne({
        where: { firstname: employee.firstname, lastname: employee.lastname },
      });
      if (!exists) {
        await this.employeeRepository.save(employee);
      }
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      return await this.employeeRepository.save(createEmployeeDto);
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Employee[]> {
    try {
      return await this.employeeRepository.find();
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async findManyByBirthMonth(month: number): Promise<Employee[]> {
    try {
      return this.employeeRepository
        .createQueryBuilder('employee')
        .where('Month(employee.birth) = :month', { month })
        .getMany();
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
  async findManyByIdCardNearExpire() {
    try {
      dayjs().format('YYYY-MM-DD');
      const currentYear = dayjs(new Date()).year(); // new Date().getFullYear();
      const currentMonth = dayjs(new Date()).month() + 1; // new Date().getMonth() + 1;
      const currentDate = dayjs().toDate();
      return this.employeeRepository
        .createQueryBuilder('employee')
        .where('YEAR(employee.idCardExp) = :year', { year: currentYear })
        .andWhere('MONTH(employee.idCardExp) = :month', {
          month: currentMonth,
        })
        .andWhere('DATE(employee.idCardExp) > :date', { date: currentDate })
        .getMany();
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async findManyByExpiredIdCard() {
    const currentDate = dayjs().toDate();
    return this.employeeRepository
      .createQueryBuilder('employee')
      .where('employee.birth < :currentDate', { currentDate })
      .getMany();
  }

  async findManyByBirthAndIdCardExpired(month: number) {
    try {
      dayjs().format('YYYY-MM-DD');
      const currentYear = dayjs(new Date()).year(); // new Date().getFullYear();
      const currentMonth = dayjs(new Date()).month() + 1; // new Date().getMonth() + 1;
      return this.employeeRepository
        .createQueryBuilder('employee')
        .where('Month(employee.birth) = :month', { month })
        .andWhere('YEAR(employee.idCardExp) = :year', { year: currentYear })
        .andWhere('MONTH(employee.idCardExp) = :month', {
          month: currentMonth,
        })
        .getMany();
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number): Promise<Employee | null> {
    try {
      const employee = await this.employeeRepository.findOne({ where: { id } });
      return employee;
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    try {
      const employee = await this.employeeRepository.findOne({ where: { id } });
      const updater = this.employeeRepository.merge(
        employee,
        updateEmployeeDto,
      );
      return await this.employeeRepository.save(updater);
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number): Promise<Employee> {
    try {
      const employee = await this.employeeRepository.findOne({ where: { id } });
      const isremove = await this.employeeRepository.remove(employee);
      return isremove;
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}

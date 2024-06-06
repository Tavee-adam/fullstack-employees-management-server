import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll(
    @Body()
    req: {
      isSelectBirthDate: boolean; // user choose only birth month
      isSelectIdExpire: boolean; // user choose 
      
      month: number | null;
    },
  ) {
    if (!req.isSelectBirthDate && !req.isSelectIdExpire) {
      return this.employeeService.findAll();
    } else if (req.isSelectBirthDate && !req.isSelectIdExpire) {
      return this.employeeService.findManyByBirthMonth(req.month);
    } else if (!req.isSelectBirthDate && req.isSelectIdExpire) {
      return this.employeeService.findManyByIdCardExpired();
    } else if (req.isSelectBirthDate && req.isSelectIdExpire) {
      return this.employeeService.findManyByBirthAndIdCardExpired(req.month);
    }
  }

  @Get()
  findByBirthMonth(@Body() req: { month: number }) {
    return this.employeeService.findManyByBirthMonth(req.month);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}

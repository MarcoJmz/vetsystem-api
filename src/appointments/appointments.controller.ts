import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { GetAppointmentQueryDto } from './dto/get-appointment.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  // @Get('blocked-days')
  // getBlockedDays(@Query('year') year: string, @Query('month') month: string) {
  //   const currentDate = new Date();
  //   const selectedYear = year ? parseInt(year) : currentDate.getFullYear();
  //   const selectedMonth = month ? parseInt(month) : currentDate.getMonth() + 1;
  //   return this.appointmentsService.getBlockedDays(selectedYear, selectedMonth);
  // }
  @Get(':year/:month/blocked-days')
  getBlockedDays(@Param('year') year: string, @Param('month') month: string) {
    return this.appointmentsService.getBlockedDays(+year, +month);
  }

  @Get()
  findAll(@Query() query: GetAppointmentQueryDto) {
    const patient = query.patient_id ? query.patient_id : null;
    const take = query.take ? query.take : 10;
    const skip = query.skip ? query.skip : 0;
    return this.appointmentsService.findAll(patient, take, skip);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.appointmentsService.remove(+id);
  }
}

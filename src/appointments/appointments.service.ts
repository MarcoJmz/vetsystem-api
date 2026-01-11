import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Patient } from '../patients/entities/patient.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const patient = await this.patientRepository.findOneBy({
      id: createAppointmentDto.patient.id,
    });

    if (!patient) {
      const errors: string[] = [];
      errors.push('El paciente no existe');
      throw new NotFoundException(errors);
    }

    return this.appointmentRepository.save({
      ...createAppointmentDto,
      patient,
    });
  }

  async findAll(patientId: number | null, take: number, skip: number) {
    const options: FindManyOptions<Appointment> = {
      relations: {
        patient: {
          owner: true,
        },
      },
      order: {
        dateTime: 'DESC',
      },
      take,
      skip,
    };

    if (patientId) {
      options.where = {
        patient: {
          id: patientId,
        },
      };
    }

    const [appointments, total] =
      await this.appointmentRepository.findAndCount(options);

    return { appointments, total };
  }

  async findOne(id: number) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: {
        patient: {
          owner: true,
        },
      },
    });

    if (!appointment) {
      throw new NotFoundException('Cita no encontrada');
    }

    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.findOne(id);

    if (updateAppointmentDto.patient) {
      const patient = await this.patientRepository.findOneBy({
        id: updateAppointmentDto.patient.id,
      });

      if (!patient) {
        const errors: string[] = [];
        errors.push('El paciente no existe');
        throw new NotFoundException(errors);
      }

      appointment.patient = patient;
    }

    Object.assign(appointment, updateAppointmentDto);

    return await this.appointmentRepository.save(appointment);
  }

  async remove(id: number) {
    const appointment = await this.findOne(id);
    const deletedAppointment =
      await this.appointmentRepository.remove(appointment);
    return {
      message: `Cita del ${deletedAppointment.dateTime} eliminada correctamente`,
    };
  }

  async getBlockedDays(year: number, month: number) {
    // Define la jornada laboral máxima en minutos (8 horas = 480 minutos)
    const MAX_DAILY_MINUTES = 480;

    // Obtener todas las citas del mes especificado
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = `${year}-${String(month).padStart(2, '0')}-31`;

    const appointments = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .where('appointment.dateTime >= :startDate', { startDate })
      .andWhere('appointment.dateTime <= :endDate', { endDate })
      .andWhere('appointment.status != :canceledStatus', {
        canceledStatus: 'canceled',
      })
      .select('appointment.dateTime', 'dateTime')
      .addSelect('SUM(appointment.durationMinutes)', 'totalMinutes')
      .groupBy('appointment.dateTime')
      .getRawMany();

    // Filtrar días que han alcanzado o superado el máximo de minutos
    const blockedDays = appointments
      .filter((item) => parseInt(item.totalMinutes) >= MAX_DAILY_MINUTES)
      .map((item) => {
        const date = new Date(item.dateTime);
        return date.getDate(); // Retornar solo el día del mes
      });

    return {
      year,
      month,
      blockedDays,
      maxDailyMinutes: MAX_DAILY_MINUTES,
    };
  }
}

import { Owner } from './../owners/entities/owner.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const owner = await this.ownerRepository.findOneBy({
      id: createPatientDto.owner.id,
    });

    if (!owner) {
      const errors: string[] = [];
      errors.push('El dueño no existe');
      throw new NotFoundException(errors);
    }

    return this.patientRepository.save({ ...createPatientDto, owner });
  }

  async findAll(ownerId: number | null, take: number, skip: number) {
    const options: FindManyOptions<Patient> = {
      relations: {
        owner: true,
      },
      order: {
        name: 'ASC',
      },
      take,
      skip,
    };

    if (ownerId) {
      options.where = {
        owner: {
          id: ownerId,
        },
      };
    }

    const [patients, total] =
      await this.patientRepository.findAndCount(options);

    return { patients, total };
  }

  async findOne(id: number) {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: { owner: true },
    });

    if (!patient) {
      throw new NotFoundException('Paciente no encontrado');
    }

    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.findOne(id);
    Object.assign(patient, updatePatientDto);

    return await this.patientRepository.save(patient);
  }

  async remove(id: number) {
    const patient = await this.findOne(id);
    const deletedPatient = await this.patientRepository.remove(patient);
    return {
      message: `Paciente ${deletedPatient.name} eliminado correctamente`,
    };
  }
}

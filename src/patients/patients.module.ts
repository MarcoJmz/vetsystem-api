import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Owner } from 'src/owners/entities/owner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Owner])],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}

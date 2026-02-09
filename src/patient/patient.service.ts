import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { PatientHistory } from './entities/patient-history.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { BedService } from '../bed/bed.service';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
    @InjectRepository(PatientHistory)
    private patientHistoryRepository: Repository<PatientHistory>,
    private bedService: BedService,
  ) {}

  async create(
    userId: number,
    createDto: CreatePatientDto,
  ): Promise<Patient & { bedId?: number; bedNumber?: string }> {
    // First, create the patient
    const patient = this.patientsRepository.create({
      ...createDto,
      user: { id: userId },
    });
    const savedPatient = await this.patientsRepository.save(patient);

    // Then, assign the bed if provided
    let assignedBedId: number | undefined;
    let assignedBedNumber: string | undefined;

    if (createDto.bed) {
      try {
        const assignedBed = await this.bedService.findByBedNumber(
          createDto.bed,
        );
        if (String(assignedBed.id) !== assignedBed.bedNumber) {
          throw new BadRequestException(
            'Bed number must match bed id. Fix the bed record before assigning.',
          );
        }
        await this.bedService.assignBed(savedPatient.id, createDto.bed);
        assignedBedId = assignedBed.id;
        assignedBedNumber = assignedBed.bedNumber;
      } catch (error) {
        throw new BadRequestException(
          `Patient created but bed assignment failed: ${error.message}`,
        );
      }
    }

    return {
      ...savedPatient,
      bedId: assignedBedId,
      bedNumber: assignedBedNumber ?? savedPatient.bed,
    };
  }

  async findAll(userId: number): Promise<Patient[]> {
    return this.patientsRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: string, userId: number): Promise<Patient> {
    const patient = await this.patientsRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async update(
    id: string,
    dto: UpdatePatientDto,
    userId: number,
  ): Promise<Patient> {
    const patient = await this.patientsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!patient) throw new NotFoundException('Patient not found');
    if (patient.user && patient.user.id !== userId)
      throw new ForbiddenException();
    await this.patientsRepository.update(id, dto);
    return this.findOne(id, userId);
  }

  async remove(id: string, userId: number): Promise<void> {
    const patient = await this.patientsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!patient) throw new NotFoundException('Patient not found');
    if (patient.user && patient.user.id !== userId)
      throw new ForbiddenException();

    const history = this.patientHistoryRepository.create({
      patientId: patient.id,
      name: patient.name,
      bed: patient.bed,
      room: patient.room,
      condition: patient.condition,
      age: patient.age,
      gender: patient.gender,
      admitted: patient.admitted,
      bedHeadPosition: patient.bedHeadPosition,
      bedLeftPosition: patient.bedLeftPosition,
      bedRightPosition: patient.bedRightPosition,
      bedTiltPosition: patient.bedTiltPosition,
      user: patient.user ? { id: patient.user.id } as any : null,
    });
    await this.patientHistoryRepository.save(history);

    await this.bedService.unassignBedByPatientId(id);
    await this.patientsRepository.delete(id);
  }
}

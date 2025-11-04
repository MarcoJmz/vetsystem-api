import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  create(createOwnerDto: CreateOwnerDto) {
    return this.ownerRepository.save(createOwnerDto);
  }

  findAll() {
    return this.ownerRepository.find();
  }

  async findOne(id: number) {
    const owner = await this.ownerRepository.findOneBy({ id });
    if (!owner) {
      throw new NotFoundException('Dueño no encontrado');
    }
    return owner;
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    const owner = await this.findOne(id);
    Object.assign(owner, updateOwnerDto);
    return await this.ownerRepository.save(owner);
  }

  async remove(id: number) {
    const owner = await this.findOne(id);
    const deletedOwner = await this.ownerRepository.remove(owner);
    return `Dueño ${deletedOwner.name} eliminado correctamente`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  create(createAdminDto: CreateAdminDto): string {
    console.log({ createAdminDto });
    return 'This action adds a new admin';
  }

  findAll(): string {
    return 'This action returns all admin';
  }

  findOne(id: number): string {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto): string {
    console.log({ updateAdminDto });
    return `This action updates a #${id} admin`;
  }

  remove(id: number): string {
    return `This action removes a #${id} admin`;
  }
}

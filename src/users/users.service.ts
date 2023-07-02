import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { encodePassword } from 'src/util/bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  create(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    return this.prisma.user.create({ data: {...createUserDto, password } });
  }

  findAll() {
    return this.prisma.user.findMany({select: { email: true, name: true }});
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id }, select: { email: true, name: true } });
  }

  findAuth(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './baseRepository';

const prisma = new PrismaClient();

export class UserRepository extends BaseRepository<typeof prisma.user> {
  constructor() {
    super(prisma.user);
  }

  findByEmail(email: string) {
    return this.model.findUnique({ where: { email } });
  }
}

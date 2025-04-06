import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './baseRepository';

const prisma = new PrismaClient();

export class StoreRepository extends BaseRepository<typeof prisma.store> {
  constructor() {
    super(prisma.store);
  }

  findByName(name: string) {
    return this.model.findMany({ where: { name } });
  }
}

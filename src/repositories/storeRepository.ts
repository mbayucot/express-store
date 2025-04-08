import { BaseRepository } from './baseRepository';
import { prisma } from '../utils/prisma';
import { Prisma } from '@prisma/client';

export class StoreRepository extends BaseRepository<typeof prisma.store> {
  constructor() {
    super(prisma.store);
  }

  async findAllWithSearchAndPagination({
    search,
    page,
    limit,
  }: {
    search?: string;
    page: number;
    limit: number;
  }) {
    const [data, meta] = await this.model
      .paginate({
        where: search
          ? {
              name: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode, // 👈 fix
              },
            }
          : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      })
      .withPages({
        page,
        limit,
      });

    return { data, meta };
  }

  findByName(name: string) {
    return this.model.findMany({ where: { name } });
  }
}

import { BaseRepository } from './baseRepository';
import { prisma } from '../utils/prisma';
import { Prisma } from '@prisma/client';

export class ProductRepository extends BaseRepository<typeof prisma.product> {
  constructor() {
    super(prisma.product);
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
          updatedAt: 'desc',
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

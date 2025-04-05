export class BaseRepository<TModel> {
  constructor(protected model: TModel) {}

  async findAll(args: any = {}) {
    return (this.model as any).findMany(args);
  }

  async findById(id: number) {
    return (this.model as any).findUnique({ where: { id } });
  }

  async create(data: any) {
    return (this.model as any).create({ data });
  }

  async update(id: number, data: any) {
    return (this.model as any).update({ where: { id }, data });
  }

  async delete(id: number) {
    return (this.model as any).delete({ where: { id } });
  }
}

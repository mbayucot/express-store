import { Request, Response } from 'express';
import { StoreRepository } from '../repositories/storeRepository';

const storeRepo = new StoreRepository();

export class StoreController {
  async index(req: Request, res: Response) {
    const stores = await storeRepo.findAll();
    res.json(stores);
  }

  async show(req: Request, res: Response) {
    const store = await storeRepo.findById(Number(req.params.id));
    if (!store) return res.status(404).json({ message: 'Store not found' });
    res.json(store);
  }

  async create(req: Request, res: Response) {
    const { name, address } = req.body;
    const newStore = await storeRepo.create({ name, address });
    res.status(201).json(newStore);
  }

  async update(req: Request, res: Response) {
    const { name, address } = req.body;
    const updatedStore = await storeRepo.update(Number(req.params.id), {
      name,
      address,
    });
    res.json(updatedStore);
  }

  async delete(req: Request, res: Response) {
    await storeRepo.delete(Number(req.params.id));
    res.status(204).end();
  }
}

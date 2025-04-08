import { Request, Response } from 'express';
import { StoreRepository } from '../repositories/storeRepository';

export const createStoreController = (storeRepo: StoreRepository) => {
  return {
    index: async (req: Request, res: Response) => {
      const search = req.query.search as string;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { data, meta } = await storeRepo.findAllWithSearchAndPagination({
        search,
        page: page,
        limit: limit,
      });

      res.json({ data, meta });
    },

    show: async (req: Request, res: Response) => {
      const store = await storeRepo.findById(Number(req.params.id));
      if (!store) return res.status(404).json({ message: 'Store not found' });
      res.json(store);
    },

    create: async (req: Request, res: Response) => {
      const { name, address } = req.body;
      const newStore = await storeRepo.create({ name, address });
      res.status(201).json(newStore);
    },

    update: async (req: Request, res: Response) => {
      const { name, address } = req.body;
      const updatedStore = await storeRepo.update(Number(req.params.id), {
        name,
        address,
      });
      res.json(updatedStore);
    },

    delete: async (req: Request, res: Response) => {
      await storeRepo.delete(Number(req.params.id));
      res.status(204).end();
    },
  };
};

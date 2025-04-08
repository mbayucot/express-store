import { Request, Response } from 'express';
import { ProductRepository } from '../repositories/productRepository';

export const createProductController = (productRepo: ProductRepository) => {
  return {
    index: async (req: Request, res: Response) => {
      const search = req.query.search as string;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { data, meta } = await productRepo.findAllWithSearchAndPagination({
        search,
        page: page,
        limit: limit,
      });

      res.json({ data, meta });
    },

    show: async (req: Request, res: Response) => {
      const product = await productRepo.findById(Number(req.params.id));
      if (!product) return res.status(404).json({ message: 'Store not found' });
      res.json(product);
    },

    create: async (req: Request, res: Response) => {
      const { name, address } = req.body;
      const newStore = await productRepo.create({ name, address });
      res.status(201).json(newStore);
    },

    update: async (req: Request, res: Response) => {
      const { name, address } = req.body;
      const updatedStore = await productRepo.update(Number(req.params.id), {
        name,
        address,
      });
      res.json(updatedStore);
    },

    delete: async (req: Request, res: Response) => {
      await productRepo.delete(Number(req.params.id));
      res.status(204).end();
    },
  };
};

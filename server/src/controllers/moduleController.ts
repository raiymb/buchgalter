import { Request, Response } from 'express';
import { moduleService } from '../services/moduleService';

export const moduleController = {
  async createModule(req: Request, res: Response): Promise<void> {
    try {
      const module = await moduleService.createModule(req.body);
      res.status(201).json(module);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getModuleById(req: Request, res: Response): Promise<void> {
    try {
      const module = await moduleService.getModuleById(req.params.id);
      if (!module) {
        res.status(404).json({ message: 'Module not found' });
      } else {
        res.status(200).json(module);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getModulesByCourse(req: Request, res: Response): Promise<void> {
    try {
      const modules = await moduleService.getModulesByCourse(req.params.courseId);
      res.status(200).json(modules);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateModule(req: Request, res: Response): Promise<void> {
    try {
      const module = await moduleService.updateModule(req.params.id, req.body);
      if (!module) {
        res.status(404).json({ message: 'Module not found' });
      } else {
        res.status(200).json(module);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteModule(req: Request, res: Response): Promise<void> {
    try {
      await moduleService.deleteModule(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

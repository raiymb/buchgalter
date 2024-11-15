import { Request, Response } from 'express';
import { lessonService } from '../services/lessonService';

export const lessonController = {
  async createLesson(req: Request, res: Response): Promise<void> {
    try {
      const lesson = await lessonService.createLesson(req.body);
      res.status(201).json(lesson);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getLessonById(req: Request, res: Response): Promise<void> {
    try {
      const lesson = await lessonService.getLessonById(req.params.id);
      if (!lesson) {
        res.status(404).json({ message: 'Lesson not found' });
      } else {
        res.status(200).json(lesson);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getLessonsByModule(req: Request, res: Response): Promise<void> {
    try {
      const lessons = await lessonService.getLessonsByModule(req.params.moduleId);
      res.status(200).json(lessons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateLesson(req: Request, res: Response): Promise<void> {
    try {
      const lesson = await lessonService.updateLesson(req.params.id, req.body);
      if (!lesson) {
        res.status(404).json({ message: 'Lesson not found' });
      } else {
        res.status(200).json(lesson);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteLesson(req: Request, res: Response): Promise<void> {
    try {
      await lessonService.deleteLesson(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

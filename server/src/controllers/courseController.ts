import { Request, Response } from 'express';
import { courseService } from '../services/courseService';

export const courseController = {
  async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const course = await courseService.createCourse(req.body);
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCourseById(req: Request, res: Response): Promise<void> {
    try {
      const course = await courseService.getCourseById(req.params.id);
      if (!course) {
        res.status(404).json({ message: 'Course not found' });
      } else {
        res.status(200).json(course);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllCourses(req: Request, res: Response): Promise<void> {
    try {
      const courses = await courseService.getAllCourses(req.query);
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCoursesByInstructor(req: Request, res: Response): Promise<void> {
    try {
      const courses = await courseService.getCoursesByInstructor(req.params.instructorId);
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateCourse(req: Request, res: Response): Promise<void> {
    try {
      const course = await courseService.updateCourse(req.params.id, req.body);
      if (!course) {
        res.status(404).json({ message: 'Course not found' });
      } else {
        res.status(200).json(course);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteCourse(req: Request, res: Response): Promise<void> {
    try {
      await courseService.deleteCourse(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

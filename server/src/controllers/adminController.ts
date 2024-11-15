import { Request, Response } from 'express';
import { userService } from '../services/userService';
import { courseService } from '../services/courseService';
import { reviewService } from '../services/reviewService';
import { auditLogService } from '../services/auditLogService';
import { CustomRequest } from '../types/CustomRequest';
import { Types } from 'mongoose';


export const adminController = {
  // Create a new instructor
  async createInstructor(req: CustomRequest, res: Response): Promise<Response> {
    try {
      const instructorData = { ...req.body, role: 'instructor' };
      const instructor = await userService.createUser(instructorData);
      await auditLogService.logAction({
        adminId: new Types.ObjectId(req.user?.id),
        action: 'CREATE_INSTRUCTOR',
        details: `Instructor ${instructor._id} created by admin ${req.user?.id}`,
      });
      return res.status(201).json(instructor);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },


  // Get all instructors
  async getAllInstructors(req: Request, res: Response): Promise<Response> {
    try {
      const instructors = await userService.getAllUsers({ role: 'instructor' });
      return res.status(200).json(instructors);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Create a new admin
  async createAdmin(req: CustomRequest, res: Response): Promise<Response> {
    try {
      const adminData = { ...req.body, role: 'admin' };
      const admin = await userService.createUser(adminData);
      await auditLogService.logAction({
        adminId: new Types.ObjectId(req.user?.id),
        action: 'CREATE_ADMIN',
        details: `Admin ${admin._id} created by admin ${req.user?.id}`,
      });
      return res.status(201).json(admin);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Get all admins
  async getAllAdmins(req: Request, res: Response): Promise<Response> {
    try {
      const admins = await userService.getAllUsers({ role: 'admin' });
      return res.status(200).json(admins);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Get all courses created by instructors
  async getAllCourses(req: Request, res: Response): Promise<Response> {
    try {
      const courses = await courseService.getAllCourses();
      return res.status(200).json(courses);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Delete any user (admin privilege)
  async deleteUser(req: CustomRequest, res: Response): Promise<Response> {
    try {
      await userService.deleteUser(req.params.id);
      await auditLogService.logAction({
        adminId: new Types.ObjectId(req.user?.id),
        action: 'DELETE_USER',
        details: `User ${req.params.id} deleted by admin ${req.user?.id}`,
      });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Admin Dashboard - Get overview of key metrics
  async getDashboardMetrics(req: Request, res: Response): Promise<Response> {
    try {
      const activeUsersCount = await userService.getActiveUsersCount();
      const totalCourses = await courseService.getTotalCoursesCount();
      const reportedContentCount = await reviewService.getReportedContentCount();

      const metrics = {
        activeUsers: activeUsersCount,
        totalCourses,
        reportedContent: reportedContentCount,
      };

      return res.status(200).json(metrics);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Moderate reviews - delete or flag inappropriate reviews
  async moderateReview(req: CustomRequest, res: Response): Promise<Response> {
    try {
      const { reviewId, action } = req.body;

      if (action === 'delete') {
        await reviewService.deleteReview(reviewId);
        await auditLogService.logAction({
          adminId: new Types.ObjectId(req.user?.id),
          action: 'DELETE_REVIEW',
          details: `Review ${reviewId} deleted by admin ${req.user?.id}`,
        });
        return res.status(204).send();
      } else if (action === 'flag') {
        const updatedReview = await reviewService.flagReview(reviewId);
        await auditLogService.logAction({
          adminId: new Types.ObjectId(req.user?.id),
          action: 'FLAG_REVIEW',
          details: `Review ${reviewId} flagged by admin ${req.user?.id}`,
        });
        return res.status(200).json(updatedReview);
      } else {
        return res.status(400).json({ message: 'Invalid action. Use "delete" or "flag".' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

import { auditLogRepository } from '../repositories/auditLogRepository';
import { IAuditLog } from '../models/AuditLog';

export const auditLogService = {
  async logAction(logData: Partial<IAuditLog>): Promise<void> {
    await auditLogRepository.createLog(logData);
  },
};

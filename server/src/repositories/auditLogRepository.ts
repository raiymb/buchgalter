import AuditLog, { IAuditLog } from '../models/AuditLog';

export const auditLogRepository = {
  async createLog(logData: Partial<IAuditLog>): Promise<IAuditLog> {
    const log = new AuditLog(logData);
    return await log.save();
  },

  async getLogs(filters: any = {}): Promise<IAuditLog[]> {
    return await AuditLog.find(filters).exec();
  },
};
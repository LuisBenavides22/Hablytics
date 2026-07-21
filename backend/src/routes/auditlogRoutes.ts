import { AuditlogController } from "../controllers/auditlogController";
import { Router } from 'express';

const router = Router()

const auditController = new AuditlogController();

router.get('/', auditController.getAllLogs);

router.get('/users/:id', auditController.userlogs);

router.post('/', auditController.createLog);

router.get('/:id', auditController.getlogsbyID);

export default router;
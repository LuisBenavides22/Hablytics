import { AuditlogController } from "../controllers/auditlogController";
import { Router } from 'express';
import { authenticate } from "../middleware/authentication";
import limiter from "../middleware/rateLimiter";

const router = Router();

const auditController = new AuditlogController();

router.use(limiter);
router.use(authenticate);

router.get('/', auditController.getAllLogs);

router.get('/users/:id', auditController.userlogs);

router.post('/', auditController.createLog);

router.get('/:id', auditController.getlogsbyID);

export default router;

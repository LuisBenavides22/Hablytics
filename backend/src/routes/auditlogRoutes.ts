import { AuditlogController } from "../controllers/auditlogController.js";
import { Router } from 'express';
import { authenticate } from "../middleware/authentication.js";
import limiter from "../middleware/rateLimiter.js";

const router = Router();

const auditController = new AuditlogController();

router.use(limiter);
router.use(authenticate);

router.get('/users/:id', auditController.userlogs);

router.post('/', auditController.createLog);

router.get('/:id', auditController.getlogsbyID);

export default router;

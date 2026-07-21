import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs : 20 * 60 * 1000,
    limit : 20,
    standardHeaders: true,
    legacyHeaders: false
});

export default limiter;
import logger from '../services/logger.service';

export const logRequestData = (req, res, next) => {
    logger.info(JSON.stringify({
        method: req.method,
        body: req.body,
        params: req.params
    }));
    next();
};

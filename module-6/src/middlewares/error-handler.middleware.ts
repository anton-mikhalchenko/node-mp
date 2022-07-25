import logger from '../services/logger.service';

export const handleError = (err, req, res, next) => {
    logger.error(err);
    if (err.error.isJoi) {
        res.status(400).json({
            type: err.type,
            message: err.error.toString()
          });
    } else {
        res.status(500).json({ msg: 'Internal Server Error' });
        next(err);
    }
}

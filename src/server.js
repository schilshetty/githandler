const app = require('./app');
const config = require('./config/github.config');
const { logger } = require('./logger/github.logger');

init();

async function init() {
    try {
        app.listen(config.get('port'), () => {
            logger.info(`Express App Listening on Port ${config.get('port')}`);
        });
    } catch (error) {
        logger.error(`An error occurred: ${JSON.stringify(error)}`);
        process.exit(1);
    }
}
const app = require('./app');
const config = require('./config/github.config');
const db = require('./database/models');
const { logger } = require('./logger/github.logger');

init();

async function init() {
    try {
        await db.authenticate()
        logger.info('connected to the database successfully')
        app.listen(config.get('port'), () => {
            logger.info(`Express App Listening on Port ${config.get('port')}`);
        });
    } catch (error) {
        logger.error(`An error occurred: ${JSON.stringify(error)}`);
        process.exit(1);
    }
}


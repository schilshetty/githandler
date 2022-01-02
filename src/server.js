const app = require('./app');
const config = require('./config/github.config');

init();

async function init() {
    try {
        app.listen(config.get('port'), () => {
            console.log(`Express App Listening on Port ${config.get('port')}`);
        });
    } catch (error) {
        console.error(`An error occurred: ${JSON.stringify(error)}`);
        process.exit(1);
    }
}
var convict = require('convict');

convict.addFormat(require('convict-format-with-validator').ipaddress);

// Define a schema
var config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
    },
    ip: {
        doc: 'The IP address to bind.',
        format: 'ipaddress',
        default: '127.0.0.1',
        env: 'IP_ADDRESS',
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3000,
        env: 'PORT',
        arg: 'port'
    },
    db: {
        host: {
            doc: 'Database host name/IP',
            format: '*',
            default: 'server1.dev.test'
        },
        name: {
            doc: 'Database name',
            format: String,
            default: 'users'
        },
        username: {
            doc: 'Database user name',
            format: '*',
            default: 'user',
        },
        password: {
            doc: 'Database password',
            format: '*',
            default: 'user',
        },
        port: {
            doc: 'The port to bind.',
            format: 'port',
            default: 5432,
        },
    },
    github: {
        baseUrl: {
            doc: 'Git hub url',
            format: '*',
            default: '',
        },
        githubToken: {
            doc: 'Git hub authentication token',
            format: '*',
            default: '',
        },
    },
    admins: {
        doc: 'Users with write access, or null to grant full access without login.',
        format: Array,
        nullable: true,
        default: null
    }
});


var env = config.get('env');
config.loadFile('./config/' + env + '.json');



// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
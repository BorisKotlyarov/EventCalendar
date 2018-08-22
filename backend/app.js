const express                   = require('express');
const bodyParser                = require('body-parser');
const databaseCon               = require('./dbConnection');
const config                    = require('./config');
const router                    = require('./router');


databaseCon.then((dbConnection)=>{
    console.log('Database connection is Successfully.');

    const app = express();
    app.use(bodyParser.json());

    app.use((request, rsponse, next)=>{
        request.__db__ = dbConnection;
        next();
    });

    router(app);

    app.listen(config.server.port, () => {
        console.log(`Server is started at http://localhost:${config.server.port}`);
    });

}).catch((error) => {
    console.log("Database connection is fail.", error);
});

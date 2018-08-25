module.exports = (env, argv) => {
    let mode = 'development';

    if(argv.mode){
        mode = argv.mode;
    }

    let config = require(`./webpack.${mode}.config.js`);
    return config;
};

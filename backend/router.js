const routes = [
    {
        method: 'all',
        path: '/*',
        callback: require('./modules/all/corsAllowHeaders')
    },
    {
        method: 'get',
        path: '/',
        callback: require('./modules/get/default')
    }
];

module.exports = function (app) {
    routes.forEach((route)=>{
        app[route.method](route.path, route.callback);
    });
};
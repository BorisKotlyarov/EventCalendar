const routes = [
    {
        method: 'all',
        path: '/*',
        callback: require('./modules/all/corsAllowHeaders')
    },
    {
        method: 'get',
        path: '/users',
        callback: require('./modules/get/users')
    },
    {
        method: 'post',
        path: '/users',
        callback: require('./modules/post/users')
    },
    {
        method: 'post',
        path: '/authorize',
        callback: require('./modules/post/authorize')
    },
    {
        method: 'post',
        path: '/authorize/close',
        callback: require('./modules/post/authorizeClose')
    },
    {
        method: 'get',
        path: '/schedules',
        callback: require('./modules/get/schedules')
    },
    {
        method: 'post',
        path: '/schedules',
        callback: require('./modules/post/schedules')
    }
];

module.exports = function (app) {
    routes.forEach((route) => {
        app[route.method](route.path, route.callback);
    });
};
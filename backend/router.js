const routes = [
    {
        method: 'all',
        path: '/*',
        callback: require('./modules/all/corsAllowHeaders')
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
    }
];

module.exports = function (app) {
    routes.forEach((route)=>{
        app[route.method](route.path, route.callback);
    });
};
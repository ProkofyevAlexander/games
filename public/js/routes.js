define([], function()
{
    return {
        defaultRoutePath: '/:lng',
        routes: {
            '/:lng': {
                templateUrl: '/components/main'
            },
            '/:lng/checkers': {
                templateUrl: '/components/games/checkers/checkers',
                dependencies: ['controllers/games/checkers']
            },
            '/:lng/about': {
                templateUrl: '/components/main'
            }
        }
    };
});
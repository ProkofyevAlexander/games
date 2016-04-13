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
                dependencies: ['controllers/games/checkers'],
                css: ['/css/components/games/checkers/checkers.css']
            },
            '/:lng/checkers-svg': {
                templateUrl: '/components/games/checkers/checkers-svg',
                dependencies: ['controllers/games/checkers'],
                css: ['/css/components/games/checkers/checkers-svg.css']
            },
            '/:lng/about': {
                templateUrl: '/components/main'
            }
        }
    };
});
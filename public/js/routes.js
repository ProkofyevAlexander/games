define([], function()
{
    return {
        routes: {
            '/:lng/': {
                templateUrl: '/components/main',
                dependencies: ['controllers/main'],
                css: ['/css/main.css']
            },
            '/:lng/games/checkers/': {
                templateUrl: '/components/games/checkers/checkers',
                dependencies: ['controllers/games/checkers'],
                css: ['/css/components/games/checkers/checkers.css']
            },
            '/:lng/games/checkers-svg/': {
                templateUrl: '/components/games/checkers/checkers-svg',
                dependencies: ['controllers/games/checkers'],
                css: ['/css/components/games/checkers/checkers-svg.css']
            }
        }
    };
});
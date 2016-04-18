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
            '/:lng/upwork/jobs/_~0168d5a7b7d5591e11/': {
                templateUrl: '/components/upwork/jobs/_~0168d5a7b7d5591e11/change_password',
                dependencies: ['controllers/upwork/jobs/_~0168d5a7b7d5591e11/scripts'],
                css: ['/css/components/upwork/jobs/_~0168d5a7b7d5591e11/styles.css']
            },
            '/:lng/games/checkers-svg/': {
                templateUrl: '/components/games/checkers/checkers-svg',
                dependencies: ['controllers/games/checkers'],
                css: ['/css/components/games/checkers/checkers-svg.css']
            }
        }
    };
});
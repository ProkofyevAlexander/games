var initial = {
    "currentPlayer": "white",
    "selectedTile": null,
    "checkers": [
        {
            "coordinates": {
                "x": 0,
                "y": 1
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 0,
                "y": 3
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 0,
                "y": 5
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 0,
                "y": 7
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 1,
                "y": 0
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 1,
                "y": 2
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 1,
                "y": 4
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 1,
                "y": 6
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 2,
                "y": 1
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 2,
                "y": 3
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 2,
                "y": 5
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 2,
                "y": 7
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 5,
                "y": 0
            },
            "type": "white",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 5,
                "y": 2
            },
            "type": "white",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 5,
                "y": 4
            },
            "type": "white",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 5,
                "y": 6
            },
            "type": "white",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 6,
                "y": 1
            },
            "type": "white",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 6,
                "y": 3
            },
            "type": "white",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 6,
                "y": 5
            },
            "type": "white",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 6,
                "y": 7
            },
            "type": "white",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 7,
                "y": 0
            },
            "type": "white",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 7,
                "y": 2
            },
            "type": "white",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 7,
                "y": 4
            },
            "type": "white",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 7,
                "y": 6
            },
            "type": "white",
            "king": false,
            "selected": false
        }
    ]
};

var twoCheckers = {
    "currentPlayer": "white",
    "selectedTile": null,
    "checkers": [
        {
            "coordinates": {
                "x": 2,
                "y": 7
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 5,
                "y": 6
            },
            "type": "white",
            "king": false,
            "selected": false
        }
    ]
};

var availabilityTest1 = {
    "currentPlayer": "white",
    "selectedTile": null,
    "checkers": [
        {
            "coordinates": {
                "x": 2,
                "y": 7
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 5,
                "y": 6
            },
            "type": "white",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 4,
                "y": 7
            },
            "type": "white",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 4,
                "y": 5
            },
            "type": "white",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 6,
                "y": 7
            },
            "type": "white",
            "king": false,
            "selected": false
        }
    ]
};

var availabilityTest2 = {
    "currentPlayer": "white",
    "selectedTile": null,
    "checkers": [
        {
            "coordinates": {
                "x": 2,
                "y": 7
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 6,
                "y": 5
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 5,
                "y": 6
            },
            "type": "white",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 4,
                "y": 7
            },
            "type": "white",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 4,
                "y": 5
            },
            "type": "white",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 6,
                "y": 7
            },
            "type": "white",
            "king": false,
            "selected": false
        }
    ]
};

var kingAfterEat = {
    "currentPlayer": "white",
    "selectedTile": null,
    "checkers": [
        {
            "coordinates": {
                "x": 1,
                "y": 2
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 2,
                "y": 5
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 2,
                "y": 1
            },
            "type": "white",
            "king": false,
            "selected": false
        }
    ]
};

var kingSteps1 = {
    "currentPlayer": "white",
    "selectedTile": null,
    "checkers": [
        {
            "coordinates": {
                "x": 1,
                "y": 0
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 5,
                "y": 4
            },
            "type": "white",
            "king": true,
            "selected": false
        }
    ]
};

var kingSteps2 = {
    "currentPlayer": "white",
    "selectedTile": null,
    "checkers": [
        {
            "coordinates": {
                "x": 2,
                "y": 5
            },
            "type": "black",
            "king": true,
            "selected": false
        },
        {
            "coordinates": {
                "x": 6,
                "y": 3
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 6,
                "y": 5
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 7,
                "y": 6
            },
            "type": "white",
            "king": true,
            "selected": false
        }
    ]
};

var kingSteps3 = {
    "currentPlayer": "white",
    "selectedTile": null,
    "checkers": [
        {
            "coordinates": {
                "x": 0,
                "y": 1
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 3,
                "y": 2
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 1,
                "y": 2
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 2,
                "y": 5
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 5,
                "y": 6
            },
            "type": "black",
            "king": false,
            "selected": false
        },
        {
            "coordinates": {
                "x": 0,
                "y": 3
            },
            "type": "white",
            "king": true,
            "selected": false
        }
    ]
};

module.exports = {
    initial: initial,
    twoCheckers: twoCheckers,
    availabilityTest1: availabilityTest1,
    availabilityTest2: availabilityTest2,
    kingAfterEat: kingAfterEat,
    kingSteps1: kingSteps1,
    kingSteps2: kingSteps2,
    kingSteps3: kingSteps3
};
function getData(index) {
    data = {"projects": [
        {
            "title": "Slide Puzzle Challenge",
            "team": "by myself",
            "duration": "2 days",
            "date": "26-4-2018",
            "summary": "Here is my admission assignment for the HKU college",
            "description": "Game rules \n Try to solve the sliding puzzles as soon as possible before the timeline ends. For each puzzle you get some extra time, but the level increases during the course of the game. Try to get the highest possible score and beat your own high score! \nSpecial mechanic!\nThe interesting thing about this game is the fact that you get a time pressure when solving these sliding puzzles. This ensures that the game first starts with easy puzzles to solve so that the player does not get overwhelmed.\nSolving this combination of time pressure and a soothing sliding puzzle creates an interesting twist!",
            "images":[
                './assets/projects/0.png', 
                './assets/projects/1.png', 
                '',
                '',
                '',
                '',
                '',
                '',
                ''
            ],
            "buttons": [
                '', //github
                'https://nathannieuwenhuizen.github.io/PlayableBuilds/HKU/dist/index.html', //play
                '', //website/ extra info
            ]
        },
        {
            "title": "Blasterfest",
            "team": "2 Developers | 3 Artsits",
            "duration": "4 weeks",
            "date": "June 2016",
            "summary": "Unity project made for my study in Amsterdam (Media College Amsterdam)",
            "description": "For this school project, we as developpers were assigned to create a game and make our own assignments. We were free to hire other developers and artists for our project. We had our priorities on making a working prototype and good communication within our team.",
            "images":[
                './assets/projects/bf1.png',
                'https://i.gyazo.com/e1f9fda30b1f42c2f3aa33f337f5dd1e.gif', 
                './assets/projects/bf2.png',
                './assets/projects/bf3.png',
                './assets/projects/bf4.png',
                './assets/projects/bf5.png',
                './assets/projects/bf6.png',
                ''
            ],
            "buttons": [
                'https://github.com/Phazy1996/MatchMaker2', //github
                'https://nathannieuwenhuizen.github.io/PlayableBuilds/BlasterfestWEBGL/index.html', //play
                '', //website/ extra info
            ]
        }
    ]}
    if (index === -1) {
        return data.projects;
    }
    return data.projects[index];
}
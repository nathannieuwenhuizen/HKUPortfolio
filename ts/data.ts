export interface Iproject {
    title: string;
    team: string;
    duration: string;
    date: string;
    summary: string;
    description: string;
    images: string[];
    buttons: string[];
}

export default class Data {
    private data: Iproject[];
    constructor(){
        this.data = [
            {
                title: 'Slide Puzzle Challenge',
                team: 'by myself',
                duration: '2 days',
                date: '26-4-2018',
                summary: 'Here is my admission assignment for the HKU college',
                description: 'Game rules \n Try to solve the sliding puzzles as soon as possible before the timeline ends.' +
                ' For each puzzle you get some extra time, but the level increases during the course of the game. Try to get the highest possible score and beat your own high score! ' +
                '\nSpecial mechanic!\nThe interesting thing about this game is the fact that you get a time pressure when solving these sliding puzzles.' +
                ' This ensures that the game first starts with easy puzzles to solve so that the player does not get overwhelmed. ' +
                '\nSolving this combination of time pressure and a soothing sliding puzzle creates an interesting twist!',
                images: [
                    './assets/projects/0.jpg',
                    './assets/projects/1.jpg',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    ''
                ],
                buttons: [
                    '', //github
                    'https://nathannieuwenhuizen.github.io/PlayableBuilds/HKU/dist/index.html', //play
                    '' //website/ extra info
                ]
            },
            {
                title: 'Blasterfest',
                team: '2 Developers | 3 Artsits',
                duration: '4 weeks',
                date: 'June 2016',
                summary: 'Unity project made for my study in Amsterdam (Media College Amsterdam)',
                description: 'For this school project, we as developpers were assigned to create a game and make our own assignments. ' +
                'We were free to hire other developers and artists for our project. We had our priorities on making a working prototype and good communication within our team.',
                images: [
                    './assets/projects/bf1.jpg',
                    'https://i.gyazo.com/e1f9fda30b1f42c2f3aa33f337f5dd1e.gif',
                    './assets/projects/bf2.jpg',
                    './assets/projects/bf3.jpg',
                    './assets/projects/bf4.jpg',
                    './assets/projects/bf5.jpg',
                    './assets/projects/bf6.jpg',
                    ''
                ],
                buttons: [
                    'https://github.com/Phazy1996/MatchMaker2', //github
                    'https://nathannieuwenhuizen.github.io/PlayableBuilds/BlasterfestWEBGL/index.html', //play
                    '' //website/ extra info
                ]
            },
            {
                title: 'Portfolio iteration v1',
                team: 'By myself',
                duration: '2 weeks',
                date: 'September 2018',
                summary: 'First itteration of portfolio website for the HKU',
                description: 'In this sub part section of the portfolio project, the basic functonality is added.' +
                ' You can view the logbook at the info button or <a href="./assets/files/logboek.pdf">here</a>. <br> Zip file: <a href="./assets/files/build.zip">link</a>.',
                images: [
                    './assets/projects/po1.jpg',
                    './assets/projects/po2.jpg',
                    './assets/projects/po3.jpg',
                    './assets/projects/po4.jpg',
                    ''
                ],
                buttons: [
                    'https://github.com/nathannieuwenhuizen/HKUPortfolio', //github
                    '', //play
                    './assets/files/logboek.pdf' //website/ extra info
                ]
            }
        ];
    }
    public getData(index: number): any {
        if (index === -1) {
            return this.data;
        }
        return this.data[index];
    }
}

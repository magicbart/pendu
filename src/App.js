import React, { Component } from 'react';
import shuffle from 'lodash.shuffle'

import './App.css';

const expressions = [
    'JURASSIK PARK',
    'CAPTAIN AMERICA',
    'JAMES BOND',
    'EVANGELION',
    'IL ETAIT UNE FOIS EN CHINE',
    'LE ROI LION',
    'LE MARIN DES MERS DE CHINE',
    'MATRIX',
    'OPEN CLASS ROOMS',
    'STAR WARS',
    'INDIANA JONES',
    'FAST AND FURIOUS',
    'VIDEO GAMES RECORDS',
    'ONE PIECE',
    'DRAGON BALL Z',
    'NARUTO',
    'LA REINE DES NEIGES',
]

class App extends Component {

    state = {
        expression: [],
        nbLetterFound: 0,
        nbLetterTotal: 0,
        guesses: 0,
        keyboard: [
            {'name': 'A', 'state': 'active'},
            {'name': 'B', 'state': 'active'},
            {'name': 'C', 'state': 'active'},
            {'name': 'D', 'state': 'active'},
            {'name': 'E', 'state': 'active'},
            {'name': 'F', 'state': 'active'},
            {'name': 'G', 'state': 'active'},
            {'name': 'H', 'state': 'active'},
            {'name': 'I', 'state': 'active'},
            {'name': 'J', 'state': 'active'},
            {'name': 'K', 'state': 'active'},
            {'name': 'L', 'state': 'active'},
            {'name': 'M', 'state': 'active'},
            {'name': 'N', 'state': 'active'},
            {'name': 'O', 'state': 'active'},
            {'name': 'P', 'state': 'active'},
            {'name': 'Q', 'state': 'active'},
            {'name': 'R', 'state': 'active'},
            {'name': 'S', 'state': 'active'},
            {'name': 'T', 'state': 'active'},
            {'name': 'U', 'state': 'active'},
            {'name': 'V', 'state': 'active'},
            {'name': 'W', 'state': 'active'},
            {'name': 'X', 'state': 'active'},
            {'name': 'Y', 'state': 'active'},
            {'name': 'Z', 'state': 'active'},
        ]
    }

    init() {
        var nb = 0
        const shuffleExpressions = shuffle(expressions)
        const word = shuffleExpressions[0]
        const expression = []
        for (var i = 0; i < word.length; i++) {
            expression.push({
                'name': word[i],
                'state': word[i] === ' ' ? 'space' : 'hidden'
            })
            if (word[i] !== ' ') {
                nb++;
            }
        }
        const {keyboard} = this.state
        keyboard.map((letter) => {
            return letter.state = 'active'
        })
        this.setState({
            expression: expression,
            nbLetterFound: 0,
            nbLetterTotal : nb,
            guesses: 0,
            keyboard: keyboard,
        })
    }


    componentDidMount() {
        this.init()
    }


    handlKeyboardClick(index) {
        const { keyboard, expression } = this.state

        const selectedLetter = keyboard[index]['name']

        var { nbLetterFound, guesses } = this.state
        guesses++

        const change = expression.map((letter) => {
            if ( (selectedLetter === letter.name) && (keyboard[index]['state'] === 'active') ) {
                letter.state = 'visible';
                nbLetterFound++
            }
            return letter
        });

        keyboard[index]['state'] = 'inactive'
        this.setState({ keyboard, expression: change, nbLetterFound, guesses })
    }

    render() {
        const { keyboard, expression, nbLetterFound, nbLetterTotal, guesses } = this.state
        const won = nbLetterFound === nbLetterTotal
        return (
            <div className="pendu">
                <div id="infos">
                    Nombre de lettres : {nbLetterFound} / {nbLetterTotal}
                </div>
                <div id="guesses">
                    {guesses} essai(s)
                </div>
                <div id="expression">
                    <ul>
                        {expression.map((letter, index) => (
                            <li key={index} className={letter.state}><span className={letter.state}>{letter.name}</span></li>
                        ))}
                    </ul>
                </div>
                <br />
                <div id="keyBoard">
                    <ul>
                          {keyboard.map((letter, index) => (
                              <li key={index} className={letter.state} onClick={(e) => { !won && this.handlKeyboardClick(index)}}>{letter.name}</li>
                          ))}
                    </ul>
                </div>
                {won &&
                <div id="won">
                    Vous avez réussi en {guesses} essais <br />
                    <button onClick={() => this.init()}>Nouvelle partie</button>
                </div>
                }
            </div>
        );
    }
}

export default App;

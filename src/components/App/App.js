import React, { Component } from 'react';
import './App.css';
import PictureCard from '../PictureCard/PictureCard';
import items from "../../items.json";


export default class App extends Component {

    constructor(props) {

        super(props);

        this.state = {            
            clickedCards: [],
            cardItems: items,
            score: 0,
            highScore: 0,            
            lastClicked: 0,
        };


        this.shuffle = this.shuffle.bind(this);
        this.renderCards = this.renderCards.bind(this);
    }


    shuffle() {

        const tempArray = [...this.state.cardItems];

        for(let i = tempArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = tempArray[i];
            tempArray[i] = tempArray[j];
            tempArray[j] = temp;
        }
        

        this.setState({ cardItems: [...tempArray] });
    }

    handleCardClick(clickedId) {


        if (!this.state.clickedCards.includes(clickedId)) {
            this.shuffle();
            this.setState({
                clickedCards: [...this.state.clickedCards, clickedId],
                score: this.state.score + 1,
                lastClicked: clickedId
            },
            () => {
                if (this.state.score > this.state.highScore) {
                    this.setState({
                        highScore: this.state.score
                    });
                }
            });

        } else { 
            this.setState({                
                lastClicked: -1
            });
            
            setTimeout(() => {
                this.setState({                    
                    cardItems: items,
                    clickedCards: [],
                    score: 0,                    
                });
            }, 1000);
        }
    }

    renderCards() {

        const cardItems = [...this.state.cardItems];        
        const cards = cardItems.map((elem, i) => {

            const item = cardItems[i];            
            return (
                <PictureCard
                    Id={item.id}
                    name={item.name}
                    image={item.image}
                    occupation={item.occupation}
                    location={item.location}
                    cardClickMethod={() => { this.handleCardClick(item.id) }}                                        
                    alt=""/>
            )
        });

        return cards;
    }

    render() {
        return (
            <main className="App">
                <header className="App-header">
                    <h1 className="App-title">Character Clicker</h1>
                    <div className="App-scoreContainer">
                        <h2 className="App-score">Score: {this.state.score}</h2>
                        <h2 className="App-highScore">High Score: {this.state.highScore}</h2>
                    </div>          
                </header>

                <section className='container'>
                {
                        this.renderCards()
                }
                </section>
            </main>
        );
    }
}
import React from 'react';
import './CardEditor.css';

import {Link, withRouter} from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class CardEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            cards: [
                { front: "front1", back: "back1" },
                { front: "front2", back: "back2" },
            ],
            front:'', 
            back:'',
            name:'',
        };
    }

    addCard = () => {
        if(!this.state.front.trim() || !this.state.back.trim()){
            alert('Cannot add empty card');
            return;
        }

        const newCard = { front: this.state.front, back: this.state.back }
        const cards = this.state.cards.slice().concat(newCard);
        this.setState({ cards, front: '', back: '' });
    };

    deleteCard = index => {
        const cards = this.state.cards.slice();
        cards.splice(index, 1);
        this.setState({ cards });;
    }

    handleChange = event => this.setState({ [event.target.name]: event.target.value });

    createDeck = () => {
        const deckId = this.props.firebase.push('/Flashcard').key; // Random key
        const updates = {};
        const newDeck = {cards: this.state.cards, name: this.state.name};
        const onComplete = () => { // callback function
            this.props.history.push(`/viewer/${deckId}`); // Redirect
        }
        updates[`/Flashcard/${deckId}`] = newDeck;
        updates[`/homepage/${deckId}`] = {name: this.state.name};

        this.props.firebase.update(`/`, updates, onComplete); // Update and callback
    };

    render() {
        const cards = this.state.cards.map((card, index) => {
            return (
                <tr key={index}>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td>
                        <button className="card-editor-button" onClick={() => this.deleteCard(index)}>Delete card</button>
                    </td>
                </tr>
            );
        });

        return (
            <div className="card-editor-container">
                <h2 className="card-editor-header">Card Editor</h2>
                <div>
                    Deck Name: <input
                        className="deck-name-input"
                        name='name'
                        onChange={this.handleChange}
                        placeholder='Name of deck'
                        value={this.state.name} />
                </div>
                <br />
                <table className="card-table">
                    <thead>
                        <tr>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{cards}</tbody>
                </table>
                <br />
                <input
                    className="card-input"
                    name='front'
                    onChange={this.handleChange}
                    placeholder='Front of card'
                    value={this.state.front}
                />

                <input
                    className="card-input"
                    name='back'
                    onChange={this.handleChange}
                    placeholder='Back of card'
                    value={this.state.back}
                />
                <button className="card-editor-button" onClick={this.addCard}>Add card</button>
                <hr />
                <div>
                    <button
                        className="card-editor-button"
                        disabled={!this.state.name.trim() || this.state.cards.length === 0}
                        onClick={this.createDeck}
                    >
                        Create deck
                    </button>
                </div>
                <br />
                <Link className="home-link" to="/">To Home</Link>
            </div>
        );
    }
}

export default compose(firebaseConnect(), withRouter)(CardEditor); 

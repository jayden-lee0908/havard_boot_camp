import React from 'react';
import './CardViewer.css';

import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            card: props.cards,
            currentIndex: 0,
            displayFront: true,
        };
    }

    nextCard = () => {
        if(this.state.currentIndex < this.props.cards.length - 1) {
            this.setState({
                currentIndex: this.state.currentIndex + 1,
                displayFront: true,
            });
        }
    };

    prevCard = () => {
        if (this.state.currentIndex > 0) {
            this.setState({
                currentIndex: this.state.currentIndex - 1,
                displayFront: true,
            });
        }
    };

    flipCard = () => this.setState(
        { displayFront: !this.state.displayFront }
    );

    render() {
        if (!isLoaded(this.props.cards)) {
            return <div className="loading-message">Loading...</div>
        }

        if (isEmpty(this.props.cards)) {
            return <div className="not-found-message">Page not found!</div>
        }

        const card = this.props.cards[this.state.currentIndex][
            this.state.displayFront ? 'front' : 'back'
        ];

        return (
            <div className="card-viewer-container">
                <h2 className="card-viewer-header">{this.props.name}</h2>
                Card {this.state.currentIndex + 1} out of {this.props.cards.length}.
                <div className="card" onClick={this.flipCard}>
                    {card}
                </div>
                <br />
                <button
                    disabled={this.state.currentIndex === 0}
                    onClick={this.prevCard}>
                    Prev card
                </button>
                <button
                    disabled={this.state.currentIndex === this.props.cards.length - 1}
                    onClick={this.nextCard}>
                    Next card
                </button>
                <hr />
                <Link className="home-link" to="/">To Home</Link>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const deck = state.firebase.data[props.match.params.deckId];
    const name = deck && deck.name;
    const cards = deck && deck.cards;

    return { cards: cards, name: name};
}

export default compose(
    withRouter,
    firebaseConnect(props => {
        const deckId = props.match.params.deckId;
        return [{ path: `/Flashcard/${deckId}`, storeAs: deckId}];
    }),
    connect(mapStateToProps),
)(CardViewer);
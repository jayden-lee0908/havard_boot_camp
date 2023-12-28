import React from 'react';

import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './Homepage.css';

const Homepage = props => {
    if (!isLoaded(props.homepage)) {
        return <div>Loading...</div>;
    }

    const decks = Object.keys(props.homepage).map(deckId => {
        return (
            <Link to={`/viewer/${deckId}`} key={deckId} className="deck-link">
                <div className="deck-item">
                    {props.homepage[deckId].name}
                </div>
            </Link>
        );
    });

    return (
        <div className="homepage-container">
            <h2 className="header">Homepage</h2>
            {/* <Link to="/editor">Go to card editor</Link>
            <br />
            <Link to="/viewer">Go to card viewer</Link> */}

            <Link className="link" to="/editor">Create a new flashcards deck!</Link>
            <h3 className="sub-header">Flashcards</h3>
            {decks}
        </div>
    );
}

const mapStateToProps = state => {
    return { homepage: state.firebase.data.homepage };
}

export default compose(firebaseConnect(['/homepage']), connect(mapStateToProps))(Homepage);
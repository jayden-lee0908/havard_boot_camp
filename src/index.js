import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from "react-router-dom";

import { Provider } from 'react-redux';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { legacy_createStore as createStore } from 'redux';
import { combineReducers } from 'redux';
import {
    ReactReduxFirebaseProvider,
    firebaseReducer
} from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';

const firebaseConfig = {
    apiKey: "AIzaSyBN0yQN4M7aP7d3yuQB-T6UicRMxs8ige0",
    authDomain: "bootcamp-e553a.firebaseapp.com",
    databaseURL: "https://bootcamp-e553a-default-rtdb.firebaseio.com",
    projectId: "bootcamp-e553a",
    storageBucket: "bootcamp-e553a.appspot.com",
    messagingSenderId: "750364817946",
    appId: "1:750364817946:web:548cd56008303557cd2fa3",
    measurementId: "G-5G7RQLNTP8"
};

firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer
    // firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const store = createStore(rootReducer, composeWithDevTools());

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
}

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
    // createFirestoreInstance // <- needed if using firestore
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>
);

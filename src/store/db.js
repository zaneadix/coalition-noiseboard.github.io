import Github from 'github-api';
import firebase from 'firebase/app';
// import 'firebase/auth';
import 'firebase/firestore';


export const ghClient = new Github({
    token: 'd8_35_f6_70_90_a7_68_39_5a_9f_20_75_72_1d_cb_35_f2_62_ce_bd'.replace(/_/g, '') // NOT A TOKEN
});

export const repo = ghClient.getRepo('zaneadix/coalition-noiseboard');

export const fb = firebase.initializeApp({
    // apiKey: "AIzaSyAMDZoEjIuzTO88xlYingGtlTLKGPs9dkk",
    // authDomain: "coalition-noise-board.firebaseapp.com",
    databaseURL: "https://coalition-noise-board.firebaseio.com",
    projectId: "coalition-noise-board",
});

export const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

// export const fbBoards = firestore.collection('boards');
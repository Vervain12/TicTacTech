import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, addDoc, setDoc, updateDoc, deleteDoc, query, doc, increment } from "firebase/firestore";

export const getScore = async (userId) => { // Non functional, fix this later
    const items = [];
    const docRef = doc(db, "users", userId, "score");
    const snapshot = await getDocs(docRef);

    snapshot.forEach((doc) => {
        items.push({id: doc.id, ...doc.data()});
    });
    return items;
};

export const addUser = async (userId) => {
    const scoreTypes = ['OScore', 'Ties', 'XScore'];

    for (const scoreType of scoreTypes) {
        try{
            await setDoc(doc(db, "users", userId, "score", scoreType), {
                score: 0 
            });
        }
        catch(e){
            alert(e);
        }
    }
};


export const addScore = async (userId, whichScore) => {
    const docRef = doc(db, "users", userId, "score", whichScore)
    await updateDoc(docRef, {score: increment(1)});
};
import { db } from "../firebase/firebaseConfig";
import { collection, getDoc, addDoc, setDoc, updateDoc, deleteDoc, query, doc, increment } from "firebase/firestore";

export const getScore = async (userId) => { // Non functional, fix this later
    const items = [];
    const scoreTypes = ['OScore', 'Ties', 'XScore'];
    for(const scoreType of scoreTypes){
        const docRef = doc(db, "users", userId, "score", scoreType);
        const docSnap = await getDoc(docRef);
        items.push(docSnap.data());
    }
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
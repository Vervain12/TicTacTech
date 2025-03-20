import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from "react";
import { useSymbolPicker } from '../context/symbolcontext';

const Game = ({ route }) => {

    /*Retrieving the aiOn param, converting from string to bool*/
    const { aiOn } = route.params;

    /*Retrieving the symbols*/
    const { xSymbol, oSymbol } = useSymbolPicker();

    /*General game logic variables*/
    const [xTurn, setXTurn] = useState(true);
    const [gridStates, setGridStates] = useState(Array(9).fill(""));
    const grid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [gameEnd, setGameEnd] = useState(false);

    /*setXWins, setOWins, and setGameTies could be implemented with context?*/
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);
    const [gameTies, setGameTies] = useState(0);

    /*Ai's turn: Selects a random position from the unused slots*/
    async function handleAiTurn(){
        if(!gameEnd){
            setTimeout(() => {
                const availableSlots = currentSlots();
                const randomIndex = Math.floor(Math.random() * availableSlots.length);
                const selectedPosition = availableSlots[randomIndex];
                handleTurns(selectedPosition);
            }, 500);
        }
    }

    const currentSlots = () => {
        let openSlots = [];
        for (let i = 0; i < gridStates.length; i++) {
            if (gridStates[i] === "") {
                openSlots.push(i);
            }
        }
        return openSlots;
    }

    useEffect(() => {
        checkWinStates();
        if(aiOn && !xTurn && !gameEnd){
            handleAiTurn();
        }
        else if(gameEnd){
            resetStates();
        }
    }, [gridStates]);

    useEffect(() => {
        resetStates();
    }, []);

    function handleTurns(id) {
        if (gridStates[id] !== "") 
            return;

        const currentSymbol = xTurn ? xSymbol : oSymbol;
        setXTurn(!xTurn);

        const updatedGridStates = [...gridStates];
        updatedGridStates[id] = currentSymbol;
        setGridStates(updatedGridStates);
    }

    function resetStates() {
        setXTurn(true);
        setGameEnd(false);
        const updatedGridStates = [...gridStates];
        updatedGridStates.fill("");
        setGridStates(updatedGridStates);
    }

    function checkWinStates() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]];

        for (const pattern of winPatterns) {
            const [x, y, z] = pattern;
            if (
                gridStates[x] &&
                gridStates[x] === gridStates[y] &&
                gridStates[y] === gridStates[z]
            ) {
                setGameEnd(true);
                /*Unsure how to get images within alerts*/
                if (gridStates[x] == xSymbol && !gameEnd){
                    alert("X Wins!");
                    setXWins(xWins + 1);
                }
                else if (gridStates[x] == oSymbol && !gameEnd){
                    alert("O Wins!");
                    setOWins(oWins + 1);
                }
                return;
            }
        }

        if (gridStates.every(element => element !== "") && !gameEnd){
            alert("Tied Game!");
            setGameTies(gameTies + 1);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{aiOn ? "Single Player" : "Two Player"}</Text>
            <View style={styles.board}>
                {grid.map((id) => (
                    <TouchableOpacity
                        key={id}
                        style={styles.cell}
                        disabled={aiOn && !xTurn}
                        onPress={() => handleTurns(id - 1)}>
                        <Image source={gridStates[id - 1]} style={styles.symbol}/>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    symbol: {
        resizeMode: 'contain',
        width: '50%',
        height: '50%',
    },
    winarea: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        flexDirection: "row",
        padding: 10
    },
    wintext: {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#333',
        marginLeft: 2,
        marginRight: 2,
        padding: 10
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    board: {
        width: 300,
        height: 300,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 2,
        borderColor: '#333',
    },
    cell: {
        width: '33.33%',
        height: '33.33%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
    },
});

export default Game;

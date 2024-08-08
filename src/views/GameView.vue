<template>
    <div class="game-view">
        <EasyProfileComponent v-if="showEasy && easyName" :profileName="easyName" @click="closeProfile" />
        <PopUpComponent v-if="showPopup" :titolo="popupTitle" :testo="popupText"
            :bottone1="{ label: popupButton1.label, link: '#' }" :bottone2="{ label: popupButton2.label, link: '#' }"
            @bottone1Click="handlePopupAction('confirm')" @bottone2Click="handlePopupAction('cancel')" />
        <header class="header">
            <h1>Game ID: {{ idGame }}</h1>
            <div class="actions">
                <button @click="viewOpponentProfile">Vedi Profilo Avversario</button>
                <button @click="proposeDraw">Chiedi Patta</button>
                <button @click="resignGame">Abbandona Partita</button>
            </div>
            <div class="turn-indicator">
                <table>
                    <tr>
                        <th>
                            <p>Turno corrente</p>
                        </th>
                        <th>
                            <p>Timer</p>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <span :class="{
                                'white-turn': currentTurn === 'white',
                                'black-turn': currentTurn === 'black',
                            }">
                                {{ currentTurn.charAt(0).toUpperCase() + currentTurn.slice(1) }}
                            </span>
                        </th>
                        <th>
                            <TimeComponent ref="gameTimer" :minutes="1000" @time-up="handleTimeUp" class="timer-component" />
                        </th>
                    </tr>
                </table>
            </div>
        </header>
        <div class="container">
            <!-- Sezione per le mosse giocate -->
            <div class="moves-section">
                <MoveHistoryComponent :moves="moves" />
            </div>

            <!-- Sezione per la scacchiera -->
            <div class="board-section">
                <div class="board">
                    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
                        <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="cell" :class="{
                            dark: (rowIndex + cellIndex) % 2 === 0,
                            light: (rowIndex + cellIndex) % 2 !== 0,
                            highlight: validMoves.some(
                                (move) => move.row === rowIndex && move.cell === cellIndex
                            ),
                        }" @dragover.prevent @drop="onDrop($event, rowIndex, cellIndex)"
                            @dragstart="onDragStart($event, rowIndex, cellIndex)">
                            <!-- Utilizza PieceComponent per visualizzare le pedine -->
                            <PieceComponent v-if="cell" :color="cell.color" :isKing="cell.isKing" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sezione per la chat -->
            <div class="chat-section">
                <ChatComponent />
            </div>
        </div>
        <!-- Sezione per il messaggio di vittoria -->
        <VictoryComponent v-if="winner" :winner="winner" />
    </div>
</template>

<script>
import ChatComponent from "@/components/ChatComponent.vue"; // Importa il componente Chat
import EasyProfileComponent from "@/components/EasyProfileComponent.vue";
import MoveHistoryComponent from "@/components/MoveHistoryComponent.vue";
import PieceComponent from "@/components/PieceComponent.vue";
import PopUpComponent from "@/components/PopUpComponent.vue";
import TimeComponent from "@/components/TimeComponent.vue";
import VictoryComponent from "@/components/VictoryComponent.vue";

export default {
    name: "GameView",
    components: {
        PieceComponent,
        MoveHistoryComponent,
        VictoryComponent,
        ChatComponent,
        PopUpComponent,
        EasyProfileComponent,
        TimeComponent,
    }, // Aggiungi ChatComponent ai componenti
    props: {
        idGame: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            easyName: "",
            showEasy: false,
            board: this.initializeBoard(),
            moves: [],
            draggedPiece: null,
            validMoves: [],
            winner: null,
            currentTurn: "white", // Inizia con il turno dei bianchi
            errorMessage: "",
            showPopup: false,
            popupTitle: "",
            popupText: "",
            popupButton1: { label: "", link: "" },
            popupButton2: { label: "", link: "" },
        };
    },
    methods: {
        initializeBoard() {
            let board = [];
            for (let row = 0; row < 8; row++) {
                board[row] = [];
                for (let col = 0; col < 8; col++) {
                    if (row < 3 && (row + col) % 2 === 1) {
                        board[row][col] = { color: "black", isKing: false };
                    } else if (row > 4 && (row + col) % 2 === 1) {
                        board[row][col] = { color: "white", isKing: false };
                    } else {
                        board[row][col] = null;
                    }
                }
            }
            return board;
        },
        proposeDraw() {
            this.popupTitle = "Chiedi Patta";
            this.popupText = "Vuoi davvero chiedere patta?";
            this.popupButton1 = { label: "Conferma", link: "#" };
            this.popupButton2 = { label: "Annulla", link: "#" };
            this.showPopup = true;
        },
        resetTimer() {
            // Resetta il timer chiamando il metodo specifico del componente TimeComponent
            if (this.$refs.gameTimer) {
                this.$refs.gameTimer.reset();
            }
        },
        waitingDraw() {
            console.log("ciao");
            this.popupTitle = "Richiesta di Patta Inviata";
            console.log(this.popupTitle);
            this.popupText = "Aspettando la risposta del tuo avversario";
            console.log(this.popupText);
            this.popupButton1 = { label: "Conferma", link: "#" };
            console.log(this.popupButton1);
            this.popupButton2 = { label: "Annulla", link: "#" };
            console.log(this.popupButton2);
            this.showPopup = true;
            console.log(this.showPopup);
        },
        closeProfile() {
            console.log("close profile");
            this.showEasy = false;
        },
        resignGame() {
            this.popupTitle = "Abbandona Partita";
            this.popupText = "Sei sicuro di voler abbandonare la partita?";
            this.popupButton1 = { label: "Invia di Nuovo", link: "#" };
            this.popupButton2 = { label: "Annulla", link: "#" };
            this.showPopup = true;
        },
        handlePopupAction(action) {
            this.showPopup = false;
            console.log(action + " anction");
            if (action === "confirm") {
                console.log(this.popupTitle + " titolo");
                if (this.popupTitle === "Chiedi Patta") {
                    console.log("chiede patta")
                } else if (this.popupTitle === "Abbandona Partita") {
                    // Logica per abbandonare la partita
                    this.$router.push("/");
                } else if (this.popupTitle === "Richiesta di Patta Inviata") {
                    this.waitingDraw();
                }
            }
        },

        onDrop(event, rowIndex, cellIndex) {
            event.preventDefault();

            if (!this.draggedPiece) {
                console.error("Nessun pezzo da muovere.");
                return;
            }

            const pieceData = JSON.parse(
                event.dataTransfer.getData("application/json")
            );
            const { rowIndex: fromRow, cellIndex: fromCell } = this.draggedPiece;

            if (
                !this.isValidMove(fromRow, fromCell, rowIndex, cellIndex, pieceData)
            ) {
                console.error("Movimento non valido.");
                return;
            }

            const targetPiece = this.board[rowIndex][cellIndex];
            const midRow = (fromRow + rowIndex) / 2;
            const midCell = (fromCell + cellIndex) / 2;

            let moveDescription = `${pieceData.color.charAt(0).toUpperCase() + pieceData.color.slice(1)
                }: Ha mosso da (${fromRow}, ${fromCell}) a (${rowIndex}, ${cellIndex})`;

            // Rimuovi il pezzo avversario se presente e aggiorna la descrizione
            if (Number.isInteger(midRow) && Number.isInteger(midCell)) {
                const middlePiece = this.board[midRow] && this.board[midRow][midCell];
                if (middlePiece && middlePiece.color !== pieceData.color) {
                    this.board[midRow][midCell] = null; // Rimuovi il pezzo avversario
                    moveDescription += ` e ha mangiato una pedina avversaria`;
                }
            }

            if (targetPiece === null) {
                // Aggiorna il pezzo per includere la promozione a dama se necessario
                const updatedPieceData = {
                    ...pieceData,
                    isKing:
                        pieceData.isKing || this.isKingBase(pieceData.color, rowIndex),
                };
                this.board[rowIndex][cellIndex] = updatedPieceData;
                this.board[fromRow][fromCell] = null;
            } else {
                console.error("Cellula di destinazione occupata.");
                return;
            }

            this.draggedPiece = null;
            this.validMoves = []; // Ripristina le mosse valide

            // Aggiungi la descrizione alla lista delle mosse
            this.moves.push({
                turn: `T${this.moves.length + 1}`,
                details: moveDescription,
            });

            // Controlla se qualcuno ha vinto
            this.checkVictory();

            // Cambia il turno
            this.currentTurn = this.currentTurn === "white" ? "black" : "white";

            // Resetta il timer
            this.resetTimer();
        },
        setError(message) {
            this.errorMessage = message;
            setTimeout(() => (this.errorMessage = ""), 3000); // Nascondi il messaggio dopo 3 secondi
        },

        isKingBase(color, rowIndex) {
            return (
                (color === "white" && rowIndex === 0) ||
                (color === "black" && rowIndex === 7)
            );
        },

        onDragStart(event, rowIndex, cellIndex) {
            const piece = this.board[rowIndex][cellIndex];

            if (!piece || piece.color !== this.currentTurn) {
                console.error("Pezzo non valido per il drag.");
                return;
            }

            event.dataTransfer.setData(
                "application/json",
                JSON.stringify({
                    color: piece.color,
                    isKing: piece.isKing,
                })
            );
            this.draggedPiece = { rowIndex, cellIndex };

            // Calcola e imposta le mosse valide per il pezzo selezionato
            this.validMoves = this.calculateValidMoves(rowIndex, cellIndex, piece);
        },
        handleTimeUp() {
            // Il turno del giocatore corrente è scaduto
            this.winner = this.currentTurn === "white" ? "Black" : "White";
            // Aggiungi logica per gestire la fine del gioco (es. mostrare un messaggio)
          
         
        },

        isValidMove(
            fromRowIndex,
            fromCellIndex,
            targetRowIndex,
            targetCellIndex,
            pieceData
        ) {
            // Verifica che il pezzo appartenga al giocatore con il turno corrente
            if (pieceData.color !== this.currentTurn) {
                return false;
            }

            if (
                targetRowIndex < 0 ||
                targetRowIndex >= 8 ||
                targetCellIndex < 0 ||
                targetCellIndex >= 8
            ) {
                return false;
            }

            const piece = this.board[fromRowIndex][fromCellIndex];
            const targetPiece = this.board[targetRowIndex][targetCellIndex];

            if (targetPiece !== null) {
                return false;
            }

            const rowDiff = Math.abs(targetRowIndex - fromRowIndex);
            const cellDiff = Math.abs(targetCellIndex - fromCellIndex);

            if (pieceData.isKing) {
                if (rowDiff === cellDiff) {
                    if (rowDiff === 2) {
                        const midRow = (fromRowIndex + targetRowIndex) / 2;
                        const midCell = (fromCellIndex + targetCellIndex) / 2;
                        const middlePiece =
                            this.board[midRow] && this.board[midRow][midCell];
                        return middlePiece && middlePiece.color !== pieceData.color;
                    }
                    return true;
                }
                return false;
            }

            if (piece && !piece.isKing) {
                if (
                    (piece.color === "black" && targetRowIndex > fromRowIndex) ||
                    (piece.color === "white" && targetRowIndex < fromRowIndex)
                ) {
                    if (rowDiff === 2 && cellDiff === 2) {
                        const midRow = (fromRowIndex + targetRowIndex) / 2;
                        const midCell = (fromCellIndex + targetCellIndex) / 2;
                        const middlePiece =
                            this.board[midRow] && this.board[midRow][midCell];
                        return (
                            middlePiece &&
                            middlePiece.color !== piece.color &&
                            !middlePiece.isKing
                        );
                    }
                    return rowDiff === 1 && cellDiff === 1;
                }
            }

            return false;
        },

        calculateValidMoves(rowIndex, cellIndex, piece) {
            let validMoves = [];

            // Definisci le direzioni di movimento
            const directions = piece.isKing
                ? [
                    [-1, -1],
                    [-1, 1],
                    [1, -1],
                    [1, 1],
                ]
                : piece.color === "black"
                    ? [
                        [1, -1],
                        [1, 1],
                    ]
                    : [
                        [-1, -1],
                        [-1, 1],
                    ];

            // Per ogni direzione, calcola i movimenti
            directions.forEach(([rowDir, cellDir]) => {
                for (let steps = 1; steps < 8; steps++) {
                    const newRow = rowIndex + steps * rowDir;
                    const newCell = cellIndex + steps * cellDir;

                    if (newRow < 0 || newRow >= 8 || newCell < 0 || newCell >= 8) {
                        break; // Esci se fuori dai limiti della scacchiera
                    }

                    const targetPiece = this.board[newRow][newCell];

                    if (targetPiece === null) {
                        // La cella è vuota
                        if (steps === 1) {
                            // Movimento normale
                            validMoves.push({ row: newRow, cell: newCell, isJump: false });
                        }
                        // Continuare a cercare più movimenti normali
                    } else {
                        // La cella è occupata
                        if (targetPiece.color !== piece.color) {
                            // C'è un pezzo avversario
                            const jumpRow = newRow + rowDir;
                            const jumpCell = newCell + cellDir;

                            if (
                                jumpRow >= 0 &&
                                jumpRow < 8 &&
                                jumpCell >= 0 &&
                                jumpCell < 8 &&
                                this.board[jumpRow][jumpCell] === null
                            ) {
                                // Verifica se la cella dopo il pezzo avversario è vuota per il salto
                                validMoves.push({ row: jumpRow, cell: jumpCell, isJump: true });
                            }
                        }
                        break; // Interrompe il ciclo per questa direzione
                    }
                }
            });

            return validMoves;
        },

        checkVictory() {
            const whitePieces = this.board
                .flat()
                .filter((cell) => cell && cell.color === "white").length;
            const blackPieces = this.board
                .flat()
                .filter((cell) => cell && cell.color === "black").length;

            if (whitePieces === 0) {
                this.winner = "Black";
            } else if (blackPieces === 0) {
                this.winner = "White";
            }
        },

        viewOpponentProfile() {
            this.showEasy = true;
            this.easyName = "Goffredo";

            // Implementa la logica per visualizzare il profilo dell'avversario
        },
    },
};
</script>

<style scoped>
.game-view {
    font-family: Arial, sans-serif;
}

.header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background-color: #4caf50;
    color: white;
}

.header h1 {
    margin: 0;
    font-size: 1.5em;
}

.error-message {
    color: red;
    font-weight: bold;
}

.actions {
    margin-top: 10px;
}

.actions button {
    margin: 0 5px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: #4caf50;
    cursor: pointer;
}

.actions button:hover {
    background-color: #4d9b50;
}

.container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    /* 1 frazione per le sezioni laterali e 2 frazioni per la scacchiera */
    gap: 20px;
    margin: 20px auto;
}

.moves-section,
.chat-section {
    padding: 20px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
}

.board-section {
    display: flex;
    justify-content: center;
    align-items: center;
}

.board {
    display: grid;
    grid-template-columns: repeat(8, 50px);
    grid-template-rows: repeat(8, 50px);
    border: 2px solid #000;
}

.row {
    display: contents;
    /* Assicura che i figli della griglia non creino righe separate */
}

.cell {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    /* Necessario per posizionare correttamente i pezzi */
    cursor: pointer;
    /* Aggiunto per rendere le celle cliccabili */
}

.cell .piece {
    width: 80%;
    height: 80%;
    position: absolute;
    /* Posizionamento assoluto per centrare il pezzo nella cella */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* Centratura del pezzo */
}

.dark {
    background-color: #333;
}

.light {
    background-color: #ddd;
}

.highlight {
    background-color: rgba(255, 255, 0, 0.5);
    /* Colore di sfondo giallo semi-trasparente per evidenziare */
    border: 2px solid yellow;
    /* Bordo giallo per evidenziare ulteriormente */
}

.turn-indicator {
    margin-top: 10px;
    font-size: 1.2em;
    font-weight: bold;
    color: #fff;
}

.white-turn {
    color: #f0f0f0;
    /* Colore chiaro per il turno dei bianchi */
    background-color: #4caf50;
    /* Colore di sfondo verde per il turno dei bianchi */
    padding: 5px 10px;
    border-radius: 5px;
}

.black-turn {
    color: #fff;
    background-color: #4caf50;
    /* Colore di sfondo scuro per il turno dei neri */
    padding: 5px 10px;
    border-radius: 5px;
}
</style>

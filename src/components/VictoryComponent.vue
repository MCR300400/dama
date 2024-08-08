<template>
    <div class="victory-message">
        <h2>Vittoria!</h2>
        <p>Il vincitore è: {{ winner.charAt(0).toUpperCase() + winner.slice(1) }}!</p>
        <button @click="goHome">Torna alla Homepage</button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    name: 'VictoryComponent',
    props: {
        winner: {
            type: String,
            required: true
        }
    },
    setup() {
        const router = useRouter();

        const goHome = () => {
            router.push('/');
        };

        return {
            goHome
        };
    }
}
</script>

<style scoped>
.victory-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7); /* Sfondo semitrasparente */
    color: #fff;
    z-index: 9999; /* Assicurati che sia sopra tutto il resto */
    font-family: 'Arial', sans-serif;
}

.victory-message h2 {
    margin: 0;
    font-size: 3em;
    color: #4CAF50; /* Verde per la vittoria */
}

.victory-message p {
    font-size: 2em;
}

.victory-message button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1.2em;
    color: #fff;
    background-color: #4CAF50;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.victory-message button:hover {
    background-color: #45a049;
}
</style>

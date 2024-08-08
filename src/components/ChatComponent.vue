<template>
    <div class="chat">
      <div class="messages">
        <div v-for="(message, index) in messages" 
             :key="index" 
             :class="['message', message.user === 'Tu' ? 'my-message' : 'opponent-message']">
          <strong>{{ message.user }}:</strong> {{ message.text }}
        </div>
      </div>
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Scrivi un messaggio..." />
    </div>
</template>

<script>
export default {
    data() {
        return {
            messages: [
                { user: 'Avversario', text: 'Ciao! Buona partita!' }
            ],
            newMessage: ''
        };
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim()) {
                this.messages.push({ user: 'Tu', text: this.newMessage });
                this.newMessage = '';
                // Simula una risposta automatica
                setTimeout(() => {
                    this.messages.push({ user: 'Avversario', text: 'Bel movimento!' });
                }, 1000);
            }
        }
    }
}
</script>

<style scoped>
.chat {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: 300px; /* Limita l'altezza totale della chat */
}

.messages {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    max-height: 250px; /* Limita l'altezza della lista di messaggi */
}

.message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    max-width: 60%;
    word-wrap: break-word;
    display: inline-block;
}

/* Messaggi dell'utente - Allineati a destra */
.my-message {
    background-color: #fff;
    color: #000;
    align-self: flex-end; /* Allinea i tuoi messaggi a destra */
    text-align: right; /* Testo allineato a destra */
}

/* Messaggi dell'avversario - Allineati a sinistra */
.opponent-message {
    background-color: #28a745;
    color: #fff;
    align-self: flex-start; /* Allinea i messaggi dell'avversario a sinistra */
    text-align: left; /* Testo allineato a sinistra */
}

input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    max-width: 100%;
    box-sizing: border-box;
}
</style>

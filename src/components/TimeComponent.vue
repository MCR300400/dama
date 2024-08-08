<template>
    <div class="timer">
      <p>{{ formattedTime }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "TimerComponent",
    props: {
      minutes: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        initialTime: this.minutes * 60, // tempo iniziale in secondi
        timeRemaining: this.minutes * 60, // tempo residuo in secondi
        intervalId: null,
      };
    },
    computed: {
      formattedTime() {
        const mins = Math.floor(this.timeRemaining / 60);
        const secs = this.timeRemaining % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      },
    },
    methods: {
      startTimer() {
        this.stopTimer(); // Assicurati di fermare eventuali timer precedenti
        this.intervalId = setInterval(() => {
          if (this.timeRemaining > 0) {
            this.timeRemaining--;
          } else {
            this.stopTimer();
            this.$emit('time-up');
          }
        }, 1000);
      },
      stopTimer() {
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
      },
      reset() {
        this.stopTimer(); // Ferma il timer attuale
        this.timeRemaining = this.initialTime; // Riporta il tempo residuo al tempo iniziale
        this.startTimer(); // Avvia un nuovo timer
      },
    },
    watch: {
      minutes: {
        immediate: true,
        handler(newValue) {
          this.initialTime = newValue * 60; // aggiorna il tempo iniziale
          this.reset(); // Riavvia il timer quando i minuti cambiano
        },
      },
    },
    beforeUnmount() {
      this.stopTimer(); // Pulisce l'intervallo quando il componente viene distrutto
    },
  };
  </script>
  
  <style scoped>
  .timer {
    font-family: Arial, sans-serif;
    font-size: 2em;
    text-align: center;
  }
  </style>
  
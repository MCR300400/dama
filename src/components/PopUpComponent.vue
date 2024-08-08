<template>
    <div class="popup-overlay" v-if="isVisible">
      <div class="popup">
        <div class="popup-header">
          <h2>{{ titolo }}</h2>
          <!-- Rimuovi il pulsante di chiusura -->
        </div>
        <div class="popup-body">
          <p>{{ testo }}</p>
        </div>
        <div class="popup-footer">
          <button v-if="bottone1" @click="handleButtonClick(bottone1.link, 'bottone1')">{{ bottone1.label }}</button>
          <button v-if="bottone2" @click="handleButtonClick(bottone2.link, 'bottone2')">{{ bottone2.label }}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PopUpComponent',
    props: {
      titolo: {
        type: String,
        required: true
      },
      testo: {
        type: String,
        required: true
      },
      bottone1: {
        type: Object,
        default: () => ({ label: '', link: '' })
      },
      bottone2: {
        type: Object,
        default: () => ({ label: '', link: '' })
      }
    },
    data() {
      return {
        isVisible: true
      };
    },
    methods: {
      closePopup() {
        this.isVisible = false;
        this.$emit('popupClosed');
      },
      handleButtonClick(link, buttonType) {
        if (link) {
          window.location.href = link;
        }
        this.$emit(`${buttonType}Click`);
        this.closePopup();
      }
    }
  };
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Assicurati che sia sopra tutto il resto */
  }
  
  .popup {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 500px;
    z-index: 10000; /* Assicurati che sia sopra l'overlay */
  }
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .popup-header h2 {
    margin: 0;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  
  .popup-body {
    margin: 20px 0;
  }
  
  .popup-footer {
    display: flex;
    justify-content: space-between;
  }
  
  .popup-footer button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .popup-footer button:hover {
    background-color: #45a049;
  }
  </style>
  
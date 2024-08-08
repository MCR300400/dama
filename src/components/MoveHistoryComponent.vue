<template>
    <div class="move-history">
      <h2>Storico Mosse</h2>
      <ul>
        <li v-for="(move, index) in moves" :key="index">
          <span>{{ move.turn }}:</span>
          <span>{{ move.details }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MoveHistoryComponent',
    props: {
      moves: {
        type: Array,
        required: true,
        validator(value) {
          // Verifica che ogni elemento dell'array sia un oggetto con le proprietà `turn` e `details`
          return value.every(move => 
            typeof move.turn === 'string' && typeof move.details === 'string'
          );
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .move-history {
      padding: 20px;
      border: 1px solid #ddd;
      background-color: #f9f9f9;
      max-height: 300px;
      overflow-y: auto;
  }
  
  .move-history h2 {
      margin-top: 0;
  }
  
  .move-history ul {
      list-style-type: none;
      padding: 0;
  }
  
  .move-history li {
      margin-bottom: 10px;
      font-family: Arial, sans-serif;
      font-size: 0.8em; /* Riduci la dimensione del testo */
  }
  </style>
  
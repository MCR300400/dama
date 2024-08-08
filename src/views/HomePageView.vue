<template>
    <div class="home-page">
      <header class="header">
        <h1>Benvenuti a Dama Online</h1>
        <nav class="nav">
          <router-link to="/rules">Regole</router-link>
    
          <router-link to="/contact">Contatti</router-link>
        </nav>
      </header>
  
      <section class="intro">
        <h2>Gioca a Dama Online</h2>
        <p>Unisciti alla nostra comunità e gioca a dama contro avversari di tutto il mondo.</p>
      </section>
  
      <section class="quick-game">
        <h2>Gioco Rapido</h2>
        <button @click="startQuickGame">Inizia una Partita</button>
      </section>
  
      <footer class="footer">
        <p>&copy; 2024 Dama Online. Tutti i diritti riservati.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePageView',
    methods: {
  startQuickGame() {
    // Genera un numero casuale intero tra 1 e 1000 (puoi cambiare l'intervallo come desideri)
    let randomNumber = Math.floor(Math.random() * 1000) + 1;
    
    // Costruisce il percorso con il numero casuale
    let path = `/game/${randomNumber}`;
    
    // Naviga al nuovo percorso
    this.$router.push(path);
  }
}

  }
  </script>
  
  <style scoped>
  .home-page {
    text-align: center;
    font-family: Arial, sans-serif;
  }
  
  .header {
    background-color: #4CAF50;
    color: white;
    padding: 15px 0;
  }
  
  .nav {
    margin: 20px 0;
  }
  
  .nav a {
    color: white;
    margin: 0 15px;
    text-decoration: none;
  }
  
  .intro {
    margin: 40px 0;
  }
  
  .quick-game {
    margin: 40px 0;
  }
  
  .quick-game button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .quick-game button:hover {
    background-color: #45a049;
  }
  
  .footer {
    margin-top: 40px;
    background-color: #f1f1f1;
    padding: 10px 0;
  }
  </style>
  
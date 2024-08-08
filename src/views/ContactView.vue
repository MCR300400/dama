<template>
    <div class="contact-page">
      <header class="header">
        <h1>Contatti</h1>
        <router-link to="/">Home</router-link>
      </header>
  
      <section class="intro">
        <h2>Contatta i Creatori</h2>
        <p>Hai domande, suggerimenti o feedback? Sentiti libero di contattarci utilizzando le informazioni qui sotto.</p>
      </section>
  
      <section class="contact-info">
        <h3>Informazioni di Contatto</h3>
        <ul>
          <li>Email: <a href="mailto:info@damaonline.com">info@damaonline.com</a></li>
          <li>Telefono: +39 123 456 7890</li>
          <li>Indirizzo: Via Roma 123, 00100 Roma, Italia</li>
        </ul>
      </section>
  
      <section class="contact-form">
        <h3>Modulo di Contatto</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" id="name" v-model="name" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="message">Messaggio:</label>
            <textarea id="message" v-model="message" required></textarea>
          </div>
          <button type="submit">Invia</button>
        </form>
      </section>
  
      <footer class="footer">
        <p>&copy; 2024 Dama Online. Tutti i diritti riservati.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ContactView',
    data() {
      return {
        name: '',
        email: '',
        message: ''
      };
    },
    methods: {
      submitForm() {
        // Logica per gestire l'invio del modulo
        alert(`Messaggio inviato da ${this.name} (${this.email}): ${this.message}`);
        // Resetta i campi del modulo
        this.name = '';
        this.email = '';
        this.message = '';
      }
    }
  }
  </script>
  
  <style scoped>
  .contact-page {
    text-align: left;
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  .header {
    background-color: #4CAF50;
    color: white;
    padding: 15px;
    text-align: center;
  }
  
  .header a {
    color: white;
    margin-left: 20px;
    text-decoration: none;
  }
  
  .intro {
    margin: 20px 0;
  }
  
  .contact-info {
    margin: 20px 0;
  }
  
  .contact-info ul {
    list-style-type: none;
    padding: 0;
  }
  
  .contact-info li {
    margin: 10px 0;
  }
  
  .contact-form {
    margin: 20px 0;
  }
  
  .form-group {
    margin: 10px 0;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  
  .button:hover {
    background-color: #45a049;
  }
  
  .footer {
    margin-top: 40px;
    background-color: #f1f1f1;
    padding: 10px 0;
    text-align: center;
  }
  </style>
  
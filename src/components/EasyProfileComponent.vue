<template>
    <div class="overlay">
      <div class="profile-window">
        <div class="profile-header">
          <img :src="profileImage" alt="Immagine profilo" class="profile-image" />
          <h2 class="profile-name">{{ profileName }}</h2>
          <span class="profile-tag">{{ profileTag }}</span>
        </div>
        <p class="profile-description">{{ profileDescription }}</p>
        <div class="profile-awards">
          <h3>Premi</h3>
          <div class="awards-list">
            <img v-for="(award, index) in profileAwards" 
                 :key="index" 
                 :src="award.image" 
                 :alt="award.name" 
                 class="award-image" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "EasyProfileComponent",
    props: {
      profileName: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        profileImage: "https://via.placeholder.com/80", // Immagine fittizia
        profileTag: "@fictitious_tag", // Tag fittizio
        profileDescription: "Questa è una descrizione fittizia del profilo.", // Descrizione fittizia
        profileAwards: [ // Premi fittizi
          { name: "Premio 1", image: "https://via.placeholder.com/50" },
          { name: "Premio 2", image: "https://via.placeholder.com/50" },
          { name: "Premio 3", image: "https://via.placeholder.com/50" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Sfondo semi-trasparente */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Alto valore per posizionare sopra tutto */
  }
  
  .profile-window {
    width: 300px;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .profile-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .profile-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
  }
  
  .profile-name {
    margin: 0;
    font-size: 1.5em;
  }
  
  .profile-tag {
    font-size: 0.9em;
    color: #777;
  }
  
  .profile-description {
    font-size: 1em;
    margin: 20px 0;
    text-align: center;
  }
  
  .profile-awards {
    text-align: center;
  }
  
  .awards-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .award-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
  }
  </style>
  
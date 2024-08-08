<template>
    <div class="rules">
        <header class="header">
            <h1>Regole del Gioco della Dama</h1>
            <nav class="nav">
                <router-link to="/">Home</router-link>
            </nav>
        </header>

        <section class="content">
            <h2>Introduzione</h2>
            <p>La dama è un gioco da tavolo per due giocatori, ciascuno con 12 pezzi su una scacchiera 8x8. L'obiettivo
                è catturare tutti i pezzi dell'avversario o bloccarli in modo che non possano muovere.</p>

            <h2>Preparazione</h2>
            <ul>
                <li>La scacchiera è posizionata in modo che ogni giocatore abbia una casella bianca nell'angolo in basso
                    a destra.</li>
                <li>Ogni giocatore dispone i propri pezzi sulle prime tre righe di caselle scure davanti a sé.</li>
            </ul>

            <h2>Movimento dei Pezzi</h2>
            <ul>
                <li>I pezzi si muovono diagonalmente in avanti sulle caselle scure di un solo spazio.</li>
                <li>Quando un pezzo raggiunge l'ultima riga opposta, viene promosso a "dama" e può muoversi sia in
                    avanti che indietro.</li>
            </ul>

            <h2>Cattura dei Pezzi</h2>
            <ul>
                <li>Se un pezzo avversario si trova in diagonale adiacente e la casella successiva è vuota, puoi saltare
                    sopra il pezzo avversario e catturarlo.</li>
                <li>Le catture multiple sono obbligatorie quando disponibili.</li>
            </ul>

            <h2>Vittoria</h2>
            <ul>
                <li>Vince il giocatore che cattura tutti i pezzi dell'avversario o lo blocca completamente.</li>
            </ul>
        </section>

        <footer class="footer">
            <p>&copy; 2024 Dama Online. Tutti i diritti riservati.</p>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'RulesView'
}
</script>

<style scoped>
.rules {
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

.nav {

}

.nav a {
    color: white;
    text-decoration: none;
}

.content {
    margin: 20px 0;
}

.content h2 {
    color: #333;
    margin-top: 20px;
}

.content ul {
    list-style-type: disc;
    margin-left: 20px;
}

.footer {
    margin-top: 40px;
    background-color: #f1f1f1;
    padding: 10px 0;
    text-align: center;
}
</style>
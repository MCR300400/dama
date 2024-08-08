<template>
    <div
      class="piece"
      :class="[color, { king: isKing }]"
      draggable="true"
      @dragstart="onDragStart"
    />
</template>

<script>
export default {
    name: 'PieceComponent',
    props: {
        color: {
            type: String,
            required: true
        },
        isKing: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onDragStart(event) {
            event.dataTransfer.setData('application/json', JSON.stringify({
                color: this.color,
                isKing: this.isKing
            }));
            event.dataTransfer.effectAllowed = 'move';
        }
    }
}
</script>

<style scoped>
.piece {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.piece.black {
    background-color: black;
}

.piece.white {
    background-color: white;
}

.piece.king {
    border: 2px solid gold; /* Bordi per i pezzi dama */
}

.piece.black.king {
    background-color: purple; /* Colore per i pezzi dama neri */
}

.piece.white.king {
    background-color: gold; /* Colore per i pezzi dama bianchi */
}
</style>

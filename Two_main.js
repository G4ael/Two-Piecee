let des =document.getElementById('des').getContext('2d')

let player = new Player(100,450,120,150,'./assets/mago_1.png')
let text1 = new Text(100,100,50,50,'red') 
let text2 = new Text(100,100,50,50,'red') 
let text3 = new Text(100,100,50,50,'red') 
let text4 = new Text(100,100,50,50,'red')
let text5 = new Text(100,100,50,50,'red')

let spell = new Audio('assets/spell.mp3')
spell.volume = 1

const sondtrack_2 = new Audio('')
const sondtrack_3 = new Audio('')
const sondtrack_4 = new Audio('')
const sondtrack_5 = new Audio('')

let jogar = true

function game_over(){
    if(player.vida <=0){
        jogar = false
    }
}

//tiro
document.addEventListener('click', (event) => {
    spell.play()
    const mouseX = event.clientX
    const mouseY = event.clientY
    const angle = Math.atan2(mouseY - (player.y + player.h/2), mouseX - (player.x + player.w/2))
    const velocity = 5; // velocidade do tiro
    const velX = Math.cos(angle) * velocity
    const velY = Math.sin(angle) * velocity
    grupoTiros.push(new Tiro(player.x - 40 + player.w, player.y - 40, 40, 40, './assets/tiro_1.png', velX, velY));
})

let grupoTiros = [] 
let grupoTirosInimigo = []
let tiros = {
    des(){
        grupoTiros.forEach((tiro)=>{
            tiro.des_tiro()
        })
        grupoTirosInimigo.forEach((tiro)=>{
            tiro.des_tiro()
        })
    },
    atual(){
        grupoTiros.forEach((tiro)=>{
            tiro.mov()
            if(tiro.y <= -10){
                grupoTiros.splice(tiro[0],1)
                // anim aqui 
            }

            if(tiro.colid(player) && tiro.a !== player.a){
                player.vida -= 1; // Reduz a vida do jogador em 1 se ele for atingido por um tiro
                grupoTiros.splice(grupoTiros.indexOf(tiro), 1); // Remove o tiro da lista
            }

            // Verifica colisão entre o tiro do jogador e os tiros dos inimigos
            grupoTirosInimigo.forEach((tiroInimigo, index) => {
                if (tiro.colid(tiroInimigo)) {
                    grupoTiros.splice(grupoTiros.indexOf(tiro), 1); // Remove o tiro do jogador
                    grupoTirosInimigo.splice(index, 1); // Remove o tiro do inimigo
                }
            })
        })
        //Ou aqui

        

        grupoTirosInimigo.forEach((tiro)=>{
            tiro.mov()
            if(tiro.y >= 630){
                grupoTirosInimigo.splice(tiro[0],1)
            }

            if(tiro.colid(player)){
                player.vida -= 1; // Reduz a vida do jogador em 1 se ele for atingido por um tiro inimigo
                grupoTirosInimigo.splice(grupoTirosInimigo.indexOf(tiro), 1); // Remove o tiro inimigo da lista
            }
        })
    }
}

let grupoInimigo = []
let inimigo = {
    time1: 0, 
    time2: 0,
    time3: 0,

    criaInimigo(){
        this.time1 += 0.5
        this.time2 += 0.5
        this.time3 += 0.5
        let pos_x = (Math.random() * (900 - 2 +1)+2)
        let pos_x2 = (Math.random() * (900 - 2 +1)+2)
        let pos_x3 = (Math.random() * (900 - 2 +1)+2)
        if(this.time1 >=60){
            this.time1 = 0
            grupoInimigo.push(new Inimigo(pos_x,-200,50,50,'assets/bat_1.png'))
            console.log(grupoInimigo)
        }
        if(this.time2 >=85){
            this.time2 = 0
            grupoInimigo.push(new Inimigo(pos_x2,-300,50,50,'yellow'))
            console.log(grupoInimigo)
        }
        if(this.time3 >=135){
            this.time3 = 0
            grupoInimigo.push(new Inimigo(pos_x3,-400,50,50,'yellow'))
            console.log(grupoInimigo)
        }
    },
    des(){
        grupoInimigo.forEach((inimigo)=>{
            inimigo.des_obj()
        })
    },
    destroiInimigo(){
        grupoTiros.forEach((tiro)=>{
            grupoInimigo.forEach((inimigo)=>{
                if(tiro.colid(inimigo)){
                    grupoTiros.splice(grupoTiros.indexOf(tiro), 1)
                    grupoInimigo.splice(grupoInimigo.indexOf(inimigo), 1)
                    player.pts += 1
                }
            })
        })
    },
    atual(){
        this.criaInimigo()
        this.destroiInimigo()
        grupoInimigo.forEach((inimigo)=>{
            inimigo.mov()
            inimigo.atual_inimigo()
        })
    }
}


document.addEventListener('keydown',(e)=>{
    if(e.key === 'a'){
        player.dir = -15; 

    } else if(e.key === 'd'){
        player.dir = 15;
    }
});

document.addEventListener('keyup', (e)=>{
    if(e.key === 'a' || e.key === 'd'){
        player.dir = 0; // Parando o movimento quando a tecla for liberada
    }
});


function desenha(){
    text1.des_text('Pontos: ',760, 20, 'White', '26px Times')
    text2.des_text('Vida: ',30, 20, 'White', '26px Times')
    text3.des_text(player.pts, 850, 21, 'White', '26px Times')
    text4.des_text(player.vida,100, 21, 'White', '26px Times')

    if(jogar){
        player.des_img()
        inimigo.des()
        tiros.des()
    }else{
        text5.des_text('Game Over',350, 330, 'White', '55px Times')
    }

    
}

function atualiza(){

    if(jogar){
        player.mov()
        player.anim('mago_')
        inimigo.atual()
        tiros.atual()
        game_over()
    }
}

function main(){
    des.clearRect(0,0,950,630)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()
let des =document.getElementById('des').getContext('2d')

let player = new Player(100,500,60,70,'./assets/frente.png')
let text1 = new Text() 
let text2 = new Text() 
let text3 = new Text() 
let text4 = new Text()
let text5 = new Text()
let linha1 = new Obj(900, 0, 10, 580)
let linha2 = new Obj(0, 570, 1350, 100)
//mudar o nome das variaveis ex: text_life
const sondtrack_1 = new Audio('')
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
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const angle = Math.atan2(mouseY - (player.y + player.h/2), mouseX - (player.x + player.w/2));

    const velocity = 5; // velocidade do tiro

    const velX = Math.cos(angle) * velocity;
    const velY = Math.sin(angle) * velocity;

    grupoTiros.push(new Tiro(player.x - 40 + player.w, player.y - 40, 30, 30, './assets/tiro.png', velX, velY));
});

let grupoTiros = [] 
let grupoTirosInimigo = [] // Novo array para os tiros dos inimigos
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


            }

            if (tiro.colid(linha1)) {
                grupoTiros.splice(grupoTiros.indexOf(tiro), 1);}

            
        
                


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
            });
        })

        grupoTirosInimigo.forEach((tiro)=>{
            tiro.mov()
            if(tiro.y >= 530){
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
        let pos_x = (Math.random() * (835 - 2 +1)+2)
        let pos_x2 = (Math.random() * (835 - 2 +1)+2)
        let pos_x3 = (Math.random() * (835 - 2 +1)+2)
        if(this.time1 >=60){
            this.time1 = 0
            grupoInimigo.push(new Inimigo(pos_x,-200,50,50,'yellow'))
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
    // console.log(e.key)
    if(e.key === 'a'){
        player.dir -= 5
    }else if(e.key === 'd'){
        player.dir += 5
    }
})
document.addEventListener('keyup', (e)=>{
    if(e.key === 'a'){
        player.dir = 0
    }else if(e.key === 'd'){
        player.dir = 0
    }
})



function desenha(){
    text1.des_text('Pontos: ',950, 80, 'White', '26px Times')
    text2.des_text('Vida: ',950, 150, 'White', '26px Times')
    text3.des_text(player.pts, 1040, 80, 'White', '26px Times')
    text4.des_text(player.vida,1020, 150, 'White', '26px Times')
    linha1.des_obj()
    linha2.des_obj()
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
        inimigo.atual()
        tiros.atual()
        game_over()
    }
}

function main(){
    des.clearRect(0,0,1300,600)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()
class Obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }
    des_obj(){
        des.fillStyle = this.a
        des.fillRect(this.x,this.y,this.w,this.h,this.a)
    }

    des_img(){
        let img = new Image()
        img.src = this.a
        des.drawImage(img,this.x, this.y, this.w, this.h)
    }

    colid(objeto) {
        if((this.x < objeto.x + objeto.w)&&
            (this.x + this.w > objeto.x)&&
            (this.y < objeto.y + objeto.h)&&
            (this.y + this.h > objeto.y)){
            return true     
        }else{
            return false
        }
    }

}

class Player extends Obj{
    dir = 0
    pts = 0
    vida = 5

    mov(){
        this.x += this.dir
        if(this.x <= 0){
            this.x = 0
        }else if(this.x >= 900){
            this.x = 900
        }
    }
    
}

class Inimigo extends Obj{
    vida_inimigo = 5
    pararY = 180  // posição onde o inimigo vai parar
    tempoProximoTiro = Math.random() * 100 // tempo até o próximo tiro do inimigo
    intervaloTiro = 60 // intervalo de tempo entre os tiros dos inimigos
    tempoTiro = 0

    atual_inimigo(){
        if(this.y <= this.pararY){
            this.y += 0.5
        }else if(this.vida_inimigo <= 0){
            this.recomeca()
        }

        this.tempoTiro++
        if(this.tempoTiro >= this.tempoProximoTiro){
            this.tempoTiro = 0
            this.atira()
            this.tempoProximoTiro = Math.random() * 350 // define um novo tempo para o próximo tiro
        }
    }
    recomeca(){
        this.y = -100
        this.x = Math.floor(Math.random() * ((950 - 2 + 1) + 2)) // quando o inimigo morrer
    }

    vel = Math.random() * (2 - 0.5) + 0.5

    mov(){
        if(this.y <= this.pararY){
            this.y += 0.5
        }

    }

    atira(){
        grupoTirosInimigo.push(new TiroInimigo(this.x - 40 + this.w, this.y + 40, 30, 40, './assets/tiro.png')) 
    }
}

class Tiro extends Obj{
    constructor(x,y,w,h,a,velX,velY){
        super(x,y,w,h,a);
        this.velX = velX;
        this.velY = velY;
    }

    mov(){
        this.x += this.velX;
        this.y += this.velY;
    }
    des_tiro(){
        let img = new Image()
        img.src = this.a
        des.drawImage(img,this.x, this.y, this.w, this.h)
    }
}

class TiroInimigo extends Obj{
    des_tiro(){
        let img = new Image()
        img.src = this.a
        des.drawImage(img,this.x, this.y, this.w, this.h)
    }

    mov(){
        this.y += 3
    }
}

class Arma extends Obj{
}

class Text{
    //arrumar o text depois
    des_text(text,x,y,cor,font){
        des.fillStyle = cor
        des.lineWidth = '5'
        des.font = font
        des.fillText(text,x,y)
    }
}
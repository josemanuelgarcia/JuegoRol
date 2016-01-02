var Octorok = cc.Class.extend({
    //Variables de clase
    animMoverArriba: null,
    animMoverAbajo: null,
    animMoverDerecha: null,
    animMoverIzquierda: null,
    animDispararArriba: null,
    animDispararAbajo: null,
    animDispararDerecha: null,
    animDispararIzquierda: null,
    tiempoEntreDisparos: null,
    tiempoUltimoDisparo: 0,
    space: null,
    layer: null,
    sprite: null,
    body: null,
    shape: null,
    velMovimiento: 40,
    tiempoMovimiento: 0,
    animaciones:[],
    tiempoEntreMovimientos: null,
    //Orientacion hacia el que esta mirando y a donde va a disparar
    orientacion: "ABAJO",

    ctor: function (space, posicion, layer) {
        this.space = space;
        this.layer = layer;

        //Primera prueba: que dispare cada cierto tiempo
        this.tiempoEntreDisparos = 5  + Math.floor(Math.random() * 2);
        this.tiempoEntreMovimientos = 4 + Math.floor(Math.random() * 2);

        this.sprite = new cc.PhysicsSprite("#Octorok_abajo0.png");

        // Cuerpo dinamico, SI le afectan las fuerzas
        this.body = new cp.Body(100, Infinity);

        this.body.setPos(posicion);
        this.body.setAngle(0);
        this.body.e = 0;

        this.sprite.setBody(this.body);
        // Se añade el cuerpo al espacio
        this.space.addBody(this.body);

        // forma
        this.shape = new cp.BoxShape(this.body,
            this.sprite.getContentSize().width,
            this.sprite.getContentSize().height);
        // forma dinamica
        this.shape.setCollisionType(tipoOctorok);
        this.space.addShape(this.shape);

        //Añadir las animaciones de octorok
        animationManager.addAnimationsOctorok(this);

        this.layer.mapa.addChild(this.sprite, 2);
        return true;


    }, update: function (dt) {
        // aumentar el tiempo que ha pasado desde el ultimo disparo
        this.tiempoUltimoDisparo = this.tiempoUltimoDisparo + dt;

        // Dispara si el tiempo ha pasado
        if (this.tiempoUltimoDisparo > this.tiempoEntreDisparos && this.shape !=null) {
            this.tiempoUltimoDisparo = 0;
            this.disparar();
        }

        //aumentamos el tiempo del movimiento
        this.tiempoMovimiento = this.tiempoMovimiento + dt;
        if (this.tiempoMovimiento > this.tiempoEntreMovimientos) {
             this.sprite.stopAllActions();
             var random = Math.floor(Math.random() * 4);
             switch(random) {
                 case 0:
                     this.moverDerecha();
                     break;
                 case 1:
                    this.moverAbajo();
                    break;
                 case 2:
                    this.moverIzquierda();
                    break;
                 case 3:
                    this.moverArriba();
                    break;
             }
             /*
            if (this.orientacion == "ARRIBA") {
                this.moverDerecha();
            } else if (this.orientacion == "DERECHA") {
                this.moverAbajo();
            } else if (this.orientacion == "ABAJO") {
                this.moverIzquierda();
            } else {
                this.moverArriba();
            }
            */
            this.tiempoMovimiento = 0;
        }

    }, moverArriba: function () {
        this.orientacion = "ARRIBA";
        this.sprite.runAction(this.animaciones["MOVER_"+this.orientacion]);
        this.body.setVel(cp.v(0, this.velMovimiento));

    }, moverAbajo: function () {
        this.orientacion = "ABAJO";
        this.sprite.runAction(this.animaciones["MOVER_"+this.orientacion]);
        this.body.setVel(cp.v(0, -this.velMovimiento));

    }, moverDerecha: function () {
        this.orientacion = "DERECHA";
        this.sprite.runAction(this.animaciones["MOVER_"+this.orientacion]);
        this.body.setVel(cp.v(this.velMovimiento, 0));

    }, moverIzquierda: function () {
        this.orientacion = "IZQUIERDA";
        this.sprite.runAction(this.animaciones["MOVER_"+this.orientacion]);
        this.body.setVel(cp.v(-this.velMovimiento, 0));

    }, disparar: function () {
        this.body.setVel(cp.v(0,0));
        this.sprite.runAction(this.animaciones["DISPARAR_"+this.orientacion]);
/*
        if (this.orientacion == "ARRIBA") {
            this.sprite.runAction(animationManager.obtainAnimation("DISPARAR"+this.orientacion));
        }
        if (this.orientacion == "DERECHA") {
            this.sprite.runAction(this.animDispararDerecha);
        }
        if (this.orientacion == "IZQUIERDA") {
            this.sprite.runAction(this.animDispararIzquierda);
        }
        if (this.orientacion == "ABAJO") {
            this.sprite.runAction(this.animDispararAbajo);
        }*/

    }, crearDisparo:function(){
       //Crear el disparo
        var disparo;
            if (this.orientacion == "ARRIBA") {
                 disparo = new DisparoOctorok(this.space,
                                    cc.p(this.body.p.x, this.body.p.y+this.sprite.getContentSize().height/2), this.layer, this.orientacion);
            } else if (this.orientacion == "DERECHA") {
                disparo = new DisparoOctorok(this.space,
                                   cc.p(this.body.p.x+this.sprite.getContentSize().width/2, this.body.p.y), this.layer, this.orientacion);
            } else if (this.orientacion == "IZQUIERDA") {
                 disparo = new DisparoOctorok(this.space,
                                    cc.p(this.body.p.x-this.sprite.getContentSize().width/2, this.body.p.y), this.layer, this.orientacion);
            } else if (this.orientacion == "ABAJO") {
                 disparo = new DisparoOctorok(this.space,
                                    cc.p(this.body.p.x, this.body.p.y-this.sprite.getContentSize().height/2), this.layer, this.orientacion);
            }

            this.layer.disparosEnemigos.push(disparo);

    }, haChocado: function () {
        if (this.orientacion == "ARRIBA") {
            this.moverAbajo();
        }
        if (this.orientacion == "DERECHA") {
            this.moverIzquierda()
        }
        if (this.orientacion == "IZQUIERDA") {
            this.moverDerecha()
        }
        if (this.orientacion == "ABAJO") {
            this.moverArriba();
        }

        this.tiempoEntreMovimientos = 0;
    }, eliminar:function () {
        // quita la forma
        this.space.removeShape(this.shape);
        // quita el sprite
        this.layer.mapa.removeChild(this.sprite);
     }
});
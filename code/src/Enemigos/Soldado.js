var Soldado = cc.Class.extend({
    space:null,
    layer:null,
    sprite:null,
    body:null,
    shape:null,
    orientacion:"ABAJO",
    velMovimiento:50,
    animMoverArriba:null,
    animMoverAbajo:null,
    animMoverDereha:null,
    animMoverIzquierda:null,

    ctor: function (space, position, layer) {
        this.space=space;
        this.layer=layer;

        this.sprite = new cc.PhysicsSprite(res.soldado_png);

        // Cuerpo dinamico, SI le afectan las fuerzas
        this.body = new cp.Body(100, Infinity);

        this.body.setPos(position);
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
        this.shape.setCollisionType(tipoSoldado);
        this.space.addShape(this.shape);

/*
        //Animacion Mover Abajo
        var framesCaminarAbajo = this.getAnimacion("Octorok_abajo", 1);
        var animacionAbajo = new cc.Animation(framesCaminarAbajo, 0.2);
        this.animMoverAbajo = cc.RepeatForever.create(new cc.Animate(animacionAbajo));

        //Animacion Mover Arriba
        var framesCaminarArriba = this.getAnimacion("Octorok_arriba", 1);
        var animacionArriba = new cc.Animation(framesCaminarArriba, 0.2);
        this.animMoverArriba = cc.RepeatForever.create(new cc.Animate(animacionArriba));

        //Animacion Mover Derecha
        var framesCaminarDerecha = this.getAnimacion("Octorok_derecha", 1);
        var animacionDerecha = new cc.Animation(framesCaminarDerecha, 0.2);
        this.animMoverDerecha = cc.RepeatForever.create(new cc.Animate(animacionDerecha));

        //Animacion mover izquierda
        var framesCaminarIzquierda = this.getAnimacion("Octorok_izquierda", 1);
        var animacionIzquierda = new cc.Animation(framesCaminarIzquierda, 0.2);
        this.animMoverIzquierda = cc.RepeatForever.create(new cc.Animate(animacionIzquierda));

*/

        this.layer.mapa.addChild(this.sprite, 2);
        return true;

    }, update: function(dt){
        var distanciaX=this.body.p.x-this.layer.link.body.p.x;
        var distanciaY=this.body.p.y-this.layer.link.body.p.y;
        //comprobar que el jugador este en un radio cercano al enemigo
        var distancia=Math.sqrt(Math.pow(this.body.p.x-this.layer.link.body.p.x,2)+Math.pow(this.body.p.y-this.layer.link.body.p.y,2));
        if(distancia<150) {
            //hacemos que primero el enemigo se muestre en el ejeX y despues en el ejeY
            this.moverHaciaJugador();

        } else {
           //parar al enemigo
           this.parar();
        }

    }, getAnimacion: function (nombreAnimacion, numFrames) {
         var framesAnimacion = [];
         for (var i = 0; i <= numFrames; i++) {
             var str = nombreAnimacion + i + ".png";
             var frame = cc.spriteFrameCache.getSpriteFrame(str);
             framesAnimacion.push(frame);
         }
         return framesAnimacion;

    }, moverArriba: function () {
        this.orientacion = "ARRIBA";
        //this.sprite.runAction(this.animMoverArriba);
        this.body.setVel(cp.v(0, this.velMovimiento));

    }, moverAbajo: function () {
        this.orientacion = "ABAJO";
        //this.sprite.runAction(this.animMoverAbajo);
        this.body.setVel(cp.v(0, -this.velMovimiento));

    }, moverDerecha: function () {
        this.orientacion = "DERECHA";
        //this.sprite.runAction(this.animMoverDerecha);
        this.body.setVel(cp.v(this.velMovimiento, 0));

    }, moverIzquierda: function () {
        this.orientacion = "IZQUIERDA";
        //this.sprite.runAction(this.animMoverIzquierda);
        this.body.setVel(cp.v(-this.velMovimiento, 0));

    }, eliminar: function() {
        this.space.removeShape(this.shape);
        this.layer.mapa.removeChild(this.sprite);

    }, parar: function () {
        this.body.setVel(cp.v(0, 0));
        this.sprite.stopAllActions();

    }, moverHaciaJugador: function() {
         var distanciaX=this.body.p.x-this.layer.link.body.p.x;
         var distanciaY=this.body.p.y-this.layer.link.body.p.y;

         if(distanciaX<10) {
                this.moverDerecha();
         } else if(distanciaX>10) {
                this.moverIzquierda()
         }

          if(distanciaY>10) {
              this.moverAbajo();
          } else if(distanciaY<-10){
               this.moverArriba();
          }

    }




});
var Link = cc.Class.extend({
    //Variables de clase
    animCaminarAbajo: null,
    animCaminarArriba: null,
    animCaminarDerecha: null,
    animEspadaArriba: null,
    animEspadaAbajo: null,
    animEspadaLado: null,
    animacionSimple:null,
    animacionSimpleAbajo:null,
    animacionSimpleLado:null,
    boomerang:null,
    space: null,
    layer: null,
    sprite: null,
    body: null,
    shape: null,
    orientacion: null,
    inMovement:null,
    usingSword:null,
    isSwordPress:null,
    velMovimiento: 70,
    ctor: function (space, posicion, layer) {
        this.space = space;
        this.layer = layer;
        //Sprite inicial de link
        this.sprite = new cc.PhysicsSprite("#link_abajo0.png");
        this.sprite.setVertexZ(-100);
        // Cuerpo dinamico, SI le afectan las fuerzas
        this.body = new cp.Body(100, Infinity);

        this.body.setPos(posicion);
        //body.w_limit = 0.02;
        this.body.setAngle(0);
        this.body.e = 0;
        this.sprite.setBody(this.body);
        this.usingSword=Date.now();
        this.isSwordPress=false;
        // Se añade el cuerpo al espacio
        this.space.addBody(this.body);

        // forma
        this.shape = new cp.BoxShape(this.body,
            this.sprite.getContentSize().width - 2,
            this.sprite.getContentSize().height - 2);
        // forma dinamica
        this.shape.setFriction(1);
        this.shape.setCollisionType(tipoJugador);
        this.space.addShape(this.shape);

        this.addAnimations();

        this.layer.mapa.addChild(this.sprite, 2);
        return true;

    },addAnimations:function()
    {
     //Animacion Simple Arriba
        var framesSimple = this.getAnimacion("link_arriba", 1);
        this.animacionSimple = new cc.Animation(framesSimple, 0.05);
        //Animacion Simple Abajo
        var framesSimpleAbajo = this.getAnimacion("link_abajo", 1);
        this.animacionSimpleAbajo = new cc.Animation(framesSimpleAbajo, 0.05);
        //Animacion Simple Lado
        var framesSimpleLado = this.getAnimacion("link_lado", 1);
        this.animacionSimpleLado = new cc.Animation(framesSimpleLado, 0.05);
        //Animacion Caminar Abajo
        var framesCaminarAbajo = this.getAnimacion("link_abajo", 12);
        var animacionAbajo = new cc.Animation(framesCaminarAbajo, 0.05);
        this.animCaminarAbajo = cc.RepeatForever.create(new cc.Animate(animacionAbajo));
        this.animCaminarAbajo.setTag(1);
        //Animacion Caminar Arriba
        var framesCaminarArriba = this.getAnimacion("link_arriba", 12);
        var animacionArriba = new cc.Animation(framesCaminarArriba, 0.05);
        this.animCaminarArriba = cc.RepeatForever.create(new cc.Animate(animacionArriba));
        this.animCaminarArriba.setTag(2);
        //Animacion Caminar Derecha
        var framesCaminarDerecha = this.getAnimacion("link_lado", 12);
        var animacionDerecha = new cc.Animation(framesCaminarDerecha, 0.05);
        this.animCaminarDerecha = cc.RepeatForever.create(new cc.Animate(animacionDerecha));
        this.animCaminarDerecha.setTag(3);
        //Animacion Espada Arriba
        var framesEspadaArriba = this.getAnimacion("Link_espadazo_arriba", 9);
        var animacionEspArriba = new cc.Animation(framesEspadaArriba, 0.03);
        this.animEspadaArriba = new cc.Sequence(new cc.Animate(animacionEspArriba), new cc.Animate(this.animacionSimple));

        //Animacion Espada Abajo
        var framesEspadaAbajo = this.getAnimacion("Link_espadazo_abajo", 6);
        var animacionEspAbajo = new cc.Animation(framesEspadaAbajo, 0.03);
        this.animEspadaAbajo = new cc.Sequence(new cc.Animate(animacionEspAbajo), new cc.Animate(this.animacionSimpleAbajo));
        //Animacion Espada Lado
        var framesEspadaDerecha = this.getAnimacion("Link_espadazo_derecha", 9);
        var animacionEspDerecha = new cc.Animation(framesEspadaDerecha, 0.03);
        this.animEspadaLado = new cc.Sequence(new cc.Animate(animacionEspDerecha), new cc.Animate(this.animacionSimpleLado));


    }
    , getAnimacion: function (nombreAnimacion, numFrames) {
        var framesAnimacion = [];
        for (var i = 0; i < numFrames; i++) {
            var str = nombreAnimacion + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            framesAnimacion.push(frame);
        }
        return framesAnimacion;

    }, moverArriba: function () {
        if(!this.layer.isMovementKeyPressed())
        {
            this.sprite.runAction(this.animCaminarArriba);
            this.orientacion = "ARRIBA";
        }
        //var vMoverArriba = cc.RepeatForever.create(cc.MoveBy.create(1, cc.p(0,50)));
        //this.sprite.runAction(vMoverArriba);
        this.body.setVel(cp.v(this.body.getVel().x, this.velMovimiento));
    }, moverAbajo: function () {
        if(!this.layer.isMovementKeyPressed())
                {
                    this.sprite.runAction(this.animCaminarAbajo);
                    this.orientacion = "ABAJO";
                }
        this.body.setVel(cp.v(this.body.getVel().x, -this.velMovimiento));
    }, moverDerecha: function () {
         console.log("DERECHA");
        //Se escala a 1 en la x
        if(!this.layer.isMovementKeyPressed())
                {
                    this.sprite.scaleX = 1;
                    this.sprite.runAction(this.animCaminarDerecha);
                    this.orientacion = "DERECHA";
                }
        this.body.setVel(cp.v(this.velMovimiento, this.body.getVel().y));
    }, moverIzquierda: function () {
        //Si va a la izquierda se escala a -1 para hacer flip a la animacion
        //el inMovement impide que se ejecute otra animacion de movimiento
         if(!this.layer.isMovementKeyPressed())
                        {
                            this.sprite.scaleX = -1;
                            this.sprite.runAction(this.animCaminarDerecha);
                            this.orientacion = "IZQUIERDA";
                        }
        this.body.setVel(cp.v(-this.velMovimiento, this.body.getVel().y));
    }, parado: function () {
        this.body.setVel(cp.v(0, 0));
    }, utilizarEspada: function () {
        //isSwordPress mira que no se mantenga pulsado el boton m
        if(Date.now()-this.usingSword>=550 && !this.isSwordPress)
        {
            this.usingSword=Date.now();
            this.isSwordPress=true;
            if (this.orientacion == "ARRIBA") {
                this.sprite.runAction(this.animEspadaArriba);
            }
            if (this.orientacion == "DERECHA") {
                this.sprite.scaleX = 1;
                this.sprite.runAction(this.animEspadaLado);
            }
            if (this.orientacion == "IZQUIERDA") {
                this.sprite.scaleX = -1;
                this.sprite.runAction(this.animEspadaLado);
            }
            if (this.orientacion == "ABAJO") {
                this.sprite.runAction(this.animEspadaAbajo);
            }
        }
    },utilizarBoomerang:function(){
        if(this.boomerang==null)
        {
            this.boomerang=new Boomerang(this.space,cc.p(this.body.p.x, this.body.p.y), this.layer, this.orientacion);
        }
    },update:function(dt){
        //Se hace el update del boomerang si este existe
       if(this.boomerang!=null)
       {
            this.boomerang.update(dt);
        }
    }
});
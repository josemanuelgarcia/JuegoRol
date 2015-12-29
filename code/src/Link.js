var Link = cc.Class.extend({
    //Variables de clase
    animaciones:[],
    boomerang:null,
    space: null,
    layer: null,
    sprite: null,
    body: null,
    shape: null,
    orientacion: null,
    usingSword:null,
    isMoving:null,
    isSwordPress:null,
    velMovimiento: 70,
    ctor: function (space, posicion, layer) {
        this.space = space;
        this.layer = layer;
        //Orientacion inicial
        this.orientacion="ABAJO";
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
        this.usingSword=false;
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
        this.animaciones["SIMPLE_ARRIBA"] = cc.Animate.create(new cc.Animation(framesSimple, 0.05));
        //Animacion Simple Abajo
        var framesSimpleAbajo = this.getAnimacion("link_abajo", 1);
        this.animaciones["SIMPLE_ABAJO"] = cc.Animate.create(new cc.Animation(framesSimpleAbajo, 0.05));
        //Animacion Simple Lado
        var framesSimpleLado = this.getAnimacion("link_lado", 1);
        this.animaciones["SIMPLE_LADO"] = cc.Animate.create(new cc.Animation(framesSimpleLado, 0.05));
        //Animacion Caminar Abajo
        var framesCaminarAbajo = this.getAnimacion("link_abajo", 12);
        var animacionAbajo = new cc.Animation(framesCaminarAbajo, 0.05);
        this.animaciones["CAMINAR_ABAJO"] = cc.RepeatForever.create(new cc.Animate(animacionAbajo));
        //Animacion Caminar Arriba
        var framesCaminarArriba = this.getAnimacion("link_arriba", 12);
        var animacionArriba = new cc.Animation(framesCaminarArriba, 0.05);
        this.animaciones["CAMINAR_ARRIBA"] =cc.RepeatForever.create(new cc.Animate(animacionArriba));
        //Animacion Caminar Derecha
        var framesCaminarDerecha = this.getAnimacion("link_lado", 12);
        var animacionDerecha = new cc.Animation(framesCaminarDerecha, 0.05);
        this.animaciones["CAMINAR_DERECHA"] =cc.RepeatForever.create(new cc.Animate(animacionDerecha));
        this.animaciones["CAMINAR_IZQUIERDA"] =cc.RepeatForever.create(new cc.Animate(animacionDerecha));
        //Animacion Espada Arriba
        var framesEspadaArriba = this.getAnimacion("Link_espadazo_arriba", 9);
        var animacionEspArriba = new cc.Animation(framesEspadaArriba, 0.03);
        this.animaciones["ESPADA_ARRIBA"]  = new cc.Sequence(new cc.Animate(animacionEspArriba), this.obtainAnimation("SIMPLE_ARRIBA"),cc.CallFunc.create(this.lock, this));

        //Animacion Espada Abajo
        var framesEspadaAbajo = this.getAnimacion("Link_espadazo_abajo", 6);
        var animacionEspAbajo = new cc.Animation(framesEspadaAbajo, 0.03);
        this.animaciones["ESPADA_ABAJO"]  = new cc.Sequence(new cc.Animate(animacionEspAbajo), this.obtainAnimation("SIMPLE_ABAJO"),cc.CallFunc.create(this.lock, this));
        //Animacion Espada Lado
        var framesEspadaDerecha = this.getAnimacion("Link_espadazo_derecha", 9);
        var animacionEspDerecha = new cc.Animation(framesEspadaDerecha, 0.03);
        this.animaciones["ESPADA_DERECHA"]  = new cc.Sequence(new cc.Animate(animacionEspDerecha), this.obtainAnimation("SIMPLE_LADO"),cc.CallFunc.create(this.lock, this));

        this.animaciones["ESPADA_IZQUIERDA"]  = new cc.Sequence(new cc.Animate(animacionEspDerecha), this.obtainAnimation("SIMPLE_LADO"),cc.CallFunc.create(this.lock, this));

        this.animaciones["ESPADA_CAMINAR_ARRIBA"]  = new cc.Spawn(new cc.Animate(animacionEspArriba),this.obtainAnimation("CAMINAR_ARRIBA"));
        this.animaciones["ESPADA_CAMINAR_ABAJO"]  = new cc.Spawn(new cc.Animate(animacionEspAbajo),this.obtainAnimation("CAMINAR_ABAJO"));
        this.animaciones["ESPADA_CAMINAR_DERECHA"]  = new cc.Spawn(new cc.Animate(animacionEspDerecha),this.obtainAnimation("CAMINAR_DERECHA"));
        this.animaciones["ESPADA_CAMINAR_IZQUIERDA"]  = new cc.Spawn(new cc.Animate(animacionEspDerecha),this.obtainAnimation("CAMINAR_DERECHA"));
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
        this.orientacion="ARRIBA";
        this.isMoving=true;
        this.body.setVel(cp.v(this.body.getVel().x, this.velMovimiento));
    }, moverAbajo: function () {
        this.orientacion="ABAJO";
        this.isMoving=true;
        this.body.setVel(cp.v(this.body.getVel().x, -this.velMovimiento));
    }, moverDerecha: function () {
        this.orientacion="DERECHA";
        this.isMoving=true;
        this.body.setVel(cp.v(this.velMovimiento, this.body.getVel().y));
    }, moverIzquierda: function () {
        this.orientacion="IZQUIERDA";
        this.isMoving=true;
        this.body.setVel(cp.v(-this.velMovimiento, this.body.getVel().y));
    }, parado: function ()
    {
           this.body.setVel(cp.v(0, 0));
           this.isMoving=false;
    }, utilizarEspada: function () {
        this.usingSword=true;
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
       if(this.usingSword)
       {
            //Establecer la escala
            this.sprite.scaleX=(this.orientacion=="IZQUIERDA"? -1:1);
            this.sprite.runAction(this.obtainAnimation("ESPADA_"+this.orientacion));
       }
      else if(this.isMoving)
      {
        this.sprite.scaleX=(this.orientacion=="IZQUIERDA"? -1:1);
        this.sprite.runAction(this.obtainAnimation("CAMINAR_"+this.orientacion));
      }
    },obtainAnimation: function(key)
    {
        return this.animaciones[key];
    }
    ,lock: function()
    {
        this.usingSword=false;
    }
});
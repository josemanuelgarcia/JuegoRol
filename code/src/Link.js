var Link=cc.Class.extend({
//Variables de clase
animCaminarAbajo:null,
animCaminarArriba:null,
animCaminarDerecha:null,
animEspadaArriba:null,
animEspadaAbajo:null,
animEspadaLado:null,
space:null,
layer:null,
sprite:null,
body:null,
shape:null,
orientacion:null,
ctor:function (space, posicion, layer) {
    this.space = space;
    this.layer = layer;
    //Sprite inicial de link
    this.sprite = new cc.PhysicsSprite("#link_abajo0.png");
        // Cuerpo dinamico, SI le afectan las fuerzas
        this.body = new cp.Body(5, Infinity);

        this.body.setPos(posicion);
        //body.w_limit = 0.02;
        this.body.setAngle(0);
        this.sprite.setBody(this.body);

        // Se añade el cuerpo al espacio
        this.space.addBody(this.body);

        // forma
        this.shape = new cp.BoxShape(this.body,
            this.sprite.getContentSize().width - 2,
            this.sprite.getContentSize().height - 2);
        // forma dinamica
        this.shape.setCollisionType(tipoJugador);
        this.space.addShape(this.shape);

    //Animacion Caminar Abajo
     var framesCaminarAbajo = this.getAnimacion("link_abajo",12);
     var animacionAbajo = new cc.Animation(framesCaminarAbajo, 0.1);
     this.animCaminarAbajo=cc.RepeatForever.create(new cc.Animate(animacionAbajo));

     //Animacion Caminar Arriba
      var framesCaminarArriba = this.getAnimacion("link_arriba",12);
      var animacionArriba = new cc.Animation(framesCaminarArriba, 0.1);
      this.animCaminarArriba = cc.RepeatForever.create(new cc.Animate(animacionArriba));
      //Animacion Caminar Derecha
      var framesCaminarDerecha= this.getAnimacion("link_lado",12);
      var animacionDerecha=new cc.Animation(framesCaminarDerecha,0.1);
      this.animCaminarDerecha=cc.RepeatForever.create(new cc.Animate(animacionDerecha));
      //Animacion Espada Arriba
      var framesEspadaArriba=this.getAnimacion("Link_espadazo_arriba",9);
      var animacionEspArriba=new cc.Animation(framesEspadaArriba,0.03);
      this.animEspadaArriba=cc.RepeatForever.create(new cc.Animate(animacionEspArriba));

      //Animacion Espada Abajo
      var framesEspadaAbajo=this.getAnimacion("Link_espadazo_abajo",6);
      var animacionEspAbajo=new cc.Animation(framesEspadaAbajo,0.03);
      this.animEspadaAbajo=cc.RepeatForever.create(new cc.Animate(animacionEspAbajo));
      //Animacion Espada Lado
      var framesEspadaDerecha=this.getAnimacion("Link_espadazo_derecha",9);
      var animacionEspDerecha=new cc.Animation(framesEspadaDerecha,0.03);
      this.animEspadaLado=cc.RepeatForever.create(new cc.Animate(animacionEspDerecha));

      layer.addChild(this.sprite,10);
      return true;

},getAnimacion:function(nombreAnimacion, numFrames){
     var framesAnimacion = [];
     for (var i = 0; i < numFrames; i++) {
                var str = nombreAnimacion + i + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                framesAnimacion.push(frame);
      }
      return framesAnimacion;

},moverArriba:function(){
    this.sprite.runAction(this.animCaminarArriba);
    var vMoverArriba = cc.RepeatForever.create(cc.MoveBy.create(1, cc.p(0,50)));
    this.sprite.runAction(vMoverArriba);
    this.orientacion="ARRIBA";
},moverAbajo:function(){
     this.sprite.runAction(this.animCaminarAbajo);
     //var vMoverAbajo =cc.RepeatForever.create(cc.MoveBy.create(1, cc.p(0,-50)));
     //this.sprite.runAction(vMoverAbajo);
     this.body.setVel(cp.v(this.body.getVel().x,-10));
     this.orientacion="ABAJO";
},moverDerecha:function(){

    //Se escala a 1 en la x
    this.sprite.scaleX=1;
    this.sprite.runAction(this.animCaminarDerecha);
    var vMoverDerecha =cc.RepeatForever.create(cc.MoveBy.create(1, cc.p(50,0)));
    this.sprite.runAction(vMoverDerecha);
    this.orientacion="DERECHA";
},moverIzquierda:function(){
    //Si va a la izquierda se escala a -1 para hacer flip a la animacion
    this.sprite.scaleX=-1;
    this.sprite.runAction(this.animCaminarDerecha);
    var vMoverIzquierda =cc.RepeatForever.create(cc.MoveBy.create(1, cc.p(-50,0)));
    this.sprite.runAction(vMoverIzquierda);
    this.orientacion="IZQUIERDA";
},utilizarEspada:function(){
    if(this.orientacion=="ARRIBA"){
        this.sprite.runAction(this.animEspadaArriba);
    }
    if(this.orientacion=="DERECHA"){
        this.sprite.scaleX=1;
        this.sprite.runAction(this.animEspadaLado);
    }
    if(this.orientacion=="IZQUIERDA"){
            this.sprite.scaleX=-1;
            this.sprite.runAction(this.animEspadaLado);
    }
    if(this.orientacion=="ABAJO"){
        this.sprite.runAction(this.animEspadaAbajo);
    }
}
});
var Link=cc.Class.extend({
//Variables de clase
animCaminarAbajo:null,
animCaminarArriba:null,
animCaminarDerecha:null,
space:null,
layer:null,
sprite:null,
body:null,
shape:null,
ctor:function (posicion, layer) {
    this.space = space;
    this.layer = layer;
    //Sprite inicial de link
    this.sprite = new cc.PhysicsSprite("#link_abajo0.png");
        // Cuerpo dinamico, SI le afectan las fuerzas
        this.body = new cp.Body(5, cp.momentForBox(1,
            this.sprite.getContentSize().width,
            this.sprite.getContentSize().height));

        this.body.setPos(posicion);
        //body.w_limit = 0.02;
        this.body.setAngle(0);
        this.sprite.setBody(this.body);

        // Se añade el cuerpo al espacio
        this.space.addBody(this.body);

        // forma
        this.shape = new cp.BoxShape(this.body,
            this.sprite.getContentSize().width - 16,
            this.sprite.getContentSize().height - 16);
        // forma dinamica
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

},moverAbajo:function(){
     this.sprite.runAction(this.animCaminarAbajo);
     var vMoverAbajo =cc.RepeatForever.create(cc.MoveBy.create(1, cc.p(0,-50)));
     this.sprite.runAction(vMoverAbajo);

},moverDerecha:function(){

    //Se escala a 1 en la x
    this.sprite.scaleX=1;
    this.sprite.runAction(this.animCaminarDerecha);
    var vMoverDerecha =cc.RepeatForever.create(cc.MoveBy.create(1, cc.p(50,0)));
    this.sprite.runAction(vMoverDerecha);
},moverIzquierda:function(){

    //Si va a la izquierda se escala a -1 para hacer flip a la animacion
    this.sprite.scaleX=-1;
    this.sprite.runAction(this.animCaminarDerecha);
    var vMoverIzquierda =cc.RepeatForever.create(cc.MoveBy.create(1, cc.p(-50,0)));
    this.sprite.runAction(vMoverIzquierda);
}
});
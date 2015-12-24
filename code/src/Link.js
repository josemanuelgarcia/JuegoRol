var Link=cc.Class.extend({
//Variables de clase
animCaminarAbajo:null,
animCaminarArriba:null,
space:null,
layer:null,
sprite:null,
body:null,
shape:null,
ctor:function (posicion, layer) {
    this.space = space;
    this.layer = layer;
    //Sprite inicial de link
    this.sprite = new cc.PhysicsSprite("#zelda_abajo0.png");
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
     var framesCaminarAbajo = this.getAnimacion("zelda_abajo",6);
     var animacionAbajo = new cc.Animation(framesCaminarAbajo, 0.1);
     this.animCaminarAbajo=cc.RepeatForever.create(new cc.Animate(animacionAbajo));

     //Animacion Caminar Arriba
      var framesCaminarArriba = this.getAnimacion("zelda_arriba",6);
      var animacionArriba = new cc.Animation(framesCaminarArriba, 0.1);
      this.animCaminarArriba = cc.RepeatForever.create(new cc.Animate(animacionArriba));

      layer.addChild(this.sprite,10);
      return true;

},getAnimacion:function(nombreAnimacion, numFrames){
     var framesAnimacion = [];
     for (var i = 0; i <= numFrames; i++) {
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

}
});
var Link=cc.Class.extend({
//Variables de clase
animacionArriba:null,
animacionAbajo:null,
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
    //Guardamos la variable caminar abajo en una variable
    var framesAnimacion = [];
        for (var i = 0; i <= 6; i++) {
            var str = "zelda_abajo" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            framesAnimacion.push(frame);
        }
     this.animacionAbajo = new cc.Animation(framesAnimacion, 0.2);

     //Guardamos la variable caminar arriba en una variable
         var framesAnimacion2 = [];
             for (var i = 0; i <= 6; i++) {
                 var str = "zelda_arriba" + i + ".png";
                 var frame = cc.spriteFrameCache.getSpriteFrame(str);
                 framesAnimacion.push(frame);
             }
          this.animacionArriba = new cc.Animation(framesAnimacion2, 0.2);
           layer.addChild(this.sprite,10);
           return true;
},moverArriba:function(){
    this.sprite.runAction(this.animacionArriba);
},moverAbajo:function(){
    this.sprite.runAction(this.animacionAbajo);
}
});
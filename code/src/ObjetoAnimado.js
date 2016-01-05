var ObjetoAnimado = cc.Class.extend({
space:null,
layer:null,
sprite:null,
animacion:null,
shape:null,
ctor:function(space,position,layer,nombreAnimacion,numFrames){
    this.space=space;
    this.layer=layer;

    this.sprite = new cc.PhysicsSprite("#Jarron_normal.png");
    var tamaño = this.sprite.getContentSize();

    var body = new cp.StaticBody();
    body.setPos(cc.p(position.x + tamaño.width/2,position.y + tamaño.height/2));

    this.sprite.setBody(body);

    this.shape = new cp.BoxShape(body,
                             tamaño.width - 2,
                             tamaño.height - 2);

    this.space.addStaticShape(this.shape);

    var framesAnimacion = animationManager.getAnimacion(nombreAnimacion,numFrames);
    this.animacion = cc.RepeatForever.create(cc.Animate.create(new cc.Animation(framesAnimacion,0.1)));
    this.sprite.runAction(this.animacion);

    this.layer.mapa.addChild(this.sprite,2);
    return true;

}
});
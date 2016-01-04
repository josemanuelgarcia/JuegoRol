var ObjetoAnimado = cc.Class.extend({
ctor:function(space,position,layer,nombreAnimacion,numFrames){

    var sprite = new cc.PhysicsSprite("#Jarron_normal.png");
    var tamaño = this.sprite.getContentSize();
    var body = new cp.StaticBody();
    body.setPos(cc.p(position.x + tamaño.width/2,position.y - tamaño.height/2));
    sprite.setBody(this.body);
    var shape = new cp.BoxShape(this.body,
                             this.sprite.getContentSize().width - 2,
                             this.sprite.getContentSize().height - 2);
    space.addStaticShape(this.shape);

    var framesAnimacion = animationManager.getAnimacion(nombreAnimacion,numFrames);
    var animacion = cc.RepeatForever.create(new cc.Animation(this.framesAnimacion,0.1));
    sprite.runAction(animacion);
    layer.mapa.addChild(this.sprite,2);
    return true;

}

});
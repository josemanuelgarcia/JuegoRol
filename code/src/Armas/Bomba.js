var Bomba=cc.Class.extend({
space:null,
layer:null,
shape:null,
sensor:null,
body:null,
sprite:null,
timeToExplote:null,
animacionExplosion:null,
ctor: function (space, posicion, layer) {
    this.space = space;
    this.layer = layer;
    this.timeToExplote=Date.now();
    //Animacion de explosion
    var framesExplosion = animationManager.getAnimacion("explosion",10);

    var animExplosion = new cc.Animation(framesExplosion, 0.1);
    this.animacionExplosion = new cc.Animate(animExplosion);
    this.sprite = new cc.PhysicsSprite(res.bomb_png);

    this.body = new cp.StaticBody();
    this.body.setPos(posicion);
    this.body.setAngle(0);
    this.sprite.setBody(this.body);
    var radio = this.sprite.getContentSize().width / 2;
    this.shape = new cp.BoxShape(this.body,
    this.sprite.getContentSize().width - 2,
    this.sprite.getContentSize().height - 2);
    space.addStaticShape(this.shape);

    //sensor
    this.sensor = new cp.CircleShape(this.body, this.sprite.getContentSize().width*1.5, cp.vzero);
    this.sensor.setSensor(true);
    this.space.addShape(this.sensor);
    //Animacion BombaCreciendo
    var espera = cc.DelayTime.create(1);
    var aumenta = cc.ScaleBy.create(1,2,1);
    var spawn = new cc.Spawn(this.animacionExplosion, new cc.callFunc(this.activarExplosion,this));
    var sequence = new cc.Sequence(espera,aumenta,spawn,cc.CallFunc.create(this.eliminar,this));
    this.sprite.runAction(sequence);
    layer.mapa.addChild(this.sprite, 2);
    return true;
},activarExplosion: function()
{
    this.sensor.setCollisionType(tipoBomba);

}, eliminar: function () {
         // quita la forma
     this.space.removeShape(this.shape);
     this.space.removeShape(this.sensor);
     this.layer.mapa.removeChild(this.sprite);
 }
});
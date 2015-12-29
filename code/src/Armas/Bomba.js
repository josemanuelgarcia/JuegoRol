var Bomba=cc.Class.extend({
space:null,
layer:null,
shape:null,
body:null,
sprite:null,
timeToExplote:null,
animacionExplosion:null,
ctor: function (space, posicion, layer) {
    this.space = space;
    this.layer = layer;
    this.timeToExplote=Date.now();
    var framesAnimacion = [];
    for (var i = 1; i <= 2; i++) {
         var str = "bomb" + i + ".png";
         var frame = cc.spriteFrameCache.getSpriteFrame(str);
         framesAnimacion.push(frame);
            }
    var animacion = new cc.Animation(framesAnimacion, 0.05);
    var actionAnimacionBucle =new cc.RepeatForever(new cc.Animate(animacion));
    //Animacion de explosion
    var framesAnimacion2 = [];
        for (var i = 1; i <= 6; i++) {
             var str = "explosion" + i + ".png";
             var frame = cc.spriteFrameCache.getSpriteFrame(str);
             framesAnimacion2.push(frame);
                }
    var animacion2 = new cc.Animation(framesAnimacion2, 0.05);
    this.animacionExplosion =cc.Sequence.create(new cc.Animate(animacion2),cc.CallFunc.create(this.eliminar,this));
    this.sprite = new cc.PhysicsSprite("#bomb1.png");
    this.body = new cp.StaticBody(100, Infinity);
    this.body.setPos(posicion);
    this.body.setAngle(0);
    this.sprite.setBody(this.body);
    //this.space.addBody(this.body);
    var radio = this.sprite.getContentSize().width / 2;
    this.shape = new cp.BoxShape(this.body,
    this.sprite.getContentSize().width - 2,
    this.sprite.getContentSize().height - 2);
    space.addStaticShape(this.shape);
    this.sprite.runAction(actionAnimacionBucle);
    layer.addChild(this.sprite, 10);
    return true;
},update: function(dt)
{
    if(Date.now()-this.timeToExplote>=2500)
    {
        this.shape.setCollisionType(tipoBomba);
        this.sprite.runAction(this.animacionExplosion);
        //this.eliminar();
    }
}, eliminar: function () {
         // quita la forma
         for(var i=0;i<this.layer.link.bombs.length;i++)
         {
            if(this.layer.link.bombs[i]==this)
            {
                //Se elimina dicha bomba
                this.layer.link.bombs.splice(i,1);
            }
         }
         //TODO no se porque da error al eliminarla pasado el tiempo
         this.space.removeShape(this.shape);
         this.layer.removeChild(this.sprite);
     }
});
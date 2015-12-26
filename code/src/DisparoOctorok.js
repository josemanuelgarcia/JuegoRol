var DisparoOctorok = cc.Class.extend ({
     space:null,
     sprite:null,
     shape:null,
     layer:null,
    ctor:function (space, posicion, layer, sentido) {
        this.space = space;
        this.layer = layer;

        // Crear animación
        var framesAnimacion = [];
        for (var i = 1; i <= 3; i++) {
            var str = "octorok_bala" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            framesAnimacion.push(frame);
        }
        var animacion = new cc.Animation(framesAnimacion, 0.2);
        var actionAnimacionBucle =
            new cc.RepeatForever(new cc.Animate(animacion));

        // Crear Sprite - Cuerpo y forma
        this.sprite = new cc.PhysicsSprite("#Octorok_bala0.png");

        this.body = new cp.Body(1, cp.momentForBox(1,
                       this.sprite.getContentSize().width,
                       this.sprite.getContentSize().height));
        this.body.setPos(posicion);

        //Aplicar impulso
        //TODO cambiar sentido
        var impulsoY = -300 ;
        // Colocar en angulo del cuerpo a 0
        this.body.setAngle(0);
        this.body.applyImpulse(cp.v(0, impulsoY), cp.v(0, 0));

        this.sprite.setBody(this.body);
        this.space.addBody(this.body);

        var radio = this.sprite.getContentSize().width / 2;
        // forma
        this.shape = new cp.CircleShape(this.body, radio , cp.vzero);
        this.space.addShape(this.shape);


        // ejecutar la animación
        this.sprite.runAction(actionAnimacionBucle);

        layer.addChild(this.sprite,10);
        return true;

    }, getShape: function () {
         return this.shape;

    }, eliminar: function () {
         // quita la forma
         this.space.removeShape(this.shape);

         // quita el cuerpo *opcional, funciona igual
         // NO: es un cuerpo estático, no lo añadimos, no se puede quitar.
         // this.space.removeBody(shape.getBody());

         // quita el sprite
         this.layer.removeChild(this.sprite);
     }


});
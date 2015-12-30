var DisparoOctorok = cc.Class.extend({
    space: null,
    sprite: null,
    shape: null,
    layer: null,
    velDisparo: 50,
    ctor: function (space, posicion, layer, sentido) {
        this.space = space;
        this.layer = layer;
        // Crear animación
        var framesAnimacion = [];
        for (var i = 0; i <= 2; i++) {
            var str = "Octorok_bala" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            framesAnimacion.push(frame);
        }
        var animacion = new cc.Animation(framesAnimacion, 0.5);
        var actionAnimacionBucle =
            new cc.RepeatForever(new cc.Animate(animacion));

        // Crear Sprite - Cuerpo y forma
        this.sprite = new cc.PhysicsSprite("#Octorok_bala0.png");

        this.body = new cp.Body(100, Infinity);
        this.body.setPos(posicion);

        //Poner la direccion del disparo en función de la de Octorok

        if (sentido == "ARRIBA") {
            this.body.setVel(cp.v(0, this.velDisparo));
        } else if (sentido == "DERECHA") {
            this.body.setVel(cp.v(this.velDisparo, 0));
        } else if (sentido == "ABAJO") {
            this.body.setVel(cp.v(0, -this.velDisparo));
        } else {
            this.body.setVel(cp.v(-this.velDisparo, 0));
        }

        // Colocar en angulo del cuerpo a 0
        this.body.setAngle(0);

        this.sprite.setBody(this.body);
        this.space.addBody(this.body);

        var radio = this.sprite.getContentSize().width / 2;
        // forma
        this.shape = new cp.CircleShape(this.body, radio, cp.vzero);
        this.shape.setCollisionType(tipoDisparoOctorok);

        this.space.addShape(this.shape);

        // ejecutar la animación
        this.sprite.runAction(actionAnimacionBucle);

        layer.mapa.addChild(this.sprite, 2);
        return true;

    }, getShape: function () {
        return this.shape;

    }, eliminar: function () {
        // quita la forma
        this.space.removeShape(this.shape);

        // quita el sprite
        this.layer.mapa.removeChild(this.sprite);
    }


});
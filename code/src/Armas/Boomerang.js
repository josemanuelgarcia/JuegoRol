var Boomerang = cc.Class.extend({
    space: null,
    sprite: null,
    shape: null,
    layer: null,
    choco: null,
    sentido: null,
    canBeDeleted: null,
    velDisparo: 100,
    timeToChange: null,
    ctor: function (space, posicion, layer, sentido) {
        this.space = space;
        this.layer = layer;
        this.sentido = sentido;
        this.choco = false;
        // Crear animación
        var framesAnimacion = [];
        for (var i = 0; i <= 5; i++) {
            var str = "boomerang" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            framesAnimacion.push(frame);
        }
        var animacion = new cc.Animation(framesAnimacion, 0.05);
        var actionAnimacionBucle =
            new cc.RepeatForever(new cc.Animate(animacion));

        // Crear Sprite - Cuerpo y forma
        this.sprite = new cc.PhysicsSprite("#boomerang0.png");

        this.body = new cp.Body(100, Infinity);
        this.body.setPos(posicion);
        this.timeToChange = Date.now();
        this.canBeDeleted = false;
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
        this.shape = new cp.BoxShape(this.body,
            this.sprite.getContentSize().width - 2,
            this.sprite.getContentSize().height - 2);
        this.shape.setCollisionType(tipoBoomerang);

        this.space.addShape(this.shape);

        // ejecutar la animación
        this.sprite.runAction(actionAnimacionBucle);

         this.layer.mapa.addChild(this.sprite, 2);
        return true;

    }, getShape: function () {
        return this.shape;

    }, eliminar: function () {
        // quita la forma
        this.space.removeShape(this.shape);
        //Link solo puede lanzar un boomerang a la vez
        this.layer.link.boomerang = null;
        // quita el sprite
        this.layer.removeChild(this.sprite);
    }, update: function (dt) {
        //Si pasa el tiempo o si choca da la vuelta

        if (Date.now() - this.timeToChange >= 1500 || this.choco) {
            this.canBeDeleted = true;
            this.sprite.runAction(cc.MoveTo.create(1.5, cc.p(this.layer.link.body.p.x, this.layer.link.body.p.y)));
        }
    }


});
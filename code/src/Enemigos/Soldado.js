var Soldado = cc.Class.extend({
    space: null,
    layer: null,
    sprite: null,
    body: null,
    shape: null,
    orientacion: "ABAJO",
    velMovimiento: 50,
    animaciones: [],
    tiempoEntreMovimientos: null,
    tiempoMovimiento: 0,
    isMoving: false,

    ctor: function (space, position, layer, color) {
        this.space = space;
        this.layer = layer;
        this.tiempoEntreMovimientos = 1 + Math.floor(Math.random() * 2);

        console.log(color);

        if (color === "r") {
            this.sprite = new cc.PhysicsSprite("#Soldado_rojo_parado_abajo0.png");
            animationManager.addAnimationsSoldadoRojo(this);

        } else {
            this.sprite = new cc.PhysicsSprite("#Soldado_verde_parado_abajo0.png");
            animationManager.addAnimationsSoldadoVerde(this);
        }


        // Cuerpo dinamico, SI le afectan las fuerzas
        this.body = new cp.Body(100, Infinity);

        this.body.setPos(position);
        this.body.setAngle(0);
        this.body.e = 0;

        this.sprite.setBody(this.body);
        // Se añade el cuerpo al espacio
        this.space.addBody(this.body);

        // forma
        this.shape = new cp.BoxShape(this.body,
            this.sprite.getContentSize().width,
            this.sprite.getContentSize().height);
        // forma dinamica
        this.shape.setCollisionType(tipoSoldado);
        this.space.addShape(this.shape);

        this.layer.mapa.addChild(this.sprite, 2);
        return true;

    }, update: function (dt) {
        var distanciaX = this.body.p.x - this.layer.link.body.p.x;
        var distanciaY = this.body.p.y - this.layer.link.body.p.y;
        //comprobar que el jugador este en un radio cercano al enemigo
        var distancia = Math.sqrt(Math.pow(this.body.p.x - this.layer.link.body.p.x, 2) + Math.pow(this.body.p.y - this.layer.link.body.p.y, 2));
        this.tiempoMovimiento = this.tiempoMovimiento + dt;

        if (distancia < 150) {
            //hacemos que primero el enemigo se muestre en el ejeX y despues en el ejeY
            this.moverHaciaJugador();
        } else if (this.tiempoMovimiento > this.tiempoEntreMovimientos) {
            this.vigilar();
            this.tiempoMovimiento = 0;
        }

    }, vigilar: function () {
        var random = Math.floor(Math.random() * 7);
        switch (random) {
            case 0:
                this.moverDerecha();
                break;
            case 1:
                this.moverAbajo();
                break;
            case 2:
                this.moverIzquierda();
                break;
            case 3:
                this.moverArriba();
                break;
            case 4 || 5 || 6:
                this.parar();
                break;
        }

    }
    , moverArriba: function () {
        if (this.orientacion != "ARRIBA" || !this.isMoving) {
            this.orientacion = "ARRIBA";
            this.sprite.scaleX = 1;
            this.animacionMoverse();
            this.body.setVel(cp.v(0, this.velMovimiento));
            this.isMoving = true;
        }

    }, moverAbajo: function () {
        if (this.orientacion != "ABAJO" || !this.isMoving) {
            this.orientacion = "ABAJO";
            this.sprite.scaleX = 1;
            this.animacionMoverse();
            this.body.setVel(cp.v(0, -this.velMovimiento));
            this.isMoving = true;
        }

    }, moverDerecha: function () {
        if (this.orientacion != "DERECHA" || !this.isMoving) {
            this.orientacion = "DERECHA";
            this.sprite.scaleX = 1;
            this.animacionMoverse();
            this.body.setVel(cp.v(this.velMovimiento, 0));
            this.isMoving = true;
        }

    }, moverIzquierda: function () {
        if (this.orientacion != "IZQUIERDA" || !this.isMoving) {
            this.orientacion = "IZQUIERDA";
            this.sprite.scaleX = -1;
            this.animacionMoverse();
            this.body.setVel(cp.v(-this.velMovimiento, 0));
            this.isMoving = true;
        }

    }, eliminar: function () {
        this.space.removeShape(this.shape);
        this.layer.mapa.removeChild(this.sprite);

    }, parar: function () {
        this.body.setVel(cp.v(0, 0));
        this.sprite.scaleX = (this.orientacion == "IZQUIERDA" ? -1 : 1);
        this.sprite.stopAllActions();
        this.animacionPararse();
        this.isMoving = false;

    }, moverHaciaJugador: function () {
        var distanciaX = this.body.p.x - this.layer.link.body.p.x;
        var distanciaY = this.body.p.y - this.layer.link.body.p.y;



        if (distanciaX >= 0 && distanciaY >= 0) {//Primer cuadrante
            if (distanciaX < distanciaY) {
                this.moverAbajo()
            } else {
                this.moverIzquierda()
            }

        } else if (distanciaX <= 0 && distanciaY >= 0) {//Segundo cuadrante
            if (Math.abs(distanciaX) < distanciaY) {
                this.moverAbajo()
            } else {
                this.moverDerecha()
            }
        } else if (distanciaX <= 0 && distanciaY <= 0) {//Tercer cuadrante
            if (distanciaX > distanciaY) {
                this.moverArriba()
            } else {
                this.moverDerecha()
            }
        } else {//Cuarto cuadrante
            if (distanciaX < distanciaY) {
                this.moverArriba()
            } else {
                this.moverIzquierda()
            }
        }

    }, obtainAnimation: function (key) {
        return this.animaciones[key];

    }, animacionPararse: function () {
        this.sprite.runAction(this.obtainAnimation("SIMPLE_" + this.orientacion));

    }, animacionMoverse: function () {
        this.sprite.stopAllActions();
        this.sprite.runAction(this.obtainAnimation("MOVER_" + this.orientacion));

    }




});
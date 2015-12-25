var Octorock = cc.Class.extend({
	//Variables de clase
	animMoverArriba: null,
	animMoverAbajo: null,
	animMoverDerecha: null,
	animMoverIzquierda: null,
	tiempoEntreDisparos: null,
	tiempoUltimoDisparo: null,
	space: null,
	layer: null,
	sprite: null,
	body: null,
	shape: null,

	ctor: function (space, posicion, layer) {
		this.space = space;
		this.layer = layer;

		//Primera prueba: que dispare cada cierto tiempo
		this.tiempoEntreDisparos=2+Math.floor(Math.random()*2);

		this.sprite = new cc.PhysicsSprite("#zelda_abajo0.png");//TODO cambiar animacion
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


		//Animacion Mover Abajo
		var framesCaminarAbajo = this.getAnimacion("zelda_abajo", 6);
		var animacionAbajo = new cc.Animation(framesCaminarAbajo, 0.1);
		this.animCaminarAbajo = cc.RepeatForever.create(new cc.Animate(animacionAbajo));

		//Animacion Mover Arriba
		var framesCaminarArriba = this.getAnimacion("zelda_arriba", 6);
		var animacionArriba = new cc.Animation(framesCaminarArriba, 0.1);
		this.animCaminarArriba = cc.RepeatForever.create(new cc.Animate(animacionArriba));


		layer.addChild(this.sprite, 10);
		return true;


	}, update: function (dt, jugadorX) {

             // aumentar el tiempo que ha pasado desde el ultimo disparo
             this.tiempoEntreDisparos = this.tiempoEntreDisparos + dt;

             // Dispara si el tiempo ha pasado y el jugador está cerca
             if (this.tiempoUtimoSalto > this.tiempoEntreSaltos &&
                 Math.abs(this.body.p.x - jugadorX) < 500) {

                //TODO crear disparo
                 this.tiempoUtimoSalto = 0;
             }

             // TODO Hacer que se mueva siguiendo algun algoritmo
             if (this.body.getVel().x > 0) {
                 this.sprite.flippedX = true;
             } else {
                 this.sprite.flippedX = false;
             }
    }, getAnimacion: function (nombreAnimacion, numFrames) {
		var framesAnimacion = [];
		for (var i = 0; i <= numFrames; i++) {
			var str = nombreAnimacion + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			framesAnimacion.push(frame);
		}
		return framesAnimacion;

	}, moverArriba: function () {
		this.sprite.runAction(this.animMoverrriba);
		var vMoverArriba = cc.RepeatForever.create(cc.MoveBy.create(1, cc.p(0, 50)));
		this.sprite.runAction(vMoverArriba);

	}, moverAbajo: function () {
		this.sprite.runAction(this.animMoverAbajo);
		var vMoverAbajo = cc.RepeatForever.create(cc.MoveBy.create(1, cc.p(0, -50)));
		this.sprite.runAction(vMoverAbajo);

	}, moverDerecha:function () {
		//Se escala a 1 en la x
            this.sprite.scaleX=1;
            this.sprite.runAction(this.animCaminarDerecha);
            var vMoverDerecha =cc.RepeatForever.create(cc.MoveBy.create(1, cc.p(50,0)));
            this.sprite.runAction(vMoverDerecha);

	}, moverIquierda:function () {
		 //Si va a la izquierda se escala a -1 para hacer flip a la animacion
            this.sprite.scaleX=-1;
            this.sprite.runAction(this.animCaminarDerecha);
            var vMoverIzquierda =cc.RepeatForever.create(cc.MoveBy.create(1, cc.p(-50,0)));
            this.sprite.runAction(vMoverIzquierda);
	}

});
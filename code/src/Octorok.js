var Octorok = cc.Class.extend({
	//Variables de clase
	animMoverArriba: null,
	animMoverAbajo: null,
	animMoverDerecha: null,
	animMoverIzquierda: null,
	tiempoEntreDisparos: null,
	tiempoUltimoDisparo: 0,
	space: null,
	layer: null,
	sprite: null,
	body: null,
	shape: null,
	//Sentido hacia el que esta mirando y a donde va a disparar
	//1-> Arriba
	//2-> Derecha
	//3-> Abajo
	//4-> Izquierda
	sentido: 3,

	ctor: function (space, posicion, layer) {
		this.space = space;
		this.layer = layer;

		//Primera prueba: que dispare cada cierto tiempo
		this.tiempoEntreDisparos=5+Math.floor(Math.random()*2);

		this.sprite = new cc.PhysicsSprite("#Octorok_abajo0.png");
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
            this.sprite.getContentSize().width ,
            this.sprite.getContentSize().height );
        // forma dinamica
        this.shape.setCollisionType(tipoOctorock);
        this.space.addShape(this.shape);


		//Animacion Mover Abajo
		var framesCaminarAbajo = this.getAnimacion("Octorok_abajo", 2);
		var animacionAbajo = new cc.Animation(framesCaminarAbajo, 0.1);
		this.animMoverAbajo = cc.RepeatForever.create(new cc.Animate(animacionAbajo));

		//Animacion Mover Arriba
		var framesCaminarArriba = this.getAnimacion("Octorok_arriba", 6);
		var animacionArriba = new cc.Animation(framesCaminarArriba, 0.1);
		this.animMoverArriba = cc.RepeatForever.create(new cc.Animate(animacionArriba));


		layer.addChild(this.sprite, 10);
		return true;


	}, update: function (dt) {
             // aumentar el tiempo que ha pasado desde el ultimo disparo
             this.tiempoUltimoDisparo = this.tiempoUltimoDisparo + dt;

             // Dispara si el tiempo ha pasado
             if (this.tiempoUltimoDisparo > this.tiempoEntreDisparos) {
                 this.tiempoUltimoDisparo = 0;
                 var disparo=new DisparoOctorok(this.space,
                             		cc.p(this.body.p.x,this.body.p.y), this.layer, this.sentido);
				 this.layer.disparosEnemigos.push(disparo);
             }

             // TODO Hacer que se mueva siguiendo algun algoritmo

    }, getAnimacion: function (nombreAnimacion, numFrames) {
		var framesAnimacion = [];
		for (var i = 0; i <= numFrames; i++) {
			var str = nombreAnimacion + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			framesAnimacion.push(frame);
		}
		return framesAnimacion;

	}, moverArriba: function () {
		this.sentido=1;
		this.sprite.runAction(this.animMoverrriba);
		var vMoverArriba = cc.RepeatForever.create(cc.MoveBy.create(1, cc.p(0, 50)));
		this.sprite.runAction(vMoverArriba);

	}, moverAbajo: function () {
		this.sentido=3;
		this.sprite.runAction(this.animMoverAbajo);
		var vMoverAbajo = cc.RepeatForever.create(cc.MoveBy.create(1, cc.p(0, -50)));
		this.sprite.runAction(vMoverAbajo);

	}, moverDerecha:function () {
		this.sentido=2;
		//Se escala a 1 en la x
            this.sprite.scaleX=1;
            this.sprite.runAction(this.animCaminarDerecha);
            var vMoverDerecha =cc.RepeatForever.create(cc.MoveBy.create(1, cc.p(50,0)));
            this.sprite.runAction(vMoverDerecha);

	}, moverIquierda:function () {
			this.sentido=4;
		 	//Si va a la izquierda se escala a -1 para hacer flip a la animacion
            this.sprite.scaleX=-1;
            this.sprite.runAction(this.animCaminarDerecha);
            var vMoverIzquierda =cc.RepeatForever.create(cc.MoveBy.create(1, cc.p(-50,0)));
            this.sprite.runAction(vMoverIzquierda);
	}

});
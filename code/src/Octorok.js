var Octorok = cc.Class.extend({
	//Variables de clase
	animMoverArriba: null,
	animMoverAbajo: null,
	animMoverDerecha: null,
	animMoverIzquierda: null,
	animDispararArriba: null,
	animDispararAbajo: null,
	animDispararDerecha: null,
	animDispararIzquierda: null,
	tiempoEntreDisparos: null,
	tiempoUltimoDisparo: 0,
	space: null,
	layer: null,
	sprite: null,
	body: null,
	shape: null,
	velMovimiento:40,
	tiempoMovimiento: 0,
	tiempoEntreMovimientos:null,
	//Orientacion hacia el que esta mirando y a donde va a disparar
	orientacion: "ABAJO",

	ctor: function (space, posicion, layer) {
		this.space = space;
		this.layer = layer;

		//Primera prueba: que dispare cada cierto tiempo
		this.tiempoEntreDisparos=5+Math.floor(Math.random()*2);
		this.tiempoEntreMovimientos=3+Math.floor(Math.random()*2);

		this.sprite = new cc.PhysicsSprite("#Octorok_abajo0.png");

        // Cuerpo dinamico, SI le afectan las fuerzas
        this.body = new cp.Body(100, Infinity);

        this.body.setPos(posicion);
        this.body.setAngle(0);
        this.body.e = 0;

        this.sprite.setBody(this.body);
        // Se añade el cuerpo al espacio
        this.space.addBody(this.body);

        // forma
        this.shape = new cp.BoxShape(this.body,
            this.sprite.getContentSize().width ,
            this.sprite.getContentSize().height );
        // forma dinamica
        this.shape.setCollisionType(tipoOctorok);
        this.space.addShape(this.shape);


		//Animacion Mover Abajo
		var framesCaminarAbajo = this.getAnimacion("Octorok_abajo", 1);
		var animacionAbajo = new cc.Animation(framesCaminarAbajo, 0.05);
		this.animMoverAbajo = cc.RepeatForever.create(new cc.Animate(animacionAbajo));

		//Animacion Mover Arriba
		var framesCaminarArriba = this.getAnimacion("Octorok_arriba", 1);
		var animacionArriba = new cc.Animation(framesCaminarArriba, 0.05);
		this.animMoverArriba = cc.RepeatForever.create(new cc.Animate(animacionArriba));

		//Animacion Mover Derecha
		var framesCaminarDerecha = this.getAnimacion("Octorok_derecha", 1);
        var animacionDerecha = new cc.Animation(framesCaminarDerecha, 0.05);
        this.animMoverDerecha = cc.RepeatForever.create(new cc.Animate(animacionDerecha));

        //Animacion mover izquierda
		var framesCaminarIzquierda = this.getAnimacion("Octorok_izquierda", 1);
        var animacionIzquierda = new cc.Animation(framesCaminarIzquierda,0.05);
        this.animMoverIzquierda = cc.RepeatForever.create(new cc.Animate(animacionIzquierda));

		//Animacion disparar hacia abajo
		var framesDispararAbajo = this.getAnimacion("Octorok_disparo_abajo", 1);
        var animacionDisparoAbajo = new cc.Animation(framesDispararAbajo, 0.02);
        this.animDispararAbajo = new cc.Sequence(new cc.Animate(animacionDisparoAbajo), new cc.Animate(animacionAbajo));

        //Animacion disparar hacia arriba
        var framesDispararArriba = this.getAnimacion("Octorok_disparo_arriba", 1);
        var animacionDispararArriba = new cc.Animation(framesDispararArriba, 0.02);
        this.animDispararArriba = new cc.Sequence(new cc.Animate(animacionDispararArriba), new cc.Animate(animacionArriba));

        //Animacion disparar hacia la drecha
        var framesDispararDerecha = this.getAnimacion("Octorok_disparo_derecha", 1);
        var animacionDisparoDerecha = new cc.Animation(framesDispararDerecha, 0.02);
        this.animDispararDerecha = new cc.Sequence(new cc.Animate(animacionDisparoDerecha), new cc.Animate(animacionDerecha));

        //Animacion disparar hacia la izquierda
        var framesDispararIzquierda = this.getAnimacion("Octorok_disparo_izquierda", 1);
        var animacionDisparoIzquierda = new cc.Animation(framesDispararIzquierda, 0.02);
        this.animDispararIzquierda = new cc.Sequence(new cc.Animate(animacionDisparoIzquierda), new cc.Animate(animacionIzquierda));


		layer.addChild(this.sprite, 10);
		return true;


	}, update: function (dt) {
             // aumentar el tiempo que ha pasado desde el ultimo disparo
             this.tiempoUltimoDisparo = this.tiempoUltimoDisparo + dt;

             // Dispara si el tiempo ha pasado
             if (this.tiempoUltimoDisparo > this.tiempoEntreDisparos) {
                 this.tiempoUltimoDisparo = 0;
                 this.disparar();
             }


			 //aumentamos el tiempo del movimiento
			 this.tiempoMovimiento= this.tiempoMovimiento+dt;
			 if(this.tiempoMovimiento > this.tiempoEntreMovimientos){
			 	if(this.orientacion=="ARRIBA"){
			 		this.moverDerecha();
			 	} else if(this.orientacion=="DERECHA") {
			 		this.moverAbajo();
			 	} else if(this.orientacion=="ABAJO") {
			 		this.moverIzquierda();
			 	} else {
			 		this.moverArriba();
			 	}
			 	this.tiempoMovimiento=0;
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
		this.orientacion="ARRIBA";
		this.sprite.runAction(this.animMoverArriba);
		this.body.setVel(cp.v(0,this.velMovimiento));

	}, moverAbajo: function () {
		this.orientacion="ABAJO";
		this.sprite.runAction(this.animMoverAbajo);
		this.body.setVel(cp.v(0,-this.velMovimiento));

	}, moverDerecha:function () {
		this.orientacion="DERECHA";
        this.sprite.runAction(this.animMoverDerecha);
		this.body.setVel(cp.v(this.velMovimiento,0));

	}, moverIzquierda:function () {
			this.orientacion="IZQUIERDA";
            this.sprite.runAction(this.animMoverIzquierda);
 			this.body.setVel(cp.v(-this.velMovimiento,0));

	}, disparar: function (){
		if(this.orientacion=="ARRIBA"){
			this.sprite.runAction(this.animDispararArriba);
		}
		if(this.orientacion=="DERECHA"){
			this.sprite.runAction(this.animDispararDerecha);
		}
		if(this.orientacion=="IZQUIERDA"){
			this.sprite.runAction(this.animDispararIzquierda);
		}
		if(this.orientacion=="ABAJO"){
			this.sprite.runAction(this.animDispararAbajo);
		}
/*
		//Crear el disparo
		var disparo=new DisparoOctorok(this.space,
                                     		cc.p(this.body.p.x,this.body.p.y), this.layer, this.orientacion);
        this.layer.disparosEnemigos.push(disparo);

*/
	}, haChocado: function(){
		if(this.orientacion=="ARRIBA"){
			this.moverAbajo();
		}
		if(this.orientacion=="DERECHA"){
			this.moverIzquierda()
		}
		if(this.orientacion=="IZQUIERDA"){
			this.moverDerecha()
		}
		if(this.orientacion=="ABAJO"){
			this.moverArriba();
		}

		this.tiempoEntreMovimientos=0;
	}

});
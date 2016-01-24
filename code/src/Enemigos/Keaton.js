var Keaton = cc.Class.extend({
    //Variables de clase
    space: null,
    layer: null,
    sprite: null,
    body: null,
    shape: null,
    velMovimiento: 50,
    tiempoMovimiento: 0,
    animaciones: [],
    tiempoEntreMovimientos: null,
    //Orientacion hacia el que esta mirando y a donde va a disparar
    orientacion: "ABAJO",
    isMoving: false,
    numVidas:3,

    ctor: function (space, posicion, layer) {
        this.space = space;
        this.layer = layer;
        this.tiempoEntreMovimientos = 4;

        this.sprite = new cc.PhysicsSprite("#Keaton_parado_abajo0.png");

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
            this.sprite.getContentSize().width,
            this.sprite.getContentSize().height);
        // forma dinamica
        this.shape.setCollisionType(tipoKeaton);
        this.space.addShape(this.shape);

        //Añadir las animaciones de keaton
        animationManager.addAnimationsKeaton(this);

        this.layer.mapa.addChild(this.sprite, 2);

        return true;


    }, update: function (dt) {
        //aumentamos el tiempo del movimiento
        this.tiempoMovimiento = this.tiempoMovimiento + dt;
        if (this.tiempoMovimiento > this.tiempoEntreMovimientos) {
            this.sprite.stopAllActions();
            var random = Math.floor(Math.random() * 6);

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
                case 4:
                    this.parar();
                    break;
                case 5:
                    this.atacar();
                    break;
            }

            this.tiempoMovimiento = 0;
        }

    }, moverArriba: function () {
        this.orientacion = "ARRIBA";
        this.animacionMoverse();
        this.body.setVel(cp.v(0, this.velMovimiento));

    }, moverAbajo: function () {
        this.orientacion = "ABAJO";
        this.animacionMoverse();
        this.body.setVel(cp.v(0, -this.velMovimiento));

    }, moverDerecha: function () {
        this.orientacion = "DERECHA";
        this.animacionMoverse();
        this.body.setVel(cp.v(this.velMovimiento, 0));

    }, moverIzquierda: function () {
        this.orientacion = "IZQUIERDA";
        this.animacionMoverse();
        this.body.setVel(cp.v(-this.velMovimiento, 0));

    }, eliminar: function () {
        // quita la forma
        this.space.removeShape(this.shape);
        // quita el sprite
        this.layer.mapa.removeChild(this.sprite);



    }, obtainAnimation: function (key) {
        return this.animaciones[key];

    }, parar: function () {
               this.body.setVel(cp.v(0, 0));
               this.sprite.stopAllActions();
               this.animacionPararse();
               this.isMoving = false;

    }, atacar: function(){
         this.sprite.stopAllActions();
         this.animacionAtacar();
         this.isMoving = false;

    }, animacionPararse: function () {
         this.sprite.scaleX = (this.orientacion == "IZQUIERDA" ? -1 : 1);
         this.sprite.runAction(this.obtainAnimation("SIMPLE_" + this.orientacion));

    }, animacionMoverse: function () {
          this.sprite.stopAllActions();
          this.sprite.scaleX = (this.orientacion == "IZQUIERDA" ? -1 : 1);
          this.sprite.runAction(this.obtainAnimation("MOVER_" + this.orientacion));

    }, animacionAtacar: function() {
       this.sprite.stopAllActions();
       this.sprite.scaleX = (this.orientacion == "IZQUIERDA" ? -1 : 1);
       this.sprite.runAction(this.obtainAnimation("ATACAR_" + this.orientacion));
    }, crearColectable: function () {



                          this.layer.contenedoresCorazon.push(new ContenedorCorazon(this.space, cc.p(this.body.p.x, this.body.p.y), this.layer));



                   }

});
var Link = cc.Class.extend({
    //Variables de clase
    animaciones:[],
    boomerang:null,
    space: null,
    layer: null,
    sprite: null,
    body: null,
    shape: null,
    orientacion: null,
    usingSword:null,
    atackIsDone:null,
    isMoving:null,
    velMovimiento: 70,
    ctor: function (space, posicion, layer) {
        this.space = space;
        this.layer = layer;
        //Orientacion inicial
        this.orientacion="ABAJO";
        //Sprite inicial de link
        this.sprite = new cc.PhysicsSprite("#link_abajo0.png");
        this.sprite.setVertexZ(-100);
        // Cuerpo dinamico, SI le afectan las fuerzas
        this.body = new cp.Body(100, Infinity);

        this.body.setPos(posicion);
        //body.w_limit = 0.02;
        this.body.setAngle(0);
        this.body.e = 0;
        this.sprite.setBody(this.body);
        this.usingSword=false;
        this.atackIsDone=true;
        // Se añade el cuerpo al espacio
        this.space.addBody(this.body);

        // forma
        this.shape = new cp.BoxShape(this.body,
            this.sprite.getContentSize().width - 2,
            this.sprite.getContentSize().height - 2);
        // forma dinamica
        this.shape.setFriction(1);
        this.shape.setCollisionType(tipoJugador);
        this.space.addShape(this.shape);
        //Añadir las animaciones de link
        new AnimationManager(this).addAnimationsLink();

        this.layer.mapa.addChild(this.sprite, 2);
        return true;

    }, moverArriba: function () {
        this.orientacion="ARRIBA";
        this.isMoving=true;
        this.body.setVel(cp.v(this.body.getVel().x, this.velMovimiento));
    }, moverAbajo: function () {
        this.orientacion="ABAJO";
        this.isMoving=true;
        this.body.setVel(cp.v(this.body.getVel().x, -this.velMovimiento));
    }, moverDerecha: function () {
        this.orientacion="DERECHA";
        this.isMoving=true;
        this.body.setVel(cp.v(this.velMovimiento, this.body.getVel().y));
    }, moverIzquierda: function () {
        this.orientacion="IZQUIERDA";
        this.isMoving=true;
        this.body.setVel(cp.v(-this.velMovimiento, this.body.getVel().y));
    }, parado: function ()
    {
           this.body.setVel(cp.v(0, 0));
           this.isMoving=false;
    }, utilizarEspada: function () {
        this.usingSword=true;
    },utilizarBoomerang:function(){
        if(this.boomerang==null)
        {
            this.boomerang=new Boomerang(this.space,cc.p(this.body.p.x, this.body.p.y), this.layer, this.orientacion);
        }
    },update:function(dt){
        //Se hace el update del boomerang si este existe
       if(this.boomerang!=null)
       {
            this.boomerang.update(dt);
       }
       //Solucion al problema del TODO?
       if(this.sprite.getNumberOfRunningActions()==0)
       {
        this.atackIsDone=true;
       }
       if(this.usingSword && this.atackIsDone)
       {
            //Establecer la escala
            this.atackIsDone=false;
            //TODO en raros casos se queda pillado sin hacer el callback de la accion de atacar y no activar nunca el semaforo
            this.sprite.stopAllActions();
            this.sprite.scaleX=(this.orientacion=="IZQUIERDA"? -1:1);
            this.sprite.runAction(this.obtainAnimation("ESPADA_"+this.orientacion));
       }
      if(this.isMoving && this.atackIsDone)
      {
        this.sprite.scaleX=(this.orientacion=="IZQUIERDA"? -1:1);
        this.sprite.runAction(this.obtainAnimation("CAMINAR_"+this.orientacion));
      }
    },obtainAnimation: function(key)
    {
        return this.animaciones[key];
    }
});
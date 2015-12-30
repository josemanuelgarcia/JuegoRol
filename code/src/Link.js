var Link = cc.Class.extend({
    //Variables de clase
    animaciones:[],
    bombs:[],
    animationManager:null,
    boomerang:null,
    space: null,
    layer: null,
    sprite: null,
    body: null,
    shape: null,
    orientacion: null,
    atackIsDone:null,
    isCarrying:null,
    usingSword:null,
    attackSensor:null,
    velMovimiento: 70,
    velCarrying:180,
    ctor: function (space, posicion, layer) {
        this.space = space;
        this.layer = layer;
        //Orientacion inicial
        this.orientacion="ABAJO";
        //Sprite inicial de link
        this.sprite = new cc.PhysicsSprite("#link_caminar_abajo0.png");

        // Cuerpo dinamico, SI le afectan las fuerzas
        this.body = new cp.Body(100, Infinity);

        this.body.setPos(posicion);
        //body.w_limit = 0.02;
        this.body.setAngle(0);
        this.body.e = 0;
        this.sprite.setBody(this.body);
        this.usingSword=false;
        this.atackIsDone=true;
        this.isCarrying=false;
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
        //Sensor de atacar
        this.attackSensor = new cp.CircleShape(this.body, 18, cp.vzero);
        this.attackSensor.setFriction(1);
        this.attackSensor.setCollisionType(tipoEspada);
        this.attackSensor.sensor=true;
        this.space.addShape(this.attackSensor);
        //Añadir las animaciones de link
        this.animationManager=new AnimationManager(this);
        this.animationManager.addAnimationsLink();
        this.layer.mapa.addChild(this.sprite, 2);
        return true;

    }, moverArriba: function () {
        if(!this.isCarrying){
        this.orientacion="ARRIBA";
        this.isMoving=true;
        this.animacionCaminar();
        this.body.setVel(cp.v(this.body.getVel().x, this.velMovimiento));
        }
    }, moverAbajo: function () {
        if(!this.isCarrying)
        {
        this.orientacion="ABAJO";
        this.isMoving=true;
        this.animacionCaminar();
        this.body.setVel(cp.v(this.body.getVel().x, -this.velMovimiento));
        }
    }, moverDerecha: function () {
        if(!this.isCarrying)
        {
        this.orientacion="DERECHA";
        this.isMoving=true;
        this.animacionCaminar();
        this.body.setVel(cp.v(this.velMovimiento, this.body.getVel().y));
        }
    }, moverIzquierda: function () {
        if(!this.isCarrying)
        {
        this.orientacion="IZQUIERDA";
        this.isMoving=true;
        this.animacionCaminar();
        this.body.setVel(cp.v(-this.velMovimiento, this.body.getVel().y));
        }
    }, parado: function ()
    {
        if(!this.isCarrying)
        {
           this.body.setVel(cp.v(0, 0));
           this.animacionPararse();
           }
    }, utilizarEspada: function () {
        this.usingSword=true;
        this.animacionEspada();
    },utilizarBoomerang:function(){
        if(this.boomerang==null)
        {
            this.boomerang=new Boomerang(this.space,cc.p(this.body.p.x, this.body.p.y), this.layer, this.orientacion);
        }
    },utilizarBombas: function()
    {
        this.bombs.push(new Bomba(this.space,cc.p(this.body.p.x, this.body.p.y), this.layer));
    },rodar:function()
    {
        this.isCarrying=true;
        this.sprite.stopAllActions();
        this.getCarrying();
        this.sprite.runAction(this.animationManager.obtainAnimation("RODAR_"+this.orientacion));
    },update:function(dt){
       if(this.boomerang!=null)
       {
            this.boomerang.update(dt);
       }
       //Actualizar bombas
       for(var i=0;i<this.bombs.length;i++)
       {
            this.bombs[i].update(dt);
       }
    },animacionCaminar:function()
    {
                this.sprite.scaleX=(this.orientacion=="IZQUIERDA"? -1:1);
                this.atackIsDone=true;
                this.usingSword=false;
                this.sprite.stopAllActions();
                this.sprite.runAction(this.animationManager.obtainAnimation("CAMINAR_"+this.orientacion));
    },animacionEspada:function()
    {
        if(this.atackIsDone)
        {           this.atackIsDone=false;
                    this.sprite.scaleX=(this.orientacion=="IZQUIERDA"? -1:1);
                    this.sprite.runAction(this.animationManager.obtainAnimation("ESPADA_"+this.orientacion));
        }
    },animacionPararse:function()
    {
        this.sprite.scaleX=(this.orientacion=="IZQUIERDA"? -1:1);
        this.sprite.stopAllActions();
        this.sprite.runAction(this.animationManager.obtainAnimation("SIMPLE_"+this.orientacion));
    },getCarrying:function()
    {
        if(this.orientacion=="IZQUIERDA")
        {
            this.body.setVel(cp.v(-this.velCarrying, this.body.getVel().y));
        }
        else if(this.orientacion=="DERECHA")
        {
            this.body.setVel(cp.v(this.velCarrying, this.body.getVel().y));
        }
        else if(this.orientacion=="ARRIBA")
        {
            this.body.setVel(cp.v(this.body.getVel().x, this.velCarrying));
        }
        else if(this.orientacion=="ABAJO")
        {
            this.body.setVel(cp.v(this.body.getVel().x, -this.velCarrying));
        }
    }
});
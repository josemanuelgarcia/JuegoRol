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
    atackIsDone:null,
    isRodando:null,
    usingSword:null,
    attackSensor:null,
    //Atributos de Link modificables
    velMovimiento: 70,
    velRodar:180,
    numBombas:10,
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
        this.isRodando=false;
        // Se añade el cuerpo al espacio
        this.space.addBody(this.body);

        // forma
        this.shape = new cp.BoxShape(this.body,16, 21);
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

        animationManager.addAnimationsLink(this);
        this.layer.mapa.addChild(this.sprite, 2);
        return true;

    }, moverArriba: function () {
        if(!this.isRodando){
        this.orientacion="ARRIBA";
        this.isMoving=true;
        this.animacionCaminar();
        this.body.setVel(cp.v(this.body.getVel().x, this.velMovimiento));
        }
    }, moverAbajo: function () {
        if(!this.isRodando)
        {
        this.orientacion="ABAJO";
        this.isMoving=true;
        this.animacionCaminar();
        this.body.setVel(cp.v(this.body.getVel().x, -this.velMovimiento));
        }
    }, moverDerecha: function () {
        if(!this.isRodando)
        {
        this.orientacion="DERECHA";
        this.isMoving=true;
        this.animacionCaminar();
        this.body.setVel(cp.v(this.velMovimiento, this.body.getVel().y));
        }
    }, moverIzquierda: function () {
        if(!this.isRodando)
        {
        this.orientacion="IZQUIERDA";
        this.isMoving=true;
        this.animacionCaminar();
        this.body.setVel(cp.v(-this.velMovimiento, this.body.getVel().y));
        }
    },parado: function ()
    {
        if(!this.isRodando)
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
        if(this.numBombas>0)
        {
            new Bomba(this.space,cc.p(this.body.p.x, this.body.p.y), this.layer);
            this.numBombas--;
        }
    },rodar:function()
    {
        this.isRodando=true;
        this.sprite.stopAllActions();
        this.getSentidoRodar();
        this.sprite.runAction(animationManager.obtainAnimation("RODAR_"+this.orientacion));
    },update:function(dt){
       if(this.boomerang!=null)
       {
            this.boomerang.update(dt);
       }

    },animacionCaminar:function()
    {
                this.sprite.scaleX=(this.orientacion=="IZQUIERDA"? -1:1);
                this.atackIsDone=true;
                this.usingSword=false;
                this.sprite.stopAllActions();
                this.sprite.runAction(animationManager.obtainAnimation("CAMINAR_"+this.orientacion));
    },animacionEspada:function()
    {
        if(this.atackIsDone)
        {
            this.atackIsDone=false;
            this.sprite.scaleX=(this.orientacion=="IZQUIERDA"? -1:1);
            this.sprite.runAction(animationManager.obtainAnimation("ESPADA_"+this.orientacion));
        }
    },animacionPararse:function()
    {
        this.sprite.scaleX=(this.orientacion=="IZQUIERDA"? -1:1);
        this.sprite.stopAllActions();
        this.sprite.runAction(animationManager.obtainAnimation("SIMPLE_"+this.orientacion));
    },getSentidoRodar:function()
    {
        if(this.orientacion=="IZQUIERDA")
        {
            this.body.setVel(cp.v(-this.velRodar, this.body.getVel().y));
        }
        else if(this.orientacion=="DERECHA")
        {
            this.body.setVel(cp.v(this.velRodar, this.body.getVel().y));
        }
        else if(this.orientacion=="ARRIBA")
        {
            this.body.setVel(cp.v(this.body.getVel().x, this.velRodar));
        }
        else if(this.orientacion=="ABAJO")
        {
            this.body.setVel(cp.v(this.body.getVel().x, -this.velRodar));
        }
    },lock: function()
    {
       this.atackIsDone=true;
       this.usingSword=false;
       this.isRodando=false;


       if(this.layer.isMovementKeyPressed())
       {
             if(this.orientacion=="ARRIBA")
             {
                 this.moverArriba();
             }
             else if(this.orientacion=="ABAJO")
             {
                this.moverAbajo();
             }
             else if(this.orientacion=="DERECHA")
             {
                this.moverDerecha();
             }
             else if(this.orientacion=="IZQUIERDA")
             {
                 this.moverIzquierda();
             }

       }
       else
       {
           this.parado();
       }

    }
});
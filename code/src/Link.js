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
    attackSensor:null,
    //Atributos de Animacion
    canMove:true,
    walking:false,
    sword:false,
    weapon:false,
    rolling:false,
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
        if(!this.rolling){
            this.orientacion="ARRIBA";
            this.walking=true;
            this.body.setVel(cp.v(this.body.getVel().x, this.velMovimiento));
        }
    }, moverAbajo: function () {
        if(!this.rolling)
        {
            this.orientacion="ABAJO";
            this.walking=true;
            this.body.setVel(cp.v(this.body.getVel().x, -this.velMovimiento));
        }
    }, moverDerecha: function () {
        if(!this.rolling)
        {
            this.orientacion="DERECHA";
            this.walking=true;
            this.body.setVel(cp.v(this.velMovimiento, this.body.getVel().y));
        }
    }, moverIzquierda: function () {
        if(!this.rolling)
        {
            this.orientacion="IZQUIERDA";
            this.walking=true;
            this.body.setVel(cp.v(-this.velMovimiento, this.body.getVel().y));
        }
    },parado: function ()
    {
        if(!this.rolling)
        {
           this.body.setVel(cp.v(0, 0));
           this.walking=false;
           this.canMove=true;
        }
    }, utilizarEspada: function () {
        this.walking=false;
        this.sword=true;
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
        if(!this.walking){
            this.rolling=true;
            this.getSentidoRodar();
        }

    },update:function(dt){
        this.procesarEventos();
        this.realizarAnimaciones();

        if(this.boomerang!=null)
        {
            this.boomerang.update(dt);
        }

    },procesarEventos:function()
    {
        var keyCode = null;
        if(this.layer.teclasPulsadas==0)
            this.parado();
        else
            for(var i = 0; i<this.layer.teclasPulsadas.length;i++)
            {
                keyCode = this.layer.teclasPulsadas[i];
                switch(keyCode)
                {
                    case (cc.KEY.W || cc.KEY.w):
                          this.moverArriba();
                          break;
                    case(cc.KEY.S ||cc.KEY.s):
                        this.moverAbajo();
                        break;
                    case (cc.KEY.D || cc.KEY.d):
                        this.moverDerecha();
                        break;
                    case(cc.KEY.A || cc.KEY.a):
                         this.moverIzquierda();
                         break;
                    case( cc.KEY.M ||  cc.KEY.m):
                        this.utilizarEspada();
                        break;
                    case( cc.KEY.K || cc.KEY.k):
                        this.weapon = true;
                        break;
                    case(cc.KEY.N ||  cc.KEY.n):
                        this.rodar();
                        break;
                }


            }

    },realizarAnimaciones()
    {

        if(this.sword)
            this.animacionEspada();
        else if(this.walking && this.canMove)
            this.animacionCaminar();
        else if(this.rolling)
            this.sprite.runAction(animationManager.obtainAnimation("RODAR_"+this.orientacion));
        else if(!this.walking)
            this.animacionPararse();

    }
    ,animacionCaminar:function()
    {
        this.sprite.stopAllActions();
        this.canMove = false;
        this.sprite.scaleX=(this.orientacion=="IZQUIERDA"? -1:1);
        this.sprite.runAction(animationManager.obtainAnimation("CAMINAR_"+this.orientacion));

    },animacionEspada:function()
    {
        this.sprite.scaleX=(this.orientacion=="IZQUIERDA"? -1:1);
        this.sprite.runAction(animationManager.obtainAnimation("ESPADA_"+this.orientacion));

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
    },swordFinished:function()
    {
        this.sword = false;
    },rollingFinished:function()
    {
        this.rolling=false;
    },setCanMove:function()
    {
        this.canMove = true;
    }


});
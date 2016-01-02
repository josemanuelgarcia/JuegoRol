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
    stopped:false,
    flagCaminar:false,
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
        if(this.canMove){
            this.orientacion="ARRIBA";
            this.walking=true;
            this.body.setVel(cp.v(0, this.velMovimiento));
        }
    }, moverAbajo: function () {
        if(this.canMove)
        {
            this.orientacion="ABAJO";
            this.walking=true;
            this.body.setVel(cp.v(0, -this.velMovimiento));
        }
    }, moverDerecha: function () {
        if(this.canMove)
        {
            this.orientacion="DERECHA";
            this.walking=true;
            this.body.setVel(cp.v(this.velMovimiento, 0));
        }
    }, moverIzquierda: function () {
        if(this.canMove)
        {
            this.orientacion="IZQUIERDA";
            this.walking=true;
            this.body.setVel(cp.v(-this.velMovimiento,0));
        }
    },parado: function ()
    {
        if(!this.rolling)
        {
           this.body.setVel(cp.v(0, 0));
           this.walking=false;
           this.canMove=true;
           this.stopped=true;
        }
    }, utilizarEspada: function () {
        this.body.setVel(cp.v(0, 0));
        this.canMove=false;
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
        if(this.walking){
            this.rolling=true;
            this.canMove=false;
            this.walking=false;
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
        if(this.layer.teclasPulsadas.length>0)
            cc.log(this.layer.teclasPulsadas);
        //Si no se ha pulsado ninguna tecla se deja parado
        if(this.layer.teclasPulsadas.length==0)
            this.parado();
        else
        {
            this.stopped = false;
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
                        this.layer.eliminarTeclaPulsada(keyCode);
                        this.utilizarEspada();
                        break;
                    case( cc.KEY.K || cc.KEY.k):
                        this.layer.eliminarTeclaPulsada(keyCode);
                        this.useWeapon();
                        break;
                    case(cc.KEY.N ||  cc.KEY.n):
                        this.layer.eliminarTeclaPulsada(keyCode);
                        this.rodar();
                        break;

                }
            }

        }

    },realizarAnimaciones:function()
    {
        //cc.log("Sword: "+this.sword +"\n" + "Walking: "+this.walking + "\n" + "Rolling: " + this.rolling);
        if(this.walking && this.canMove)
            this.animacionCaminar();
        else if(this.sword)
            this.animacionEspada();
        else if(this.rolling)
            this.animacionRodar();
        else if(this.stopped)
            this.animacionPararse();

    },animacionRodar:function(){

        this.sprite.runAction(this.obtainAnimation("RODAR_"+this.orientacion));
    }
    ,animacionCaminar:function()
    {
        this.sprite.stopAllActions();
        this.canMove = false;
        this.sprite.scaleX=(this.orientacion=="IZQUIERDA"? -1:1);

        this.sprite.runAction(this.obtainAnimation("CAMINAR_"+this.orientacion));

    },animacionEspada:function()
    {
        this.sprite.scaleX=(this.orientacion=="IZQUIERDA"? -1:1);
        this.sprite.runAction(this.obtainAnimation("ESPADA_"+this.orientacion));

    },animacionPararse:function()
    {
        this.sprite.scaleX=(this.orientacion=="IZQUIERDA"? -1:1);
        this.sprite.runAction(this.obtainAnimation("SIMPLE_"+this.orientacion));

    },getSentidoRodar:function()
    {
        switch(this.orientacion)
        {
            case "IZQUIERDA":
                this.body.setVel(cp.v(-this.velRodar, 0));
                break;
            case "DERECHA":
                this.body.setVel(cp.v(this.velRodar, 0));
                break;
            case "ARRIBA":
                 this.body.setVel(cp.v(0, this.velRodar));
                 break;
            case "ABAJO":
                this.body.setVel(cp.v(0, -this.velRodar));
                break;
        }
    },useWeapon: function(){

         if(weapon=="BOOMERANG")
         {
             this.utilizarBoomerang();
         }
         else if(weapon=="BOMBAS")
         {
             this.utilizarBombas();
         }
    }
    ,swordFinished:function()
    {
        this.sword = false;
    },rollingFinished:function()
    {
        this.rolling=false;
        this.canMove=true;
    },setCanMove:function()
    {
        this.canMove = true;
    }, obtainAnimation: function (key) {
             return this.animaciones[key];
    }


});
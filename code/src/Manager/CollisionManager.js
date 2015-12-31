//Tipos para las colisiones
var tipoNoPasable = 1;
var tipoJugador = 2;
var tipoOctorok = 3;
var tipoDisparoOctorok = 4;
var tipoBoomerang=5;
var tipoCorazon=6;
var tipoRupia=7;
var tipoBomba=8;
var tipoEspada=9;
var tipoCueva=10;
var tipoJarron=11;
var tipoBloque=12;
var CollisionManager = cc.Class.extend({

    space:null,
    layer:null,
    ctor:function(space,layer)
    {
        this.space = space;
        this.layer = layer;

        this.addHandlerCollisions();


    },addHandlerCollisions:function()
    {
        //Colisiones entre elementos
        this.space.addCollisionHandler(tipoNoPasable, tipoOctorok,null, null, this.collisionObjetoConOctorok.bind(this), null);

        this.space.addCollisionHandler(tipoNoPasable, tipoDisparoOctorok,null, null, this.collisionObjetoConDisparo.bind(this), null);

        this.space.addCollisionHandler(tipoBoomerang, tipoJugador, null,this.collisionBoomerangConJugador.bind(this), null, null);

        this.space.addCollisionHandler(tipoBoomerang, tipoNoPasable, null,this.collisionBoomerangConNoPasable.bind(this), null, null);

         this.space.addCollisionHandler(tipoBoomerang, tipoOctorok,null,this.collisionBoomerangConOctorock.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoCorazon,null,this.collisionJugadorConCorazon.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoRupia,null,this.collisionJugadorConRupia.bind(this), null, null);

        this.space.addCollisionHandler(tipoEspada, tipoOctorok, null,this.collisionEspadaConEnemigo.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoOctorok, null, null, null, this.reducirVidas.bind(this));

        this.space.addCollisionHandler(tipoJugador,tipoBomba, this.reducirVidas.bind(this), null, null, null);

        this.space.addCollisionHandler(tipoJugador,tipoCueva,null,this.transportarLink.bind(this),null,null);

        this.space.addCollisionHandler(tipoEspada,tipoJarron,null,this.destruirJarron.bind(this),null,null);


    }, collisionObjetoConOctorok: function (arbiter, space) {
             //  this.octorok.haChocado();

    }, collisionObjetoConDisparo: function (arbiter, space) {
         var shapes = arbiter.getShapes();
         var vel = shapes[1].getBody().getVel();

         this.layer.shapesToRemove.push(shapes[1]);

    }, collisionBoomerangConJugador: function (arbiter, space) {
         if(this.layer.link.boomerang.canBeDeleted) {
             var shapes = arbiter.getShapes();
             this.layer.shapesToRemove.push(shapes[0]);
         }
    },collisionBoomerangConNoPasable: function (arbiter, space) {
         this.layer.link.boomerang.choco=true;

    },collisionBoomerangConOctorock: function (arbiter, space) {
            var shapes = arbiter.getShapes();
            this.layer.shapesToRemove.push(shapes[1]);
            //TODO quitar vida a octorok
    },collisionJugadorConCorazon:function(arbiter,space){
         iuLayer.darVidas();
         var shapes = arbiter.getShapes();
         this.layer.shapesToRemove.push(shapes[1]);
    },collisionJugadorConRupia:function(arbiter,space){
         var shapes = arbiter.getShapes();
         for (var i = 0; i < this.layer.rupias.length; i++) {
            if (this.layer.rupias[i].shape === shapes[1]) {
             this.layer.rupias[i].agregarRupias();
           }
         }
       this.layer.shapesToRemove.push(shapes[1]);

    },transportarLink:function(arbiter,space)
    {
         var shapes = arbiter.getShapes();
         var shape = shapes[1];
         var cueva = null;
         for(var i = 0; i<this.cuevas.length ; i++)
         {
             if(shape === this.layer.cuevas[i].shape)
                 cueva = this.layer.cuevas[i];
         }

         var pos = cueva.getPosSalida();
         var newPos = cc.p(pos.x,this.mapaAlto - pos.y);
         var scene=this.layer.getParent();
         posicion=newPos;
         //Para que no siga avanzando hacia arriba
         this.layer.link.parado();
         cc.director.pause();
         cc.director.runScene(cc.TransitionFade.create(3.0,new GameScene(newPos)));
         cc.director.resume();
    },destruirJarron:function(arbiter,space)
    {
         var shapes = arbiter.getShapes();
         if(this.layer.link.usingSword)
         {
             if(this.layer.mathUtil.isInViewCone(this.layer.link.body.p,shapes[1].body.p,0.5,this.layer))
             {
                 this.layer.shapesToRemove.push(shapes[1]);
             }
         }

    },collisionEspadaConEnemigo:function(arbiter,space){
          var shapes = arbiter.getShapes();
          if(this.layer.link.usingSword)
          {
              if(this.layer.mathUtil.isInViewCone(this.layer.link.body.p,shapes[1].body.p,0.5,this.layer))
              {
                  this.layer.shapesToRemove.push(shapes[1]);
              }
          }
    },reducirVidas: function (arbiter, space) {
         iuLayer.quitarVidas();
         //TODO las vidas hay que quitarselas a link no a la interfaz xD

    }

});
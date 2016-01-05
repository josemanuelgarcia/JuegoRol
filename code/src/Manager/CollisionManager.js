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
var tipoSoldado=13;
var CollisionManager = cc.Class.extend({

    space:null,
    layer:null,
    ctor:function(space,layer) {
        this.space = space;
        this.layer = layer;

        this.addHandlerCollisions();

    }, addHandlerCollisions:function(){
        //Colisiones entre elementos
        this.space.addCollisionHandler(tipoBoomerang, tipoJugador, null,this.collisionBoomerangConJugador.bind(this), null, null);

        this.space.addCollisionHandler(tipoBoomerang, tipoNoPasable, null,this.collisionBoomerangConNoPasable.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoCorazon,null,this.collisionJugadorConCorazon.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoRupia,null,this.collisionJugadorConRupia.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador,tipoBomba, this.reducirVidas.bind(this), null, null, null);

        this.space.addCollisionHandler(tipoEspada,tipoJarron,this.destruirJarron.bind(this),null,null,null);

        //Colisiones con Octorok
        this.space.addCollisionHandler(tipoNoPasable, tipoOctorok,null, null, this.collisionObjetoConOctorok.bind(this), null);

        this.space.addCollisionHandler(tipoNoPasable, tipoDisparoOctorok,null, null, this.collisionObjetoConDisparo.bind(this), null);

        this.space.addCollisionHandler(tipoJarron, tipoDisparoOctorok,null, null, this.collisionObjetoConDisparo.bind(this), null);

        this.space.addCollisionHandler(tipoSoldado, tipoDisparoOctorok,null, null, this.collisionObjetoConDisparo.bind(this), null);

        this.space.addCollisionHandler(tipoJugador, tipoDisparoOctorok,null, null, this.collisionJugadorConDisparo.bind(this), null);

        this.space.addCollisionHandler(tipoBoomerang, tipoOctorok,null,this.destruirSegundo.bind(this), null, null);

        this.space.addCollisionHandler(tipoBomba, tipoOctorok,null,this.destruirSegundo.bind(this), null, null);

        this.space.addCollisionHandler(tipoEspada, tipoOctorok, null,this.collisionEspadaConEnemigo.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoOctorok, null, null, null, this.reducirVidas.bind(this));

        //Colisiones Soldado
        this.space.addCollisionHandler(tipoBoomerang, tipoSoldado,null,this.destruirSegundo.bind(this), null, null);

        this.space.addCollisionHandler(tipoBomba, tipoSoldado,null,this.destruirSegundo.bind(this), null, null);

        this.space.addCollisionHandler(tipoEspada, tipoSoldado, this.collisionEspadaConEnemigo.bind(this),null, null, null);

        this.space.addCollisionHandler(tipoJugador, tipoSoldado, this.reducirVidas.bind(this), null, null, null);



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
    }, collisionBoomerangConNoPasable: function (arbiter, space) {
         this.layer.link.boomerang.choco=true;

    }, destruirSegundo: function (arbiter, space) {
            var shapes = arbiter.getShapes();
            this.layer.shapesToRemove.push(shapes[1]);

    }, collisionJugadorConCorazon:function(arbiter,space){
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

    }, transportarLink:function(arbiter,space) {
         var shapes = arbiter.getShapes();
         var shape = shapes[1];
         var cueva = null;
         for(var i = 0; i<this.layer.cuevas.length ; i++) {
             if(shape === this.layer.cuevas[i].shape)
                 cueva = this.layer.cuevas[i];
         }

         var pos = cueva.getPosSalida();
         var newPos = cc.p(pos.x,this.layer.mapaAlto - pos.y);
         this.layer.transicion();

    }, destruirJarron:function(arbiter,space) {
         var shapes = arbiter.getShapes();
         if(this.layer.link.sword) {
             if(this.layer.mathUtil.isInViewCone(this.layer.link.body.p,shapes[1].body.p,0.5,this.layer)) {
                 this.layer.shapesToRemove.push(shapes[1]);
             }
         }

    }, collisionEspadaConEnemigo:function(arbiter,space){
          var shapes = arbiter.getShapes();

          if(this.layer.link.sword) {
              if(this.layer.mathUtil.isInViewCone(this.layer.link.body.p,shapes[1].body.p,0.5,this.layer)) {
                  var normal =  arbiter.getContactPointSet()[0].normal;
                  //shapes[1].getBody().applyImpulse(cc.v(normal.x*10,normal.y*10),cp.v(0,0));
                  this.layer.shapesToRemove.push(shapes[1]);
              }
          }
    }, reducirVidas: function (arbiter, space) {
         iuLayer.quitarVidas();
         //TODO las vidas hay que quitarselas a link no a la interfaz xD

    }, collisionJugadorConDisparo: function(arbiter, space) {
         var shapes = arbiter.getShapes();
         var vel = shapes[1].getBody().getVel();
         this.layer.shapesToRemove.push(shapes[1]);
         iuLayer.quitarVidas();

    }

});
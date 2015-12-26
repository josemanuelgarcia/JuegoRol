var IULayer = cc.Layer.extend({
    spriteBotonMenu:null,
    spriteBSumarVidas:null,
    spriteArmaElegida:null,
    spriteRupias:null,
    rupias:0,
     corazones:1,
     posicionSpriteCorazones:0,
    ctor:function () {
        this._super();
        var size = cc.winSize;

            //se llama par pintar las vidas iniciales
           this.pintarVidas();



           // boton para comprobar q se suman vidas (es provisional y lo podeis quitar si quereis)
                   this.spriteBSumarVidas = cc.Sprite.create(res.corazon_png);
                   this.spriteBSumarVidas.setPosition(cc.p(30,150));
                   this.addChild(this.spriteBSumarVidas);




          // Contador Rupias
          this.spriteRupias = cc.Sprite.create(res.rupiaazul_png);
          this.spriteRupias.setPosition(cc.p(size.width-55,28));
           this.addChild(this.spriteRupias);

            this.etiquetaMonedas = new cc.LabelTTF("0", "Helvetica", 20);
            this.etiquetaMonedas.setPosition(cc.p((size.width)-30, 25));
            this.etiquetaMonedas.fillStyle = new cc.Color(255, 255, 255, 255);
            this.addChild(this.etiquetaMonedas);

        // spriteBotonMenu
        this.spriteBotonMenu = cc.Sprite.create(res.boton_saltar_png);
        this.spriteBotonMenu.setPosition(cc.p(80,80));

        this.addChild(this.spriteBotonMenu);

        //Sprite en el que se muestra el arma elegida
                this.spriteArmaElegida = cc.Sprite.create(res.espada_reducida_png);
                this.spriteArmaElegida.setPosition(cc.p(size.width-40,size.height-40));

                this.addChild(this.spriteArmaElegida);







        // Registrar Mouse Down
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
onMouseDown: this.procesarMouseDown
        }, this)

        this.scheduleUpdate();
        return true;
    },procesarMouseDown:function(event) {

        var instancia = event.getCurrentTarget();
        var areaBoton = instancia.spriteBotonMenu.getBoundingBox();
        var areaCorazon = instancia.spriteBSumarVidas.getBoundingBox();

        // La pulsación cae dentro del botón de menu
        if (cc.rectContainsPoint(areaBoton,cc.p(event.getLocationX(), event.getLocationY()) )){
        cc.director.pause();
         var gameScene = instancia.getParent();

          // tenemos el objeto GameScene y le añadimos la nueva layer
         gameScene.addChild(new MenuObjetosLayer(gameScene),0,3);

        }

        //Pulsacion dentro de corazon lo cual añade una vida
         if (cc.rectContainsPoint(areaCorazon,
           cc.p(event.getLocationX(), event.getLocationY()) )){
           var instanciaIU = event.getCurrentTarget();

                   // Metodo que suma una vida
                instanciaIU.darVidas();

                instanciaIU.agregarRupia();

                //Metodo que repinta las nuevas vidas
               instanciaIU.pintarVidas();
                }

    },agregarRupia:function(){
               this.rupias++;
               this.etiquetaMonedas.setString(""+this.rupias);

     },darVidas:function(){

               this.corazones = this.corazones+1;

    },quitarVidas:function(){

            this.corazones = this.corazones-1;

     },pintarVidas()
    {


     // spriteVidas
            for (var i = 0; i < this.corazones; i++) {
            //actualizamos la posicion de la nueva vida
            this.posicionSpriteCorazones = this.posicionSpriteCorazones+30;
           //creamos el sprite del corazon
                          var spriteVidas  = cc.Sprite.create(res.corazon_png);
                            spriteVidas.setPosition(cc.p(this.posicionSpriteCorazones ,cc.winSize.height-30));

                            //añadimos el sprite
                            this.addChild(spriteVidas);
                      }

      //Restauramos la posicion a 0 para poder volver a usarla en el futuro desde 0 otra vez
     this.posicionSpriteCorazones=0;
    }
});

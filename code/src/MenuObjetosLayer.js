
var MenuObjetosLayer = cc.LayerColor.extend({
scene:null,
    ctor:function (scene) {
        this._super();
        var size = cc.winSize;
        this.scene=scene;

// Fondo
        var spriteFondoTitulo= new cc.Sprite(res.fondomenu2_png);
        // Asigno posición central
        spriteFondoTitulo.setPosition(cc.p(size.width / 2, size.height / 2));
        // Lo escalo porque es más pequeño que la pantalla
        spriteFondoTitulo.setScale(size.height / spriteFondoTitulo.height);
        // Añado Sprite a la escena
        this.addChild(spriteFondoTitulo);

        //MenuItemSprite para boton arco
        var menuArcoSprite = new cc.MenuItemSprite(
            new cc.Sprite(res.arco_png), // IMG estado normal
            new cc.Sprite(res.arco_png), // IMG estado pulsado
            this.pulsarBotonArco, this);

        //MenuItemSprite para boton espada
                var menuEspadaSprite = new cc.MenuItemSprite(
                    new cc.Sprite(res.espada_png), // IMG estado normal
                    new cc.Sprite(res.espada_png), // IMG estado pulsado
                    this.pulsarBotonEspada, this);

        //MenuItemSprite para boton boomerán
                var menuBoomeranSprite = new cc.MenuItemSprite(
                    new cc.Sprite(res. boomeran_png), // IMG estado normal
                    new cc.Sprite(res. boomeran_png), // IMG estado pulsado
                    this.pulsarBotonBoomeran, this);

        //MenuItemSprite para boton bombas
                var menuBombaSprite = new cc.MenuItemSprite(
                    new cc.Sprite(res.bomba_png), // IMG estado normal
                    new cc.Sprite(res.bomba_png), // IMG estado pulsado
                    this.pulsarBotonBombas, this);


        // creo el menú pasándole el boton del arco
        var menuArco = new cc.Menu(menuArcoSprite);
        menuArco.setPosition(cc.p((size.width / 2)-40, (size.height * 0.25)+60));

         // creo el menú pasándole el boton de la espada
         var menuEspada = new cc.Menu(menuEspadaSprite);
         menuEspada.setPosition(cc.p((size.width / 2)+40, (size.height * 0.25)+60));

          // creo el menú pasándole el boton del boomerán
          var menuBoomeran = new cc.Menu(menuBoomeranSprite);
          menuBoomeran.setPosition(cc.p((size.width / 2)-40, (size.height * 0.25)+140));

           // creo el menú pasándole el boton de las bombas
           var menuBombas = new cc.Menu(menuBombaSprite);
           menuBombas.setPosition(cc.p((size.width / 2)+40, (size.height * 0.25)+140));





        // Añado los menús a la escena
        this.addChild(menuArco);
        this.addChild(menuEspada);
        this.addChild(menuBoomeran);
        this.addChild(menuBombas);


        return true;
    }, pulsarBotonArco : function(){
                cc.director.resume();
               this.scene.removeChild(this);

    }, pulsarBotonEspada : function(){
                          cc.director.resume();
                          this.scene.removeChild(this);
    }, pulsarBotonBoomeran : function(){
                     cc.director.resume();
                     this.scene.removeChild(this);
    }, pulsarBotonBombas : function(){
                      cc.director.resume();
                      this.scene.removeChild(this);
    }

});






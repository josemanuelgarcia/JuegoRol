var MenuLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.winSize;

        //Cacheo de recursos graficos
        cc.spriteFrameCache.addSpriteFrames(res.octorok_plist);
        cc.spriteFrameCache.addSpriteFrames(res.soldadoVerde_plist);
        cc.spriteFrameCache.addSpriteFrames(res.soldadoRojo_plist);
        cc.spriteFrameCache.addSpriteFrames(res.keaton_plist);
        cc.spriteFrameCache.addSpriteFrames(res.link_plist);
        cc.spriteFrameCache.addSpriteFrames(res.boomerang_plist);
        cc.spriteFrameCache.addSpriteFrames(res.explosion_plist);
        cc.spriteFrameCache.addSpriteFrames(res.jarron_plist);
        cc.spriteFrameCache.addSpriteFrames(res.objetosAnimados_plist);
        cc.spriteFrameCache.addSpriteFrames(res.objetosMazmorra_plist);

        // Fondo
        var spriteFondoTitulo = new cc.Sprite(res.fondomenu_png);
        // Asigno posición central
        spriteFondoTitulo.setPosition(cc.p(size.width / 2, size.height / 2));
        // Lo escalo porque es más pequeño que la pantalla
        spriteFondoTitulo.setScale(size.height / spriteFondoTitulo.height);
        // Añado Sprite a la escena
        this.addChild(spriteFondoTitulo);

        //MenuItemSprite para cada botón
        var menuBotonJugar = new cc.MenuItemSprite(
            new cc.Sprite(res.boton_jugar_png), // IMG estado normal
            new cc.Sprite(res.boton_jugar_png), // IMG estado pulsado
            this.pulsarBotonJugar, this);


        // creo el menú pasándole los botones
        var menu = new cc.Menu(menuBotonJugar);
        // Asigno posición central
        menu.setPosition(cc.p(size.width / 2, size.height / 2));
        // Añado el menú a la escena
        this.addChild(menu);



        //----------------Boton cargar partida-------------------------
        //MenuItemSprite para cada botón
        var menuBotonCargar = new cc.MenuItemSprite(
            new cc.Sprite(res.boton_cargar_png), // IMG estado normal
            new cc.Sprite(res.boton_cargar_png), // IMG estado pulsado
            this.pulsarBotonCargar, this);


        // creo el menú pasándole los botones
        var menuG = new cc.Menu(menuBotonCargar);
        // Asigno posición central
        menuG.setPosition(cc.p(size.width / 2, size.height * 0.25));
        // Añado el menú a la escena
        this.addChild(menuG);
        //-------------------------------------------------------------

        return true;
    }, pulsarBotonJugar: function () {
        cc.director.runScene(new GameScene());
    }, pulsarBotonCargar: function () {
        var estoyEnCave = loadDollNum("estoyEnCave", 1);
        cargarPartida = true;
        console.log(""+estoyEnCave);
        if(estoyEnCave==""+"true"){
        console.log("cargar partida");
        cc.director.runScene(new CaveScene());
        }
        else{
         console.log("cargar partida");
                cc.director.runScene(new GameScene());
        }
    }

});

var MenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});


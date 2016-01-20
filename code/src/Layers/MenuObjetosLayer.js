
var MenuObjetosLayer = cc.LayerColor.extend({
    scene: null,
    etiquetaBombas:null,
    etiquetaFlechas:null,
    GameLayer:null,
    size:null,
    ctor: function (scene) {
        this._super();
        this.size = cc.winSize;
        this.scene = scene;
        this.GameLayer =  this.scene.getChildByTag(idCapaJuego);

        // Fondo
        var spriteFondoTitulo = new cc.Sprite(res.fondomenu4_png);
        // Asigno posición central
        spriteFondoTitulo.setPosition(cc.p(this.size.width / 2, this.size.height / 2));
        // Lo escalo porque es más pequeño que la pantalla
        spriteFondoTitulo.setScale(this.size.height / spriteFondoTitulo.height);
        // Añado Sprite a la escena
        this.addChild(spriteFondoTitulo);

        //MenuItemSprite para boton arco
        var menuArcoSprite = new cc.MenuItemSprite(
            new cc.Sprite(res.arco_png), // IMG estado normal
            new cc.Sprite(res.arco_png), // IMG estado pulsado
            this.pulsarBotonArco, this);
           // menuArcoSprite.setOpacity(160);

        //MenuItemSprite para boton espada
        var menuEspadaSprite = new cc.MenuItemSprite(
            new cc.Sprite(res.espada_png), // IMG estado normal
            new cc.Sprite(res.espada_png), // IMG estado pulsado
            this.pulsarBotonEspada, this);
         //   menuEspadaSprite.setOpacity(160);

        //MenuItemSprite para boton boomerán
        var menuBoomeranSprite = new cc.MenuItemSprite(
            new cc.Sprite(res.boomeran_png), // IMG estado normal
            new cc.Sprite(res.boomeran_png), // IMG estado pulsado
            this.pulsarBotonBoomeran, this);
          //  menuBoomeranSprite.setOpacity(160);

        //MenuItemSprite para boton bombas
        var menuBombaSprite = new cc.MenuItemSprite(
            new cc.Sprite(res.bomba_png), // IMG estado normal
            new cc.Sprite(res.bomba_png), // IMG estado pulsado
            this.pulsarBotonBombas, this);
   //     menuBombaSprite.setOpacity(160);


     //numero de flechas que le quedan
           this.etiquetaFlechas = new cc.LabelTTF("" + this.GameLayer.link.numFlechas, "Helvetica", 20);
           this.etiquetaFlechas.setPosition(cc.p((this.size.width / 2) - 45, (this.size.height * 0.25) + 200));
           this.etiquetaFlechas.fillStyle = new cc.Color(255, 255, 255, 255);

        // creo el menú pasándole el boton del arco
        var menuArco = new cc.Menu(menuArcoSprite);
        menuArco.setPosition(cc.p((this.size.width / 2) - 60, (this.size.height * 0.25) + 210));

        // creo el menú pasándole el boton de la espada
        var menuEspada = new cc.Menu(menuEspadaSprite);
        menuEspada.setPosition(cc.p((this.size.width / 2) + 180, (this.size.height * 0.25) + 210));

        // creo el menú pasándole el boton del boomerán
        var menuBoomeran = new cc.Menu(menuBoomeranSprite);
        menuBoomeran.setPosition(cc.p((this.size.width / 2) - 180, (this.size.height * 0.25)+210));




         //numero de bombas que le quedan
        this.etiquetaBombas = new cc.LabelTTF("" + this.GameLayer.link.numBombas, "Helvetica", 20);
        this.etiquetaBombas.setPosition(cc.p((this.size.width / 2) + 75, (this.size.height * 0.25) + 200));
        this.etiquetaBombas.fillStyle = new cc.Color(255, 255, 255, 255);

        // creo el menú pasándole el boton de las bombas
        var menuBombas = new cc.Menu(menuBombaSprite);
        menuBombas.setPosition(cc.p((this.size.width / 2) + 60, (this.size.height * 0.25) + 210));






        // Añado los menús a la escena
        this.addChild(menuArco);
        this.addChild(menuEspada);
        this.addChild(menuBoomeran);
        this.addChild(menuBombas);
         this.addChild(this.etiquetaBombas);
        this.addChild(this.etiquetaFlechas);
        return true;
    }, pulsarBotonArco: function () {
        cc.director.resume();
        var IULayer = this.scene.getChildByTag(2);
        weapon="ARCO";
        //Sprite en el que se muestra el arma elegida
        IULayer.spriteArmaElegida.setTexture(res.arco_reducido_png);

        //sera el numero de flechas de link
                        IULayer.numeroArmas = this.GameLayer.link.numFlechas;
                        IULayer.crearLabelArmas();
                                IULayer.numeroDeArmasDisponiblesLabel.setVisible(true);

        this.scene.getChildByTag(2).entrar=true;
        this.scene.removeChild(this);



    }, pulsarBotonEspada: function () {
        cc.director.resume();
        var IULayer = this.scene.getChildByTag(2);
        //Sprite en el que se muestra el arma elegida
        weapon="ESPADA";
        IULayer.spriteArmaElegida.setTexture(res.espada_reducida_png);

                        IULayer.numeroArmas =0;
IULayer.crearLabelArmas();
        IULayer.numeroDeArmasDisponiblesLabel.setVisible(false);

         this.scene.getChildByTag(2).entrar=true;
        this.scene.removeChild(this);
    }, pulsarBotonBoomeran: function () {
        cc.director.resume();
        var IULayer = this.scene.getChildByTag(2);
        //Sprite en el que se muestra el arma elegida
       weapon="BOOMERANG";
        IULayer.spriteArmaElegida.setTexture(res.boomeran_reducido_png);
                IULayer.numeroArmas =0;
                IULayer.crearLabelArmas();
                        IULayer.numeroDeArmasDisponiblesLabel.setVisible(false);
         this.scene.getChildByTag(2).entrar=true;
        this.scene.removeChild(this);


    }, pulsarBotonBombas: function () {
        cc.director.resume();
        var IULayer = this.scene.getChildByTag(2);
        //Sprite en el que se muestra el arma elegida
        weapon="BOMBAS";
        IULayer.spriteArmaElegida.setTexture(res.bomba_reducida_png);
        IULayer.numeroArmas = this.GameLayer.link.numBombas;
        IULayer.crearLabelArmas();
        IULayer.numeroDeArmasDisponiblesLabel.setVisible(true);


        IULayer.entrar=true;
        this.scene.removeChild(this);


    }

});






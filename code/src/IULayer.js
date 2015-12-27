var IULayer = cc.Layer.extend({
    spriteBotonMenu: null,
    spriteBSumarVidas: null,
    spriteBQuitarVidas: null,
    spriteArmaElegida: null,
    spriteRupias: null,
    rupias: 0,
    corazones: 1,
    posicionSpriteCorazones: 0,
    alturaSpriteCOrazones: 30,
    ctor: function () {
        this._super();
        var size = cc.winSize;

        //se llama par pintar las vidas iniciales
        this.pintarVidas();



        // boton para comprobar q se suman vidas (es provisional y lo podeis quitar si quereis)
        this.spriteBSumarVidas = cc.Sprite.create(res.corazon_png);
        this.spriteBSumarVidas.setPosition(cc.p(30, 150));
        this.addChild(this.spriteBSumarVidas);

        // boton para comprobar q se quitan vidas (es provisional y lo podeis quitar si quereis)
        this.spriteBQuitarVidas = cc.Sprite.create(res.corazonnegro_png);
        this.spriteBQuitarVidas.setPosition(cc.p(30, 250));
        this.addChild(this.spriteBQuitarVidas);


        // Contador Rupias
        this.spriteRupias = cc.Sprite.create(res.rupiaazul_png);
        this.spriteRupias.setPosition(cc.p(size.width - 55, 28));
        this.addChild(this.spriteRupias);

        this.etiquetaMonedas = new cc.LabelTTF("0", "Helvetica", 20);
        this.etiquetaMonedas.setPosition(cc.p((size.width) - 30, 25));
        this.etiquetaMonedas.fillStyle = new cc.Color(255, 255, 255, 255);
        this.addChild(this.etiquetaMonedas);

        // spriteBotonMenu
        this.spriteBotonMenu = cc.Sprite.create(res.boton_saltar_png);
        this.spriteBotonMenu.setPosition(cc.p(80, 80));

        this.addChild(this.spriteBotonMenu);

        //Sprite en el que se muestra el arma elegida
        this.spriteArmaElegida = cc.Sprite.create(res.arco_reducido_png);
        this.spriteArmaElegida.setPosition(cc.p(size.width - 40, size.height - 40));

        this.addChild(this.spriteArmaElegida);







        // Registrar Mouse Down
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: this.procesarMouseDown
        }, this)

        this.scheduleUpdate();
        return true;
    }, procesarMouseDown: function (event) {

        var instancia = event.getCurrentTarget();
        var areaBoton = instancia.spriteBotonMenu.getBoundingBox();
        var areaCorazon = instancia.spriteBSumarVidas.getBoundingBox();
        var areaQuitarCorazon = instancia.spriteBQuitarVidas.getBoundingBox();

        // La pulsación cae dentro del botón de menu
        if (cc.rectContainsPoint(areaBoton, cc.p(event.getLocationX(), event.getLocationY()))) {
            cc.director.pause();
            var gameScene = instancia.getParent();

            // tenemos el objeto GameScene y le añadimos la nueva layer
            gameScene.addChild(new MenuObjetosLayer(gameScene), 0, 3);

        }

        //Pulsacion dentro de corazon lo cual añade una vida
        if (cc.rectContainsPoint(areaCorazon,
            cc.p(event.getLocationX(), event.getLocationY()))) {
            var instanciaIU = event.getCurrentTarget();

            // Metodo que suma una vida
            instanciaIU.darVidas();

            instanciaIU.pintarVidas();

            instanciaIU.agregarRupia();


        }

        //Pulsacion dentro de corazon lo cual quita una vida
        if (cc.rectContainsPoint(areaQuitarCorazon,
            cc.p(event.getLocationX(), event.getLocationY()))) {
            var instanciaIU = event.getCurrentTarget();
            var instanciaIU = event.getCurrentTarget();

            instanciaIU.quitarVidas();

        }

    }, agregarRupia: function () {
        this.rupias++;
        this.etiquetaMonedas.setString("" + this.rupias);

    }, darVidas: function () {

        //actualizamos la posicion de la nueva vida
        this.posicionSpriteCorazones = this.posicionSpriteCorazones + 30;


        //Evitar que sobrepase el limite de la pantalla
        if (this.posicionSpriteCorazones > cc.winSize.width - 70) {

            //ACtualizamos posicion y altura para añadir una nueva fila
            this.posicionSpriteCorazones = 30;
            this.alturaSpriteCOrazones = this.alturaSpriteCOrazones + 30;

            //Creamos el sprite
            eval("var variable" + this.corazones + "= cc.Sprite.create(res.corazon_png)");
            eval("variable" + this.corazones).setPosition(cc.p(this.posicionSpriteCorazones, cc.winSize.height - this.alturaSpriteCOrazones));

            //y lo añadimos
            this.addChild(eval("variable" + this.corazones));
            console.log("Si he llegado al limite" + this.posicionSpriteCorazones);
        } else {

            //creamos el sprite
            eval("var variable" + this.corazones + "= cc.Sprite.create(res.corazon_png)");
            eval("variable" + this.corazones).setPosition(cc.p(this.posicionSpriteCorazones, cc.winSize.height - this.alturaSpriteCOrazones));

            //y lo añadimos
            this.addChild(eval("variable" + this.corazones));
            console.log("variable" + this.corazones);

        }





    }, quitarVidas: function () {

        //obtenemos los hijos de la layer
        var childNode = this._children;
        for (var i = 0; i < childNode.length; i++) {
            var child = childNode[i];

            //eliminamos el ultimo sprite añadido (osea el corazon)
            if (i == childNode.length - 1 && childNode[i].getPosition().x < cc.winSize.width - 70) {
                this.removeChild(childNode[i]);

                //Actualizamos la posicion de los corazones
                this.posicionSpriteCorazones = this.posicionSpriteCorazones - 30;
            }
            console.log(child);
        }

    }, pintarVidas() {


    }
});

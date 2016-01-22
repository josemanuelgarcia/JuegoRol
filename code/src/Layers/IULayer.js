var IULayer = cc.Layer.extend({
    vidasIniciales:3,
    ponerVidasIniciales:true,
    spriteBotonMenu: null,
    spriteBotonPause:null,
    spriteBSumarVidas: null,
    spriteBQuitarVidas: null,
    spriteArmaElegida: null,
    apriteActivarLlaves:null,
    spriteRupias: null,
    spriteLlaves:null,
    spriteLlavesJefe:null,
    etiquetaLlaves:null,
    etiquetaLlavesjefe:null,
    llavesNormales: 0,
    llavesJefe:0,
    rupias: 0,
    corazones: 103,
    corazonesBlancos:999,
    posicionSpriteCorazones: 0,
    alturaSpriteCOrazones: 30,
    vidasQuitadas:0,
    entrar:true,
    pause:true,
    numeroDeArmasDisponiblesLabel:null,
    numeroArmas:0,
    activado:true,
    corazonesSumados:0,
    ctor: function () {
        this._super();
        var size = cc.winSize;

        //se llama par pintar las vidas iniciales

        //Al principio la weapon es el arco
        weapon="BOOMERANG";


        //-------------------Cargar Partida-------------------------------------
        var vidasGuardadas = parseInt(loadDollNum("corazonesDados",1));
        var vidasPerdidas = parseInt(loadDollNum("vidasQuitadas",1));
        console.log(""+vidasPerdidas+"  "+vidasGuardadas);
          if(cargarPartida && (vidasGuardadas != 0 || vidasPerdidas != 0)){

                this.vidasIniciales=this.vidasIniciales+vidasGuardadas;
                this.corazones = this.corazones+vidasGuardadas;
                this.corazonesSumados = vidasGuardadas;
                this.darVidas();
                for(i=0;i<vidasPerdidas;i++)
                {this.quitarVidas();}
                }

                else
                {
                 this.darVidas();

                }
        //----------------------------------------------------------------------

        //boton para comprobar que la activacion de las llaves funciona
        this.apriteActivarLlaves = cc.Sprite.create(res.llave_jefe_iu_png);
                this.apriteActivarLlaves.setPosition(cc.p(50, 300));
                this.addChild(this.apriteActivarLlaves);


        // boton para comprobar q se suman corazones (es provisional y lo podeis quitar si quereis)
        this.spriteBSumarVidas = cc.Sprite.create(res.contenedorCorazon_png);
        this.spriteBSumarVidas.setPosition(cc.p(50, 150));
        this.addChild(this.spriteBSumarVidas);

        // boton para comprobar q se quitan vidas (es provisional y lo podeis quitar si quereis)
        this.spriteBQuitarVidas = cc.Sprite.create(res.corazonnegro_png);
        this.spriteBQuitarVidas.setPosition(cc.p(30, 250));
        this.addChild(this.spriteBQuitarVidas);

        //Llaves normales para mazmorras
        this.spriteLlaves = cc.Sprite.create(res.llave_normal_iu_png);
        this.spriteLlaves.setPosition(cc.p(500, 420));
         this.spriteLlaves.setVisible(false);
        this.addChild(this.spriteLlaves);

        this.etiquetaLlaves = new cc.LabelTTF("0", "Helvetica", 20);
        this.etiquetaLlaves.setPosition(cc.p(525, 420));
        this.etiquetaLlaves.fillStyle = new cc.Color(255, 255, 255, 255);
         this.etiquetaLlaves.setVisible(false);
        this.addChild(this.etiquetaLlaves);

        //Llaves para jefes finales
        this.spriteLlavesJefe = cc.Sprite.create(res.llave_jefe_iu_png);
        this.spriteLlavesJefe.setPosition(cc.p(400, 420));
         this.spriteLlavesJefe.setVisible(false);
        this.addChild(this.spriteLlavesJefe);

        this.etiquetaLlavesjefe = new cc.LabelTTF("0", "Helvetica", 20);
        this.etiquetaLlavesjefe.setPosition(cc.p(425, 420));
        this.etiquetaLlavesjefe.fillStyle = new cc.Color(255, 255, 255, 255);
         this.etiquetaLlavesjefe.setVisible(false);
        this.addChild(this.etiquetaLlavesjefe);


        // Contador Rupias
        this.spriteRupias = cc.Sprite.create(res.rupiaazul_png);
        this.spriteRupias.setPosition(cc.p(size.width/2, 28));
        this.addChild(this.spriteRupias);

        this.etiquetaMonedas = new cc.LabelTTF("0", "Helvetica", 20);
        this.etiquetaMonedas.setPosition(cc.p((size.width/2) + 25, 25));
        this.etiquetaMonedas.fillStyle = new cc.Color(255, 255, 255, 255);
        this.addChild(this.etiquetaMonedas);

        // spriteBotonMenu
        this.spriteBotonMenu = cc.Sprite.create(res.boton_menu2_png);
        this.spriteBotonMenu.setPosition(cc.p(90,40));
        this.spriteBotonMenu.setOpacity(190);
         this.addChild(this.spriteBotonMenu);
         // spriteBotonPause
         this.spriteBotonPause = cc.Sprite.create(res.boton_pausa_png);
         this.spriteBotonPause.setPosition(cc.p(711,40));
         this.spriteBotonPause.setOpacity(190);

        this.addChild(this.spriteBotonPause);

        //Sprite en el que se muestra el arma elegida
        this.spriteArmaElegida = cc.Sprite.create(res.boomeran_reducido_png);
        this.spriteArmaElegida.setPosition(cc.p(size.width - 40, size.height - 40));

        this.addChild(this.spriteArmaElegida);

        this.crearLabelArmas();


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
        var areaLlaves = instancia.apriteActivarLlaves.getBoundingBox();
        var areaQuitarCorazon = instancia.spriteBQuitarVidas.getBoundingBox();
        var areaBotonPause = instancia.spriteBotonPause.getBoundingBox();
 var gameScene = instancia.getParent();
  var instanciaIU = event.getCurrentTarget();
        // La pulsación cae dentro del botón de menu

        if(instanciaIU.entrar){
        if (cc.rectContainsPoint(areaBoton, cc.p(event.getLocationX(), event.getLocationY()))) {
            cc.director.pause();

            instanciaIU.entrar=false;
            // tenemos el objeto GameScene y le añadimos la nueva layer
            gameScene.addChild(new MenuObjetosLayer(gameScene), 0, 3);

        }
}
        //Pulsacion dentro de corazon lo cual añade una vida
        if (cc.rectContainsPoint(areaCorazon,
            cc.p(event.getLocationX(), event.getLocationY()))) {


//Es una muñeca número de conservación de datos.
dollNum = 1;

            // Metodo que suma una vida
            //instanciaIU.darVidas();
            instanciaIU.nuevoCorazon();

        }
         //Pulsacion dentro de llaves lo cual hace visible el contador de llaves de mazmorra
                if (cc.rectContainsPoint(areaLlaves,
                    cc.p(event.getLocationX(), event.getLocationY()))) {
                        console.log("llaves activadas");
                    instanciaIU.activarLlaves();
                }

        //pulsacion detro del boton de pausa
         if(instanciaIU.entrar){
        if (cc.rectContainsPoint(areaBotonPause,
                    cc.p(event.getLocationX(), event.getLocationY()))) {

        cc.director.pause();

        instanciaIU.entrar=false;
        instanciaIU.pause=false;
                    // tenemos el objeto GameScene y le añadimos la nueva layer
                    gameScene.addChild(new PauseLayer(gameScene), 0, 4);
                }

}
        //Pulsacion dentro de corazon lo cual quita una vida
        if (cc.rectContainsPoint(areaQuitarCorazon,
            cc.p(event.getLocationX(), event.getLocationY()))) {
            var instanciaIU = event.getCurrentTarget();
            var instanciaIU = event.getCurrentTarget();

            instanciaIU.quitarVidas();

        }

    }, agregarRupia: function (rupias) {
        this.rupias= this.rupias+rupias;
        this.etiquetaMonedas.setString("" + this.rupias);

    }, activarLlaves: function () {

                    this.spriteLlaves.setVisible(this.activado);

                    this.etiquetaLlaves.setVisible(this.activado);

                    this.spriteLlavesJefe.setVisible(this.activado);

                    this.etiquetaLlavesjefe.setVisible(this.activado);

                    if(this.activado==true)
                    {this.activado=false}
                    else
                    {
                    this.activado=true;
                    }
  }, darVidas: function () {
      // Vidas iniciales
      if(this.ponerVidasIniciales){
       for(i=0;i < this.vidasIniciales;i++){
       this.posicionSpriteCorazones=this.posicionSpriteCorazones+30;
        eval("var variable" + 100+i + "= cc.Sprite.create(res.corazon_png)");
                   eval("variable" +100+i).setPosition(cc.p(this.posicionSpriteCorazones, cc.winSize.height - this.alturaSpriteCOrazones));
                   //y lo añadimos
                   this.addChild(eval("variable" +100+i),0,100+i);
                   console.log("doy vida");
        }

        //solo se ponen una vez
        this.ponerVidasIniciales=false;
        }



            //Si le han quitado vidas se las devolvemos
          if(this.vidasQuitadas>0)
          {
          this.vidasQuitadas=this.vidasQuitadas-1;



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
            this.addChild(eval("variable" + this.corazones),0,this.corazones);
            console.log("Si he llegado al limite" + this.posicionSpriteCorazones);
        } else {

            //creamos el sprite
            eval("var variable" + this.corazones + "= cc.Sprite.create(res.corazon_png)");
            eval("variable" + this.corazones).setPosition(cc.p(this.posicionSpriteCorazones, cc.winSize.height - this.alturaSpriteCOrazones));

            //y lo añadimos
            this.addChild(eval("variable" + this.corazones),0,this.corazones);
            console.log("variable" + this.corazones);

}
this.corazones = this.corazones+1;
        }





    }, quitarVidas: function () {

        //se pueden quitar vida si hay vidas que quitar (logicamente)
        if(this.vidasQuitadas<this.vidasIniciales){
        this.vidasQuitadas = this.vidasQuitadas+1;
        //Entraria siempre que haya algun corazon
        if(this.posicionSpriteCorazones>=30 || this.alturaSpriteCOrazones>30){
        //creamos el nuevo sprite del corazon blanco
         var corazonblanco = cc.Sprite.create(res.corazonblanco_png);

         //le asignamos la posicion del corazon lleno de vida
         corazonblanco.setPosition(cc.p(this.getChildByTag(this.corazones-1).getPosition().x,this.getChildByTag(this.corazones-1).getPosition().y));

        //eliminamos el corazon lleno de vida y asiganmos el blanco
        this.removeChild(this.getChildByTag(this.corazones-1));
        this.addChild(corazonblanco,0,this.corazonesBlancos);

       //Si no ha llegado al ultimo corazon por la izquierda
        if(this.posicionSpriteCorazones>=30){
         //actualizamos la posicion de los corazones llenos de vida
        this.posicionSpriteCorazones = this.posicionSpriteCorazones - 30;
       }
       //Si ha llegado al ultimo corazon por la izquierda entonces modificamos la altura
       else if(this.alturaSpriteCOrazones>30){
        this.posicionSpriteCorazones=690;
        this.alturaSpriteCOrazones=this.alturaSpriteCOrazones - 30;
        }

        //Actualizamos el identificador de los sprite de los sprite de los corazones
        this.corazones = this.corazones-1;

        //Actualizamos el identificador de los sprite de los corazones blancos
        this.corazonesBlancos = this.corazonesBlancos+1;
        console.log("numero de vidas quitadas"+this.vidasQuitadas);
        }}
    },nuevoCorazon : function() {

        this.corazonesSumados=this.corazonesSumados+1;
console.log("numero de vidas quitadas"+this.vidasQuitadas);
        for(i=0;i<=this.vidasQuitadas;i++)
        {
        this.vidasQuitadas=this.vidasQuitadas+1;
        this.darVidas();
        }
        this.vidasQuitadas=0;
        this.vidasIniciales=this.vidasIniciales+1;
    }, crearLabelArmas : function()
    {
    if(this.numeroDeArmasDisponiblesLabel==null){
    this.numeroDeArmasDisponiblesLabel = new cc.LabelTTF("" + this.numeroArmas, "Helvetica", 20);
                     this.numeroDeArmasDisponiblesLabel.setPosition(cc.p(cc.winSize.width - 30, cc.winSize.height - 50));
                      this.numeroDeArmasDisponiblesLabel.fillStyle = new cc.Color(255, 255, 255, 255);
                      this.numeroDeArmasDisponiblesLabel.setVisible(false);
                     this.addChild(this.numeroDeArmasDisponiblesLabel);
    }
    else{
    this.removeChild(this.numeroDeArmasDisponiblesLabel);
     this.numeroDeArmasDisponiblesLabel = new cc.LabelTTF("" + this.numeroArmas, "Helvetica", 20);
                         this.numeroDeArmasDisponiblesLabel.setPosition(cc.p(cc.winSize.width - 30, cc.winSize.height - 50));
                          this.numeroDeArmasDisponiblesLabel.fillStyle = new cc.Color(255, 255, 255, 255);
                          this.numeroDeArmasDisponiblesLabel.setVisible(false);
                         this.addChild(this.numeroDeArmasDisponiblesLabel);
    }
    }, crearLabelLlaves : function()
         {

         this.removeChild(this.etiquetaLlaves);
         this.removeChild(this.etiquetaLlavesjefe);

          this.etiquetaLlaves = new cc.LabelTTF(""+this.llavesNormales, "Helvetica", 20);
                 this.etiquetaLlaves.setPosition(cc.p(525, 420));
                 this.etiquetaLlaves.fillStyle = new cc.Color(255, 255, 255, 255);
                  this.etiquetaLlaves.setVisible(true);
                 this.addChild(this.etiquetaLlaves);


              this.etiquetaLlavesjefe = new cc.LabelTTF(""+this.llavesJefe, "Helvetica", 20);
                     this.etiquetaLlavesjefe.setPosition(cc.p(425, 420));
                     this.etiquetaLlavesjefe.fillStyle = new cc.Color(255, 255, 255, 255);
                      this.etiquetaLlavesjefe.setVisible(true);
                     this.addChild(this.etiquetaLlavesjefe);

                this.spriteLlaves.setVisible(true);



                                    this.spriteLlavesJefe.setVisible(true);


         }
});

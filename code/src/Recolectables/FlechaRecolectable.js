var FlechaRecolectable = cc.Class.extend({
    space:null,
    sprite:null,
    shape:null,
    layer:null,
    color:null,
    bombas:0,
ctor:function (space, posicion, layer) {
    this.space = space;
    this.layer = layer;


    // Crear Sprite - Cuerpo y forma

         this.sprite = new cc.PhysicsSprite(res.flecha_png);
         this.flechas=5;



    // Cuerpo estática , no le afectan las fuerzas
    var body = new cp.StaticBody();
    body.setPos(posicion);
    this.sprite.setBody(body);
    // Los cuerpos estáticos nunca se añaden al Space
    var radio = this.sprite.getContentSize().width / 2;
    // forma
    this.shape = new cp.BoxShape(body,
                this.sprite.getContentSize().width,
                this.sprite.getContentSize().height);
    this.shape.setCollisionType(tipoFlechaRecolectable);
    // Nunca genera colisiones reales
    this.shape.setSensor(true);
    // forma estática
    this.space.addStaticShape(this.shape);
    // añadir sprite a la capa



    layer.mapa.addChild(this.sprite,3);

}, getShape: function (){
      return this.shape;

 }, eliminar: function (){
     // quita la forma
     this.space.removeShape(this.shape);

     // quita el sprite
     this.layer.mapa.removeChild(this.sprite);
 },agregarFlechas: function(){
        this.layer.link.numFlechas=this.layer.link.numFlechas+this.flechas;
        if(weapon=="ARCO")
        {
        //Sprite en el que se muestra el arma elegida
        iuLayer.spriteArmaElegida.setTexture(res.arco_reducido_png);

        //sera el numero de flechas de link
        iuLayer.numeroArmas = this.layer.link.numFlechas;
        iuLayer.crearLabelArmas();
        iuLayer.numeroDeArmasDisponiblesLabel.setVisible(true);
        }
 }
});
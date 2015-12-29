var coneVec=null;
var MathUtil=cc.Class.extend({
ctor: function()
{
},
isInViewCone:function(viewer, obj, coneSize,layer) {
        coneVec=new cp.v(
            obj.x - viewer.x,
            obj.y - viewer.y
        );

       this.normalize();

        //check if 'e' is withing a conic area in the direction we face
        switch(layer.link.orientacion) {
            case "ARRIBA":
                return (coneVec.y < 0 && coneVec.x > -coneSize && coneVec.x < coneSize);
            case "ABAJO":

                return (coneVec.y > 0 && coneVec.x > -coneSize && coneVec.x < coneSize);
            case "IZQUIERDA":

                return (coneVec.x < 0 && coneVec.y > -coneSize && coneVec.y < coneSize);
            case "DERECHA":

                return (coneVec.x > 0 && coneVec.y > -coneSize && coneVec.y < coneSize);
        }
    },
    normalize: function()
    {
        var pot=Math.sqrt(coneVec.x*coneVec.x+coneVec.y*coneVec.y);
        coneVec.x=1/pot;
        coneVec.y=1/pot;
    }
    });
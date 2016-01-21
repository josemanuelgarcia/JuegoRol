var coneVec = null;
var MathUtil = cc.Class.extend({
    ctor: function () {
    },
    isInViewCone: function (viewer, obj, coneSize, layer) {
        coneVec = new cp.v(
            obj.x - viewer.x,
            obj.y - viewer.y
            );

        this.normalize();

        //check if 'e' is withing a conic area in the direction we face
        switch (layer.link.orientacion) {
            case "ARRIBA":
                return obj.y > viewer.y;
            case "ABAJO":

                return obj.y < viewer.y;
            case "IZQUIERDA":
                return obj.x < viewer.x;
            case "DERECHA":

                return obj.x > viewer.x;
        }
    },
    normalize: function () {
        var pot = Math.sqrt(coneVec.x * coneVec.x + coneVec.y * coneVec.y);
        coneVec.x = 1 / Math.abs(pot);
        coneVec.y = 1 / Math.abs(pot);
    }
});
function loadDollNum(clave,valor) {

          var tempDollNum = cc.sys.localStorage.getItem(""+clave);


          //si no esta registrado no hacemos nada
          if(tempDollNum == null || tempDollNum == ""){
          console.log("no existe ");


          }
          // si existe lo obtenemos
          else{

              tempDollNum = cc.sys.localStorage.getItem(""+clave);

          }

         return tempDollNum;
      }
       function saveDollNum(clave,valor){

          //guardamos en el almacenamiento local el recurso valor con la clave dada
            cc.sys.localStorage.setItem(""+clave,valor);
        }
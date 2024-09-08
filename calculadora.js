function calcularIp() {
    let ipIngresada = document.getElementById('valorIpRed').value;
    let numeroCeros = 32 - parseInt(document.getElementById('valorNoCeros').value);
    let valorIpDeseado = document.getElementById('valorIpDeseado').value;
    let numeroDeHost = Math.pow(2, numeroCeros) - 2;
    console.log(numeroDeHost);
    assignText('#result_host',` ${numeroDeHost}` );

    let ipBinaria = convertirBinario(ipIngresada);
    let ipModificadaBinaria = ipRedFunction(ipBinaria, numeroCeros);
    let ipModificadaDecimal = convertirDecimal(ipModificadaBinaria);
   
    let ipMascaraBinaria =  ipMascararaFunction(ipModificadaBinaria,numeroCeros)
    let claseIpTexto = determinarClase(ipModificadaDecimal);
    let ipBroadcastBinaria = ipBroadcastFunction(ipModificadaBinaria,numeroCeros);
    let ipBroadcastDecimal = convertirDecimal(ipBroadcastBinaria);
    let textoValorSumaDeseada = DeterminarSuma(valorIpDeseado,ipModificadaDecimal);
    assignText('#IpBinaria', ipBinaria.join('.'));
   // assignText('#IpModificada', ipModificadaDecimal.join('.'));
   console.log(ipModificadaDecimal.join('.'));
   assignText('#ipRed',` ${ipModificadaBinaria.join('.')}` );
   assignText('#ipDecimalRed',   ` ${ipModificadaDecimal.join('.')}`);
assignText('#ipMascaraText', `${ipMascaraBinaria.join('.')}`  );
assignText('#ipMascaraDecimalText', `${convertirDecimal(ipMascaraBinaria).join('.')}`  );

   assignText('#ipBroadcast',   ` ${ipBroadcastBinaria.join('.')}`);
   assignText('#ipBroadcastDecimal',   ` ${ipBroadcastDecimal.join('.')}`);

   assignText('#tipoClaseIp',`${claseIpTexto}`);
   assignText('#valorIpSumaTexto',`${textoValorSumaDeseada}`)

}

function convertirBinario(ipIngresada) {
    const octets = ipIngresada.split('.'); //separa punto y rellena de 0 el binario sin 
    //afectar el número
    return octets.map(octet => parseInt(octet, 10).toString(2).padStart(8, '0'));
}

function convertirDecimal(arrayBinario) {
    return arrayBinario.map(binaryOctet => parseInt(binaryOctet, 2).toString(10));
} //va a transformar base 10

/*Funcion para tomar la ip de red que convierta los ultimos en 0 */ 
function ipRedFunction(ipBinArray, numeroCeros) {
    let bitsModificados = ipBinArray.join('').split('');
    
    for (let i = bitsModificados.length - numeroCeros; i < bitsModificados.length; i++) {
        bitsModificados[i] = '0';
    }
    
    let ipBinModificada = [];
    for (let i = 0; i < 32; i += 8) {
        ipBinModificada.push(bitsModificados.slice(i, i + 8).join(''));
    }
    
    return ipBinModificada;
}
/*Funcion que toma la ip de red y el numero de ceros, en donde este 
numero de 0 se transforma en 1
*/ 
function ipBroadcastFunction(ipBinArray, numeroCeros) {
    let direccionCambiada = ipBinArray.join('').split('');
    
    for (let i = direccionCambiada.length - numeroCeros; i < direccionCambiada.length; i++) {
        direccionCambiada[i] = '1';
    }
    
    let ipBroadcastModificada = [];
    for (let i = 0; i < 32; i += 8) {
        ipBroadcastModificada.push(direccionCambiada.slice(i, i + 8).join(''));
    } //va ingresando por octetos la nueva ip
    
    return ipBroadcastModificada;
}

function ipMascararaFunction(ipRedArray,numeroCeros){
        let bitsModificadosNuevo = ipRedArray.join('').split('');
        
        
        for (let i = 0; i < bitsModificadosNuevo.length - numeroCeros; i++) {
            bitsModificadosNuevo[i] = '1';
        }
        
        let ipMascaraModificada = [];
        for (let i = 0; i < 32; i += 8) {
            ipMascaraModificada.push(bitsModificadosNuevo.slice(i, i + 8).join(''));
        }
        
        return ipMascaraModificada;
    }

    function determinarClase(ipArray){
      let ipClass= ipArray[0];
       console.log("OCTETO "+ ipClass);

    if(ipClass >= 0 && ipClass<=127){
        return "A"; }
    else if(ipClass >=127 && ipClass<=172){
        return "B";}
    else if(ipClass >=192 && ipClass<223){
        return "C"; }
     else if (ipClass >= 224 && ipClass <= 239) {
    return "D";
      } else if (ipClass >= 240 && ipClass <= 255) {
    return "E";}
    else {
    return "IP no válida";}
    }   
 
function assignText(element, text){
    let title = document.querySelector(element);
    title.innerHTML = text; // innerHTML sets 
    }
  
    /*function DeterminarSuma(valorDeseadoBin, ipArray){
       let octetoUltimo= parseInt(ipArray[ipArray.length-1]);
        console.log("last"+octetoUltimo);
        let resultado = valorDeseadoBin+octetoUltimo;
        let resultadoBinario = convertirBinario(resultado);
        return resultado.toString();
               
    }*/
        function DeterminarSuma(valorDeseado, ipArray) {
         let ipBase = ipArray.slice(0, 3).join('.');
        let octetoUltimo = parseInt(ipArray[ipArray.length - 1], 10);
        let valo = parseInt(valorDeseado);
        let ipUtilUltimoOcteto = (octetoUltimo + valo);
        console.log("IP :", octetoUltimo +"wqw"+ valorDeseado);
        console.log("IP"+ipUtilUltimoOcteto);

         let ipUtil = ipBase + '.' + ipUtilUltimoOcteto;
            
            console.log("IP útil:", ipUtil);
            
            return ipUtil;
        }
        
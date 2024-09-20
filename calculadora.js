function calcularIp() {
    let ipIngresada = document.getElementById('valorIpRed').value;
    let numeroCeros = 32 - parseInt(document.getElementById('valorNoCeros').value);
    let valorIpDeseado = document.getElementById('valorIpDeseado').value;
    let numeroDeHost = 0;

    if (!validarIp(ipIngresada)) {
        alert('IP ingresada no es válida');
        return;
    }

    if (!validarNumeroCeros(numeroCeros)) {
        alert('El número de ceros es inválido. Debe estar entre 0 y 32.');
        return;
    }
    else{
     numeroDeHost=  Math.pow(2, numeroCeros) - 2;
     console.log(numeroDeHost);

    }

    
    if (!validarIpDeseado(valorIpDeseado)) {
        alert('El valor de IP deseado no es válido.');
        return;
    }
        
    assignText('result_host', ` ${numeroDeHost}`);

    let ipBinaria = convertirBinario(ipIngresada);
    let ipModificadaBinaria = ipRedFunction(ipBinaria, numeroCeros);
    let ipModificadaDecimal = convertirDecimal(ipModificadaBinaria);

    let ipMascaraBinaria = ipMascararaFunction(ipModificadaBinaria, numeroCeros);
    let claseIpTexto = determinarClase(ipModificadaDecimal);
    let ipBroadcastBinaria = ipBroadcastFunction(ipModificadaBinaria, numeroCeros);
    let ipBroadcastDecimal = convertirDecimal(ipBroadcastBinaria);
    let textoValorSumaDeseada = DeterminarSuma(valorIpDeseado, ipModificadaDecimal);
    let clasificarIp = determinarPrivadaPublica(ipIngresada);

    const { htmlRed, htmlHosts } = mostrarPorcionesBinario(ipBinaria, numeroCeros);

    assignText('binarioRed', htmlRed);
    assignText('binarioHosts', htmlHosts);

    assignText('IpBinaria', ipBinaria.join('.'));
    assignText('ipRed', ` ${ipModificadaDecimal.join('.')}`);
    assignText('ipDecimalRed', ` ${ipModificadaDecimal.join('.')}`);
    assignText('ipMascaraText', `${ipMascaraBinaria.join('.')}`);
    assignText('ipMascaraDecimalText', `${convertirDecimal(ipMascaraBinaria).join('.')}`);
    assignText('ipBroadcast', ` ${ipBroadcastBinaria.join('.')}`);
    assignText('ipBroadcastDecimal', ` ${ipBroadcastDecimal.join('.')}`);

    assignText('tipoClaseIp', claseIpTexto);
    assignText('valorIpSumaTexto', textoValorSumaDeseada);
    assignText('ipPrivadaOPublica', clasificarIp);

    const rango = calcularRangoIp(ipModificadaDecimal.join('.'));
    assignText('rangoIpUtiles', `Rango de IPs: ${rango.primerHost} - ${rango.ultimoHost}`);
    console.log(rango);
}

function convertirBinario(ipIngresada) {
    const octets = ipIngresada.split('.');
    return octets.map(octet => parseInt(octet, 10).toString(2).padStart(8, '0'));
}

function convertirDecimal(arrayBinario) {
    return arrayBinario.map(binaryOctet => parseInt(binaryOctet, 2).toString(10));
}

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

function ipBroadcastFunction(ipBinArray, numeroCeros) {
    let direccionCambiada = ipBinArray.join('').split('');
    for (let i = direccionCambiada.length - numeroCeros; i < direccionCambiada.length; i++) {
        direccionCambiada[i] = '1';
    }
    let ipBroadcastModificada = [];
    for (let i = 0; i < 32; i += 8) {
        ipBroadcastModificada.push(direccionCambiada.slice(i, i + 8).join(''));
    }
    return ipBroadcastModificada;
}

function ipMascararaFunction(ipRedArray, numeroCeros) {
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

function determinarClase(ipArray) {
    let ipClass = ipArray[0];
    if (ipClass >= 0 && ipClass <= 127) {
        return "A";
    } else if (ipClass >= 128 && ipClass <= 191) {
        return "B";
    } else if (ipClass >= 192 && ipClass < 224) {
        return "C";
    } else if (ipClass >= 224 && ipClass <= 239) {
        return "D";
    } else if (ipClass >= 240 && ipClass <= 255) {
        return "E";
    } else {
        return "IP no válida";
    }
}

function DeterminarSuma(valorDeseado, ipArray) {
    let ipBase = ipArray.slice(0, 3).join('.');
    let octetoUltimo = parseInt(ipArray[ipArray.length - 1], 10);
    let valo = parseInt(valorDeseado);
    let ipUtilUltimoOcteto = octetoUltimo + valo;
    return ipBase + '.' + ipUtilUltimoOcteto;
}

function determinarPrivadaPublica(ipIngresada) {
    let octetos = ipIngresada.split('.');
    let primeraParte = parseInt(octetos[0]);
    let segundaParte = parseInt(octetos[1]);

    if ((primeraParte === 10) ||
        (primeraParte === 172 && segundaParte >= 16 && segundaParte <= 31) ||
        (primeraParte === 192 && segundaParte === 168)) {
        return "PRIVADA";
    } else {
        return "PÚBLICA";
    }
}

function calcularRangoIp(ipRed) {
    const ipBase = ipRed.split('.').map(Number);
    const primerHost = `${ipBase[0]}.${ipBase[1]}.${ipBase[2]}.1`;
    const ultimoHost = `${ipBase[0]}.${ipBase[1]}.${ipBase[2]}.254`;
    return { primerHost, ultimoHost };
}

function mostrarPorcionesBinario(ipBinaria, numeroCeros) {
    let binarioCompleto = ipBinaria.join('');
    const porcionRed = binarioCompleto.slice(0, 32 - numeroCeros);
    const porcionHosts = binarioCompleto.slice(32 - numeroCeros);
    
    const htmlRed = `<span style="text-decoration: underline; font-weight: bold; color: #ffe5d9;">${porcionRed}</span>`;
    const htmlHosts = `<span style="text-decoration: underline; color: #bffbff;">${porcionHosts}</span>`;

    return { htmlRed, htmlHosts };
}

function assignText(elementId, text) {
    let element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = text;
    } else {
        console.log(`Error: Elemento con ID '${elementId}' no encontrado`);
    }
}
//validar 
function validarIp(ipIngresada) {
    const octetos = ipIngresada.split('.');
    if (octetos.length !== 4) return false;
    return octetos.every(octet => {
        const num = parseInt(octet, 10);
        return num >= 0 && num <= 255;
    });
}

function validarNumeroCeros(numeroCeros) {
    return numeroCeros > 0 && numeroCeros <= 32;
}

function validarIpDeseado(valor) {
    const num = parseInt(valor, 10);
    return !isNaN(num) && num >= 0;
}

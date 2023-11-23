function CrearEspacios() {
	const n = parseInt(document.getElementById("numArticulos").value);
	const divEntPesos = document.getElementById("entradaPeso");
	const divEntValor = document.getElementById("entradaValor");
	for (i = 0; i < n; i++) {
		var entradaPesos = document.createElement("input");
		entradaPesos.id = "entPeso-" + i;
		divEntPesos.appendChild(entradaPesos);
		var entradaValor = document.createElement("input");
		entradaValor.id = "entValor-" + i;
		divEntValor.appendChild(entradaValor);
	}
	const lbl = document.getElementsByClassName("lblEntrada");
	for (i = 0; i < lbl.length; i++) {
		lbl[i].style.display = "block"
	}
	const btnSol = document.getElementById("Resolver").style.display = "inline";
}

function ordenar(arrPeso, arrValor, tam) {
	console.log(arrPeso);
	console.log(arrValor);
	var retorno = [];
	for (j = 0; j < (tam - 1); j++) {
		for (k = (j + 1); k < tam; k++) {
			if (arrPeso[j] > arrPeso[k]) {
				var tempPeso = arrPeso[j];
				var tempValor = arrValor[j];
				arrPeso[j] = arrPeso[k];
				arrPeso[k] = tempPeso;
				arrValor[j] = arrValor[k];
				arrValor[k] = tempValor;
			}
		}
	}

	console.log(arrPeso);
	console.log(arrValor);
	retorno[0] = arrPeso;
	retorno[1] = arrValor;
	return retorno;
}

function Resolver() {
	var pesos = [];
	var valor = [];
	var p = 1;
	var retornado;
	const nArt = parseInt(document.getElementById("numArticulos").value);
	const nPesMax = parseInt(document.getElementById("PesoLim").value);
	var Matriz = [nPesMax + 1];
	var matrArt = [nPesMax + 1];

	for (i = 0; i < nArt; i++) {
		var cadPeso = "entPeso-" + i;
		var cadValor = "entValor-" + i;
		pesos[i] = parseInt(document.getElementById(cadPeso).value);
		valor[i] = parseInt(document.getElementById(cadValor).value);
	}

	retornado = ordenar(pesos, valor, nArt);
	pesos = retornado[0];
	valor = retornado[1];

	for (j = 0; j <= nPesMax; j++) {
		Matriz[j] = new Array(nArt + 1);
		matrArt[j] = new Array(nArt + 1);
	}

	for (k = 0; k <= nArt; k++) {
		for (h = 0; h <= nPesMax; h++) {
			if (k == 0 || h == 0) {
				Matriz[k][h] = 0;
				matrArt[k][h] = "0:0";
				console.log(matrArt[k][h]);
			} else if (h - pesos[k - 1] >= 0) {
				var resCasilla = Math.max(Matriz[k - 1][h], ((Matriz[k - 1][h - pesos[k - 1]]) + valor[k - 1]));
				Matriz[k][h] = resCasilla;
				matrArt[k][h] = hallarArticulos(k, h, resCasilla, valor, pesos, matrArt);
				console.log(matrArt[k][h]);
			} else {
				Matriz[k][h] = Matriz[k - 1][h];
				matrArt[k][h] = matrArt[k-1][h];
				console.log(matrArt[k][h]);
			}
		}
	}

	mostrarPantalla(Matriz, nArt, nPesMax, valor, pesos, matrArt);
}

function hallarArticulos(i, j, resCasilla, valores, pesos, matrArt){
	if(i==1){
		return valores[0] + ":" + i;
	}else{
		return matrArt[i-1][j-pesos[i-1]] + " + " + valores[i-1]+":"+i;
	}
	
}

function mostrarPantalla(matrizSolucion, nArt, pesoMax, valores, pesos, matrArt) {
	var divSol = document.getElementById("solucion");
	var tabla = document.createElement("table");
	var thead = document.createElement("thead");
	var tbody = document.createElement("tbody");
	var tr1 = document.createElement("tr");
	var hArt = document.createElement("th");
	var hPeso = document.createElement("th");
	var hValor = document.createElement("th");

	hArt.innerHTML = "Articulos";
	hPeso.innerHTML = "Peso";
	hValor.innerHTML = "Valor";

	tr1.appendChild(hArt);
	tr1.appendChild(hPeso);
	tr1.appendChild(hValor);

	for (i = 0; i <= pesoMax; i++) {
		var casillaH = document.createElement("th");
		casillaH.innerHTML = i;
		tr1.appendChild(casillaH);
	}
	thead.appendChild(tr1);

	for (j = 1; j <= nArt; j++) {
		var fila = document.createElement("tr");
		for(k=0; k<3; k++){
			var casillaPV = document.createElement("td");
			if(k==0){
				casillaPV.innerHTML = j;
				fila.appendChild(casillaPV);
			}else if(k==1){
				casillaPV.innerHTML = pesos[j-1];
				fila.appendChild(casillaPV);
			}else if(k==2){
				casillaPV.innerHTML = valores[j-1];
				fila.appendChild(casillaPV);
			}
		}
		for (i = 0; i <= pesoMax; i++) {
			var casillaB = document.createElement("td");
			var divCelArt = document.createElement("div");
			var divCelVal = document.createElement("div");
			divCelArt.className = "celdaArt";
			divCelVal.className = "celdaVal";
			divCelVal.innerHTML = matrizSolucion[j][i];
			divCelArt.innerHTML = matrArt[j][i];
			casillaB.appendChild(divCelVal);
			casillaB.appendChild(divCelArt);
			fila.appendChild(casillaB);
		}
		tbody.appendChild(fila);
	}


	tabla.appendChild(thead);
	tabla.appendChild(tbody);
	divSol.appendChild(tabla);
}
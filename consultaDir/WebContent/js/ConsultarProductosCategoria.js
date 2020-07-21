var columnasTabla = [];
var rowGridEliminar = "";
var nomGridEliminar = "";
var grid;
var formulario = {};
var str_ruta_img = '';
var obj_rutas = {};
var objEdicion = {};

dojo.require("dojox.grid.EnhancedGrid");
dojo.require("dojox.grid.enhanced.plugins.Pagination");
dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("dojo.store.JsonRest");
dojo.require("dojo.data.ObjectStore");
dojo.require("dojox.grid.DataGrid");

$(document).ready(function() {
	cargarComboCategoria();

});

//Cargar Combo Categoria.
function cargarComboCategoria() {
	debugger;
	var consulta = {
		"SQL" : "SELECT_CATEGORIAS",//Lista desplegable
		"N" : 0,
		"DATOS" : {}
	};
	consultarDatos(consulta, function(data) {
		// debugger;
		var html = "<option value = -1>-- Seleccionar --</option>";
		try {
			var datos = JSON.parse(data);
			for (var i = 0; i < datos.length; i++) {
				if (datos[i].NOMBRE != null) {
					html += "<option value=" + datos[i].ID + ">"
							+ datos[i].NOMBRE + "</option>";
				}
			}
		} catch (e) {
			msgError(consultaMensajes("ErrorConsultaParse"), e.message);
			console.log(consulta);
		}
		$("#ControlSelectCat").html(html);

	}, function(xhr) {
		msgError(consultaMensajes("ErrorConsultaDB"), xhr);
		console.log(consulta);

	}, false);

}
//Funcion buscar.
function buscar() {
debugger;
	var strWhere = getWhere();//Está llamando la funcion getWhere
	var consultaT = {
		"SQL" : "SELECT_COUNT_PRODUCTOS",//se postea el select count para paginar la grid
		"N" : 1,//n° de parámetros que recibe
		"DATOS" : {
			"P1" : strWhere + ""//el p1 es el parametro que almacena la consulta en sí
		}
	};
	var total = 0;//iniciamos esta variable en cero para ver que registros nos traerá posteriormente

	consultarDatos(consultaT, function(obj_dato) {
		try {
			var datos = JSON.parse(obj_dato);
			total = datos[0].TOTAL;
			var consulta = {//en esta variable guardamos la consulta
				"SQL" : "SELECT_PRODUCT",
				"N" : 4,//Recibirá 4 parámetros
				"DATOS" : {
					"P1" : strWhere + "",//Se almacena la consulta o instruccion SQL.
					"P2" : "?MIN?",//Se obtiene el minimo de registros.
					"P3" : "?MAX?",//Se obtiene el maximo de registros.
					"P4" : "?ORDEN?"//Se ordenan los registros para paginarlos.
				}
			};
			var url = "cargardatospaginados.hyg?n=";//mapeamos la url de productos controller agregando la ext .hyg
			grid.noDataMessage = "La consulta no obtuvo resultados";
			newStore = new dojo.store.JsonRest({
				headers : {
					str_sql : parent.encode64(JSON.stringify(consulta)),
					total : total + ""
				},
				target : url,
				sortParam : "orden"
			});
			grid.setStore(dataStore = dojo.data.ObjectStore({
				objectStore : newStore
			}));
			grid.render();
			updateGrid();
		} catch (e) {
			msgError(consultaMensaje("ErrorConsultaParse"),
					e.message);
		}
		
	}, function(xhr) {
		msgError(consultaMensaje("ErrorConsultaDB"), xhr);
		$("#divLoading").hide();
	}, false);
}

function getWhere() {
	debugger;
	var strWhere = "1=1";
	if ($("#nombre").val() != "")
		strWhere += " and PRODUCTOS.NOMBRE = '" + $("#nombre").val()+"'";
	
	if ($("#ControlSelectCat").val() != "-1" && $("#ControlSelectCat").val() != null)
		strWhere += " and CATEGORIA.ID_CATEGORIA = " + $("#ControlSelectCat").val();
	
	console.log(strWhere);
	return strWhere;
	
}
//CODIGO PARA PINTAR LA GRID.
dojo.ready(function() {
	cargarColumnsProductos();
});

function cargarColumnsProductos() {
	var layout = [ [ {
		field : "ID_PRODUCT",//ID Producto.
		hidden : true//Se oculta el campo id de la BD.
	},
	{
		name : "NOMBRE DE PRODUCTO",//SE POSTEA el nombre de columna
		field : "NOMBRE_PRODUCTO",//(name) campo de la BD (field)
		width : "25%"
	}, {
		name : "CATEGORIA",
		field : "CATEGORIA",
		width : "25%"
	}, {
		name : "PRECIO",
		field : "PRECIO",
		width : "25%"
	}, {
		name : "CANTIDAD",
		field : "CANTIDAD",
		width : "25%"
	}, 

	] ];

	var data = {
		identifier : 'id',
		items : []
	};
	var data_list = [];
	for (var i = 0; i < data_list.length; i++) {
		data.items.push(dojo.mixin({
			id : i + 1
		}, data_list[i]));
	}
	var store = new dojo.data.ItemFileWriteStore({
		data : data
	});
	grid = new dojox.grid.EnhancedGrid({
		id : 'data_Products',//id del div que pintará la grid.
		store : store,
		sortInfo : 1,
		structure : layout,
		rowSelector : '0px',
		selectable : true,
		plugins : {
			pagination : {}
		}
	}, document.createElement('div'));
	dojo.byId("dataProducts").appendChild(grid.domNode);
	grid.startup();
	updateGrid();
	dojox.grid._Events.prototype.onCellClick = function(e) {
	};
	dojox.grid._Events.prototype.onKeyDown = function(e) {
	};
	dojox.grid._Events.prototype.onKeyEvent = function(e) {
	};

}
//Para que el grid modifique su estilo CSS al cargar los datos.
function updateGrid() {//Se llama en el body.
	try {
		$("#dataProducts").css(
				'height',
				Math.max(250, window.innerHeight
						- $("#dataProducts").position().top - 60));
		var Div = $("#dataProducts")[0];
		grid.resize({
			h :Div.clientHeight
		});
	} catch (e) {
	}

}



//Insertar un nuevo Producto**
function insertarProducto() {
	var queryInsert = [ {
		"SQL" : "INSERT_PRODUCTO",
		"N" : 4,
		"DATOS" : [ {
			"P1" : $("#nombre").val(),
			"P2" : $("#ControlSelectCat").val(),
			"P3" : $("#precio").val(),
			"P4" : $("#cantidad").val(),
		} ]
	} ];

	guardarDatos(queryInsert, function(str_rs) {
		try {
			if (str_rs == 'Ok') {
				$("#ModalForm").dialog('close');
				buscarGrid();
				return;
			}
		} catch (e) {
			msgError(parent.consultaMensaje("ErrorConsultaParse"), e.message);
			console.log(queryInsert);
		}

	}, function(xhr) {
		msgAdvertencia(parent.consultaMensaje("ErrorGuardarNoticia"));
	}, false);
}

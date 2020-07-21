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
	cargarComboPerfil();

});

// *****************Cargar Combo Perfil
function cargarComboPerfil() {
	var consulta = {
		"SQL" : "SELECT_PERFILES",// lista desplegable
		"N" : 0,
		"DATOS" : {}
	};
	consultarDatos(consulta, function(data) {
		// debugger
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
		$("#ControlSelectPerfil").html(html);

	}, function(xhr) {
		msgError(consultaMensajes("ErrorConsultaDB"), xhr);
		console.log(consulta);

	}, false);


}
//-------------funcion--buscar----------------------
function buscar() {
debugger;
	var strWhere = getWhere();//está llamando la funcion getWhere
	var consultaT = {
		"SQL" : "SELECT_COUNT_USUARIOS",//se postea el select count para paginar la grid
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
				"SQL" : "SELECT_USUARIOS",//Es la consulta que queremos ver
				"N" : 4,//recibirá 4 parámetros
				"DATOS" : {
					"P1" : strWhere + "",//*se almacena la consulta o instruccion sql
					"P2" : "?MIN?",//se obtiene el minimo de registros
					"P3" : "?MAX?",//se obtiene el maximo de registros
					"P4" : "?ORDEN?"//se ordenan los registros para paginarlos
				}
			};
			var url = "cargardatospaginados.hyg?n=";//mapeamos la url de usuario controller agregando la ext .hyg
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
	
	var strWhere = "1=1";
	if ($("#identificacion").val() != "")// *input de identificacion
		strWhere += " and USUARIO.IDENTIFICADOR = '" + $("#identificacion").val()+"'";//se le asignan los valores que traerá
	//de la bd
	if ($("#nombre").val() != "")
		strWhere += " and USUARIO.NOMBRE = '" + $("#nombre").val()+"'";
	
	if ($("#ControlSelectPerfil").val() != "-1" && $("#ControlSelectPerfil").val() != null)
		strWhere += " and PERFIL.ID_PERFIL = " + $("#ControlSelectPerfil").val();
	
	console.log(strWhere);
	return strWhere;
	
}
//CODIGO PARA PINTAR LA GRID------------------------------------------
dojo.ready(function() {
	cargarColumnsUsuarios();
});

function cargarColumnsUsuarios() {
	var layout = [ [ {
		field : "ID_USER",hidden : true
	},
	{
		name : "IDENTIFICADOR",
		field : "IDENT",
		width : "20%"
	},

	{
		name : "NOMBRE DE USUARIO",//SE POSTEA el nombre de columna
		field : "NOM_USER",//  (name) campo de la bd(field)
		width : "20%"
	}, {
		name : "E-MAIL",
		field : "MAIL",
		width : "20%"
	}, {
		name : "PERFIL",
		field : "PERFIL",
		width : "20%"
	}, {
		name : "ACTIVO",
		field : "ACTI",
		width : "20%"
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
		id : 'data_Users',//id del div que pintará la grid
		store : store,
		sortInfo : 1,
		structure : layout,
		rowSelector : '0px',
		selectable : true,
		plugins : {
			pagination : {}
		}
	}, document.createElement('div'));
	dojo.byId("dataUsers").appendChild(grid.domNode);
	grid.startup();
	updateGrid();
	dojox.grid._Events.prototype.onCellClick = function(e) {
	};
	dojox.grid._Events.prototype.onKeyDown = function(e) {
	};
	dojox.grid._Events.prototype.onKeyEvent = function(e) {
	};

}
//-------------------------------------------------------------------------

// para que el grid modifique su estilo css al cargar los datos
function updateGrid() {//se llama en el body
	try {
		$("#dataUsers").css(
				'height',
				Math.max(250, window.innerHeight
						- $("#dataUsers").position().top - 60));
		var Div = $("#dataUsers")[0];
		grid.resize({
			h :Div.clientHeight
		});
	} catch (e) {
	}

}

//--------------------------------------------------------------
//--------------insertar un nuevo usuario-----------------------
//function insertarUsuarios() {
//	var consulta = [ {
//		"SQL" : "SQL_UPDATE_OBSERVACION",
//		"N" : 2,
//		"DATOS" : [ {
//			"P1" : objEdicion.id + "",
//			"P2" : $('#observacion').val() + ""
//		} ]
//	} ];
//
//	guardarDatos(consulta, function(str_rs) {
//		try {
//			if (str_rs == 'Ok') {
//				$("#ModalForm").dialog('close');
//				buscarGrid();
//				return;
//			}
//		} catch (e) {
//			msgError(parent.consultaMensaje("ErrorConsultaParse"), e.message);
//			console.log(consulta);
//			$("#divLoading").hide();
//		}
//
//	}, function(xhr) {
//		msgAdvertencia(parent.consultaMensaje("ErrorGuardarNoticia"));
//	}, false);
//}


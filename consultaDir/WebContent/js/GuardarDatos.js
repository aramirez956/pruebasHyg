function guardarDatos(str_sql, callbackExito, callbackError) {
	debugger;
		$.ajax({
			"url" : "guardardatos.hyg",
			"type" : "POST",
			"data" : {
				str_sql : encode64(JSON.stringify(str_sql))
			},
			"success" : function(data) {
				if (data =="ok") {
					buscar();
				} else {
					callbackError();
				}
			},
			"error" : function(xhr, status, err) {
				callbackError(xhr.responseText);
			}
		});
	
}

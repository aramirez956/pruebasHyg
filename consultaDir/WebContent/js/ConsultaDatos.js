function consultarDatos(str_sql, callbackExito, callbackError) {
	debugger;
		$.ajax({
			"url" : "cargardatos.hyg",
			"type" : "POST",
			"data" : {
				str_sql : encode64(JSON.stringify(str_sql))
			},
			"success" : function(data) {
				if (data != null && data != "") {
					callbackExito(data);
				} else {
					callbackError();
				}
			},
			"error" : function(xhr, status, err) {
				callbackError(xhr.responseText);
			}
		});
	
}

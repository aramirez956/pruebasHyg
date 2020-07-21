<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="rand"><%=java.lang.Math.round(java.lang.Math.random() * 999999)%></c:set>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Productos | Categorias</title>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link type="text/css" href="css/dojo.css" rel="stylesheet" />
	<link rel="stylesheet" type="text/css"  href="css/EnhancedGrid.css"/>
	<link  rel="stylesheet" type="text/css" href="/css/EnhancedGrid_rtl.css"/>
	
	<script type="text/javascript" src="js/jquery.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/dojo/1.9.2/dojo/dojo.js"></script>
		<script src="js/ConsultaDatos.js?v=${rand}"></script>
		<script src="js/GuardarDatos.js?v=${rand}"></script>
		<script src="js/ConsultarProductosCategoria.js?v=${rand}"></script>
		<script type="text/javascript" src="js/B64.js">
	</script>

</head>
 <body onresize="updateGrid()">

	<div class="row">
		<div class="col-md-9">
			<div>
				<div>
					<h4 class="text-muted text-center">CONSULTAR PRODUCTOS:</h4>
				</div>
				<div class="body">
							<h2>Realice su búsqueda:</h2>
							<a class="btn btn-warning" href="index.hyg">Pagina principal</a>
					<div class="row">
						<div class="col-md-6" >

							<div class="form-group">
								<label for="recipient-name" class="col-form-label">Nombre:</label>
								<input type="text" class="form-control" id="nombre">
							</div>

							<div class="form-group">
								<label for="exampleFormControlSelect">Categorias:</label>
								<select class="form-control" id="ControlSelectCat" required
									class="form-control" >
								</select>
							</div>
								<button type="button" class="btn btn-info" onclick="buscar()">Buscar</button>
						</div>
						
						<div class="col-md-6" >
							<div class="form-group">
								<label for="recipient-precio" class="col-form-label">Precio:</label>
								<input type="number" class="form-control" id="precio">
							</div>
							<div class="form-group">
								<label for="recipient-cantidad" class="col-form-label">Cantidad:</label>
								<input type="number" class="form-control" id="cantidad">
							</div>
							<button type="button" id="guardar" class="btn btn-success" onclick="insertarProducto()" >Guardar</button>
						</div>
					</div>
						
					<!-- Estructura para pintar la GRID con JS -->
						  <div class="row">
					         <div >
					            <div id="dataProducts" style="height: 250px"></div>
					         </div>
      					  </div>
				</div>
				
				<div class="footer"  width="auto" height="200px"></div>
			</div>
		</div>
	</div>
</body>
</html>
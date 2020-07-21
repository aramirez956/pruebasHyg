<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="rand"><%=java.lang.Math.round(java.lang.Math.random() * 999999)%></c:set>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Usuarios | Perfil</title>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link type="text/css" href="css/dojo.css" rel="stylesheet" />
	<link rel="stylesheet" type="text/css"  href="css/EnhancedGrid.css"/>
	<link  rel="stylesheet" type="text/css" href="/css/EnhancedGrid_rtl.css"/>
	
	<script type="text/javascript" src="js/jquery.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/dojo/1.9.2/dojo/dojo.js"></script>
		<script src="js/ConsultaDatos.js?v=${rand}"></script>
		<script src="js/Productos.js?v=${rand}"></script>
		<script type="text/javascript" src="js/B64.js">
	</script>



</head>
 <body onresize="updateGrid()">
 

	<div class="row">
		<div class="col-md-9">
			<div>
				<div>

					<h4 class="text-muted text-center">CONSULTAR USUARIOS</h4>
				</div>
				<div class="body">

					<div class="row">
						<div class="col-md-6" >
							<h2>Realice</h2>
							<h3>su búsqueda</h3>
							<div class="form-group">
								<label for="recipient-name" class="col-form-label">Identificador:</label>
								<input type="text" class="form-control" id="identificacion">
							</div>

							<div class="form-group">
								<label for="recipient-name" class="col-form-label">Nombre:</label>
								<input type="text" class="form-control" id="nombre">
							</div>


							<div class="form-group">
								<label for="exampleFormControlSelect1">Perfil:</label>
								<!--     <select class="form-control " id="ControlSelectPerfil" required class="form-control"> -->
								<!--     <option value='1'>Super Admint</option> -->
								<!--     <option value='2'>Super Man</option> -->
								<!--     <option value='3'>Super </option> -->
								<!--     </select> -->
								<select class="form-control" id="ControlSelectPerfil" required
									class="form-control" >
									
								</select>
							</div>
						</div>
					</div>
					<button type="button" class="btn btn-info"
						onclick="buscar()">Buscar</button>
						
						<button type="button" id="guardar" class="btn btn-success" >Guardar</button>
						
						
						
						<!--   estructura para pintar la grid con js -->
							  <div class="row">
						         <div >
						            <div id="dataUsers" style="height: 250px"></div>
						         </div>
	      					  </div>
				</div>
				

				<div class="footer"  width="auto" height="200px"></div>
			</div>
		</div>
	</div>
</body>
</html>
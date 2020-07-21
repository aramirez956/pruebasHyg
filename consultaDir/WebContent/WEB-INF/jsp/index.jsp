<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
   pageEncoding="ISO-8859-1"%>
<c:set var="rand"
   value="<%=java.lang.Math.round(java.lang.Math.random() * 999999)%>"></c:set>
<!DOCTYPE html>
<html lang="es">
   <head>
   	  <title>Ajax-Direccciones</title>
	  <script type="text/javascript" src="js/jquery-3.2.1.min.js?v=${rand}"></script>		
	  <script type="text/javascript" src="js/consultaDir.js?v=${rand}"></script>
   </head>
   <body>
   		<h4>Ajax-Direccciones</h4>
   		<input id="direccion" type="text" placeholder="Ingrese direcci&oacute;n de prueba" />
		<button type="button" onclick="consultarDir()">Consultar</button>
		<button type="button" onclick="limpiar()">Limpiar</button><br />
		<span id="result"></span>
   </body>
</html>
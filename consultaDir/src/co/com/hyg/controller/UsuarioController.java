package co.com.hyg.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import co.com.hyg.bo.UtilidadesBO;
import co.com.hyg.utilidades.WebUtil;

@Controller
public class UsuarioController {
	private UtilidadesBO utilidadesBO = new UtilidadesBO();

	@RequestMapping(value = "/cargardatos", method = { RequestMethod.POST })
	public @ResponseBody String cargardatos(HttpServletRequest request) throws Exception {
		String strSql = WebUtil.decodeBase64(request.getParameter("str_sql"));
		String datos = utilidadesBO.cargarDatos(strSql);//Llamamos la funcion cargarDatos
		return datos;
	}

	@RequestMapping(value = "/cargardatospaginados", method = { RequestMethod.GET })
	public @ResponseBody String cargardatospaginados(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String strSql = WebUtil.decodeBase64(request.getHeader("str_sql"));
		String total = request.getHeader("total");
		String range = " ";
		String rango = " ";
		String direccion = "";
		if (request.getHeader("Range") != null) {
			range = request.getHeader("Range");
			rango = range.substring(6);
			strSql = strSql.replace("?MIN?", rango.split("-")[0]);
			strSql = strSql.replace("?MAX?", rango.split("-")[1]);
		}
		if (request.getParameter("orden") != null) {
			if (request.getParameter("orden").substring(0, 1).equals("-"))
				direccion = "desc";
			else
				direccion = "asc";
			boolean bolFecha = false;
			for (int i = 0; i < request.getParameter("orden").length(); i++) {
				if ((i + 5) <= request.getParameter("orden").length()) {
					if (request.getParameter("orden").toUpperCase().substring(i, (i + 5)).equals("FECHA")) {
						bolFecha = true;
						break;
					}
				} else
					break;
			}
			if (bolFecha)
				strSql = strSql.replace("?ORDEN?",
						"TO_DATE(" + request.getParameter("orden").substring(1) + ",'DD/MM/YYYY') " + direccion);
			else
				strSql = strSql.replace("?ORDEN?", request.getParameter("orden").substring(1) + " " + direccion);
		} else
			strSql = strSql.replace("?ORDEN?", "1 desc");
		String datos = utilidadesBO.cargarDatos(strSql);
		String items = range + "/" + total;
		response.setHeader("Content-Range", items);
		return datos;
	}

	
	@RequestMapping(value = "/guardardatos", method = { RequestMethod.POST })
	public @ResponseBody String guardarDatos(HttpServletRequest request) {
		
			String strSql = WebUtil.decodeBase64(request.getParameter("str_sql"));
			String datos = utilidadesBO.guardarDatos(strSql);
			return datos;
	}
}
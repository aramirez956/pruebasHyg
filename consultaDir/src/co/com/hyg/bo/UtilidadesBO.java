package co.com.hyg.bo;

import java.sql.CallableStatement;
import java.sql.Clob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Types;

import org.apache.log4j.Logger;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;
import co.com.hyg.utils.DataBase;

public class UtilidadesBO {

	final static  Logger logger = Logger.getLogger(UtilidadesBO.class);

	private static DataBase DataBase = new DataBase();



	public String cargarDatos(String strSql) {
		Connection conexion = null;
		CallableStatement callStatement = null;
		String salida = null;
		try {
			conexion = DataBase.getConnectionBDDACVS();

			String query = "{call SP_GET_DATOS(?, ?)}";
			callStatement = conexion.prepareCall(query);
			callStatement.setString(1, strSql);
			callStatement.registerOutParameter(2, Types.CLOB);
			callStatement.execute();
			salida = callStatement.getString(2);

		} catch (Exception e) {
			logger.error(e);
			return null;
		} finally {
			try {
				if (callStatement != null)
					callStatement.close();
			} catch (Exception e) {
			}
			try {
				if (conexion != null)
					conexion.close();
			} catch (Exception e) {
			}
		}
		return salida;
	}
	//AHORA VAMOS A INSERTAR LOS DATOS**
	public String guardarDatos(String strSql) {
		Connection conexion = null;
		CallableStatement callStatement = null;
		String salida = null;
		try {
			conexion = DataBase.getConnectionBDDACVS();
	
			String query = "";
			query = "{call SP_SET_DATOS(?, ?)}";
			callStatement = conexion.prepareCall(query);
			Clob clobSQL = conexion.createClob();
			clobSQL.setString(1, strSql);
			callStatement.setClob(1, clobSQL);
			callStatement.registerOutParameter(2, Types.CLOB);
			callStatement.execute();
			salida = callStatement.getString(2);

		} catch (Exception e) {
			logger.error(e);
			return null;

		} finally {
			try {
				if (callStatement != null)
					callStatement.close();
			} catch (Exception e) {
			}
			try {
				if (conexion != null)
					conexion.close();
			} catch (Exception e) {
			}
		}
		return salida;
		}
	
	public static String guardarJson(String strSql) throws JSONException {
		Connection conexion = null;
		CallableStatement callStatement = null;
		PreparedStatement prepStatement = null;
		String salida = null;
		String insert_Sql = "INSERT INTO TEM_ICA (ID_CONTRATO, NOMESTABLECIMIENTO)VALUES(?,?)";
		try {
			conexion = DataBase.getConnectionMAPGIS5();
			JSONArray jsonArray = new JSONArray(strSql);
			for (int i = 0; i < jsonArray.length(); i++) {
			    JSONObject object = jsonArray.getJSONObject(i);
			    String idcontrato = object.getString("idcontrato");
			    String nomestablecimiento = object.getString("nomestablecimiento");
			    prepStatement = conexion.prepareStatement(insert_Sql);
				prepStatement.setString(1, idcontrato);
				prepStatement.setString(2, nomestablecimiento);
				try {
					prepStatement.executeQuery();
				} catch (Exception e) {
					logger.error(e);
				}
			}
			//salida = prepStatement.();
		} catch (Exception e) {
			logger.error(e);
			return null;

		} finally {
			try {
				if (prepStatement != null)
					prepStatement.close();
			} catch (Exception e) {
			}
			try {
				if (conexion != null)
					conexion.close();
			} catch (Exception e) {
			}
		}
		return salida;
		}
}
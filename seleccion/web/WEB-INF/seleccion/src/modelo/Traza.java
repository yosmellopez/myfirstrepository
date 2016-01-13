package modelo;

import java.util.Date;

public class Traza {

	private Integer idTraza;

	private String url;

	private Date tiempo;

	private String accion;

	private Usuario usuario;

	public Traza() {
	}

	public Traza(String url, Date tiempo, String accion, Usuario usuario) {
		this.url = url;
		this.tiempo = tiempo;
		this.accion = accion;
		this.usuario = usuario;
	}

	public Traza(Integer idTraza) {
		this.idTraza = idTraza;
	}

	public Integer getIdTraza() {
		return idTraza;
	}

	public void setIdTraza(Integer idTraza) {
		this.idTraza = idTraza;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Date getTiempo() {
		return tiempo;
	}

	public void setTiempo(Date tiempo) {
		this.tiempo = tiempo;
	}

	public String getAccion() {
		return accion;
	}

	public void setAccion(String accion) {
		this.accion = accion;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
}

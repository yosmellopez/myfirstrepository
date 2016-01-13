package modelo;

import java.util.Date;

public class Usuario {

	private Integer idUsuario;

	private String usuario;

	private String nombre;

	private String apellidos;

	private String contrasena;

	private Date ultimoInicio;

	private Rol rol;

	private Boolean barraRecogida;

	public Usuario() {
	}

	public Usuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getApellidos() {
		return apellidos;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getContrasena() {
		return contrasena;
	}

	public void setContrasena(String contrasena) {
		this.contrasena = contrasena;
	}

	public Rol getRol() {
		return rol;
	}

	public void setRol(Rol rol) {
		this.rol = rol;
	}

	public Date getUltimoInicio() {
		return ultimoInicio;
	}

	public void setUltimoInicio(Date ultimoInicio) {
		this.ultimoInicio = ultimoInicio;
	}

	public Boolean getBarraRecogida() {
		return barraRecogida;
	}

	public void setBarraRecogida(Boolean barraRecogida) {
		this.barraRecogida = barraRecogida;
	}
}

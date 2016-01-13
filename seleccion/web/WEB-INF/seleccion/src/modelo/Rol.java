package modelo;

import java.util.List;

public class Rol {

	private Integer idRol;

	private String rol;

	private String disminutivo;

	private List<Usuario> usuarioList;

	public Rol() {
	}

	public Rol(Integer idRol) {
		this.idRol = idRol;
	}

	public Rol(String rol, String disminutivo) {
		this.rol = rol;
		this.disminutivo = disminutivo;
	}

	public Integer getIdRol() {
		return idRol;
	}

	public void setIdRol(Integer idRol) {
		this.idRol = idRol;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public String getDisminutivo() {
		return disminutivo;
	}

	public void setDisminutivo(String disminutivo) {
		this.disminutivo = disminutivo;
	}

	public List<Usuario> getUsuarioList() {
		return usuarioList;
	}

	public void setUsuarioList(List<Usuario> usuarioList) {
		this.usuarioList = usuarioList;
	}

	public String getAuthority() {
		return rol;
	}

}

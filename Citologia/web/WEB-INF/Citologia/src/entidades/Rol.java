package entidades;

public class Rol {
	private Integer idRol;

	private String rol;

	private String disminutivo;

	public Rol() {
	}

	public Rol(Integer idRol) {
		this.idRol = idRol;
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
}

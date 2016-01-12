package entidades;

import java.util.List;

public class ResponsableMuestra {

	private Integer idResponsableMuestra;

	private String nombre;

	private String apellidos;

	private List<PrimeraCitologia> primerasCitologias;

	public ResponsableMuestra() {
	}

	public ResponsableMuestra(Integer idResponsableMuestra) {
		this.idResponsableMuestra = idResponsableMuestra;
	}

	public Integer getIdResponsableMuestra() {
		return idResponsableMuestra;
	}

	public void setIdResponsableMuestra(Integer idResponsableMuestra) {
		this.idResponsableMuestra = idResponsableMuestra;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public List<PrimeraCitologia> getPrimerasCitologias() {
		return primerasCitologias;
	}

	public void setPrimerasCitologias(List<PrimeraCitologia> primerasCitologias) {
		this.primerasCitologias = primerasCitologias;
	}

}

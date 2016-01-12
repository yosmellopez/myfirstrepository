package entidades;

public class AreaSalud {

	private Integer idAreaSalud;

	private String nombre;

	public AreaSalud() {
	}

	public AreaSalud(Integer idAreaSalud) {
		this.idAreaSalud = idAreaSalud;
	}

	public Integer getIdAreaSalud() {
		return idAreaSalud;
	}

	public void setIdAreaSalud(Integer idAreaSalud) {
		this.idAreaSalud = idAreaSalud;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

}

package clases;

public class Especialista {

	private Integer idEspecialista;

	private String nombre;

	private String apellidos;

	private Especialidad especialidad;

	private Grupo grupo;

	private Boolean disponible;

	public Especialista() {
	}

	public Especialista(Integer idEspecialista) {
		this.idEspecialista = idEspecialista;
	}

	public Integer getIdEspecialista() {
		return idEspecialista;
	}

	public void setIdEspecialista(Integer idEspecialista) {
		this.idEspecialista = idEspecialista;
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

	public Especialidad getEspecialidad() {
		return especialidad;
	}

	public void setEspecialidad(Especialidad especialidad) {
		this.especialidad = especialidad;
	}

	public Grupo getGrupo() {
		return grupo;
	}

	public void setGrupo(Grupo grupo) {
		this.grupo = grupo;
	}

	public Boolean getDisponible() {
		return disponible;
	}

	public void setDisponible(Boolean disponible) {
		this.disponible = disponible;
	}

}

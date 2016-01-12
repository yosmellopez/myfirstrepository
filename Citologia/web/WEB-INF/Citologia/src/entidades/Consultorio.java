package entidades;

import java.util.List;

public class Consultorio {

	private Integer idConsultorio;

	private String nombre;

	private AreaSalud areaSalud;

	private List<Paciente> pacientes;

	public Consultorio() {
	}

	public Consultorio(Integer idConsultorio) {
		this.idConsultorio = idConsultorio;
	}

	public Integer getIdConsultorio() {
		return idConsultorio;
	}

	public void setIdConsultorio(Integer idConsultorio) {
		this.idConsultorio = idConsultorio;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public AreaSalud getAreaSalud() {
		return areaSalud;
	}

	public void setAreaSalud(AreaSalud areaSalud) {
		this.areaSalud = areaSalud;
	}

	public List<Paciente> getPacientes() {
		return pacientes;
	}

	public void setPacientes(List<Paciente> pacientes) {
		this.pacientes = pacientes;
	}
}

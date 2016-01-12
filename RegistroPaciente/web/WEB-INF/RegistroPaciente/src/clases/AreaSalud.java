/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clases;

import java.util.List;

public class AreaSalud {
	private Integer idAreaSalud;

	private String nombre;

	private String direccion;

	private List<Paciente> pacienteList;

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

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public List<Paciente> getPacienteList() {
		return pacienteList;
	}

	public void setPacienteList(List<Paciente> pacienteList) {
		this.pacienteList = pacienteList;
	}
}

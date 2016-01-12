/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clases;

import java.util.List;

public class ListaEspera {

	private Integer idListaEspera;

	private String nombreLista;

	private Integer prioridad;

	private List<Paciente> pacienteList;

	public ListaEspera() {
	}

	public ListaEspera(Integer idListaEspera) {
		this.idListaEspera = idListaEspera;
	}

	public Integer getIdListaEspera() {
		return idListaEspera;
	}

	public void setIdListaEspera(Integer idListaEspera) {
		this.idListaEspera = idListaEspera;
	}

	public String getNombreLista() {
		return nombreLista;
	}

	public void setNombreLista(String nombreLista) {
		this.nombreLista = nombreLista;
	}

	public List<Paciente> getPacienteList() {
		return pacienteList;
	}

	public void setPacienteList(List<Paciente> pacienteList) {
		this.pacienteList = pacienteList;
	}

	public Integer getPrioridad() {
		return prioridad;
	}

	public void setPrioridad(Integer prioridad) {
		this.prioridad = prioridad;
	}
}

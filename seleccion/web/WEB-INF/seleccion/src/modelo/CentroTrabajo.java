/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

import java.util.List;

public class CentroTrabajo {

	private Integer idCentroTrabajo;

	private String nombre;

	private List<EntrevistaIndividualCentroTrabajo> entrevistaIndividualCentroTrabajoList;

	public CentroTrabajo() {
	}

	public List<EntrevistaIndividualCentroTrabajo> getEntrevistaIndividualCentroTrabajoList() {
		return entrevistaIndividualCentroTrabajoList;
	}

	public void setEntrevistaIndividualCentroTrabajoList(
			List<EntrevistaIndividualCentroTrabajo> entrevistaIndividualCentroTrabajoList) {
		this.entrevistaIndividualCentroTrabajoList = entrevistaIndividualCentroTrabajoList;
	}

	public CentroTrabajo(Integer idCentroTrabajo) {
		this.idCentroTrabajo = idCentroTrabajo;
	}

	public Integer getIdCentroTrabajo() {
		return idCentroTrabajo;
	}

	public void setIdCentroTrabajo(Integer idCentroTrabajo) {
		this.idCentroTrabajo = idCentroTrabajo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

public class EntrevistaIndividualCentroTrabajoPK {

	private int idEntrevistaIndividual;

	private int idCentroTrabajo;

	public EntrevistaIndividualCentroTrabajoPK() {
	}

	public EntrevistaIndividualCentroTrabajoPK(int idEntrevistaIndividual,
			int idCentroTrabajo) {
		this.idEntrevistaIndividual = idEntrevistaIndividual;
		this.idCentroTrabajo = idCentroTrabajo;
	}

	public int getIdEntrevistaIndividual() {
		return idEntrevistaIndividual;
	}

	public void setIdEntrevistaIndividual(int idEntrevistaIndividual) {
		this.idEntrevistaIndividual = idEntrevistaIndividual;
	}

	public int getIdCentroTrabajo() {
		return idCentroTrabajo;
	}

	public void setIdCentroTrabajo(int idCentroTrabajo) {
		this.idCentroTrabajo = idCentroTrabajo;
	}
}

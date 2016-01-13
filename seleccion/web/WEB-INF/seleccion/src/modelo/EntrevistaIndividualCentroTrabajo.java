/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

import java.util.Date;

public class EntrevistaIndividualCentroTrabajo {

	protected EntrevistaIndividualCentroTrabajoPK entrevistaIndividualCentroTrabajoPK;

	private Date desde;

	private Date hasta;

	private String cargo;

	private String causaBaja;

	private CentroTrabajo centroTrabajo;

	private EntrevistaIndividual entrevistaIndividual;

	public EntrevistaIndividualCentroTrabajo() {
	}

	public EntrevistaIndividualCentroTrabajo(
			EntrevistaIndividualCentroTrabajoPK entrevistaIndividualCentroTrabajoPK) {
		this.entrevistaIndividualCentroTrabajoPK = entrevistaIndividualCentroTrabajoPK;
	}

	public EntrevistaIndividualCentroTrabajo(int idEntrevistaIndividual,
			int idCentroTrabajo) {
		this.entrevistaIndividualCentroTrabajoPK = new EntrevistaIndividualCentroTrabajoPK(
				idEntrevistaIndividual, idCentroTrabajo);
	}

	public EntrevistaIndividualCentroTrabajoPK getEntrevistaIndividualCentroTrabajoPK() {
		return entrevistaIndividualCentroTrabajoPK;
	}

	public void setEntrevistaIndividualCentroTrabajoPK(
			EntrevistaIndividualCentroTrabajoPK entrevistaIndividualCentroTrabajoPK) {
		this.entrevistaIndividualCentroTrabajoPK = entrevistaIndividualCentroTrabajoPK;
	}

	public Date getDesde() {
		return desde;
	}

	public void setDesde(Date desde) {
		this.desde = desde;
	}

	public Date getHasta() {
		return hasta;
	}

	public String getCausaBaja() {
		return causaBaja;
	}

	public void setHasta(Date hasta) {
		this.hasta = hasta;
	}

	public String getCargo() {
		return cargo;
	}

	public void setCargo(String cargo) {
		this.cargo = cargo;
	}

	public CentroTrabajo getCentroTrabajo() {
		return centroTrabajo;
	}

	public void setCentroTrabajo(CentroTrabajo centroTrabajo) {
		this.centroTrabajo = centroTrabajo;
	}

	public EntrevistaIndividual getEntrevistaIndividual() {
		return entrevistaIndividual;
	}

	public void setEntrevistaIndividual(
			EntrevistaIndividual entrevistaIndividual) {
		this.entrevistaIndividual = entrevistaIndividual;
	}

	public void setCausaBaja(String causaBaja) {
		this.causaBaja = causaBaja;
	}
}

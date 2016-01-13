/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 *
 * @author Trabajo
 */
@Embeddable
public class EntrevistaIndividualCentroTrabajoPK implements Serializable {
    @Basic(optional = false)
    @Column(name = "id_entrevista_individual", nullable = false)
    private int idEntrevistaIndividual;

    @Basic(optional = false)
    @Column(name = "id_centro_trabajo", nullable = false)
    private int idCentroTrabajo;

    public EntrevistaIndividualCentroTrabajoPK() {
    }

    public EntrevistaIndividualCentroTrabajoPK(int idEntrevistaIndividual, int idCentroTrabajo) {
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

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) idEntrevistaIndividual;
        hash += (int) idCentroTrabajo;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof EntrevistaIndividualCentroTrabajoPK)) {
            return false;
        }
        EntrevistaIndividualCentroTrabajoPK other = (EntrevistaIndividualCentroTrabajoPK) object;
        if (this.idEntrevistaIndividual != other.idEntrevistaIndividual) {
            return false;
        }
        if (this.idCentroTrabajo != other.idCentroTrabajo) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "javaapplication30.EntrevistaIndividualCentroTrabajoPK[ idEntrevistaIndividual=" + idEntrevistaIndividual + ", idCentroTrabajo=" + idCentroTrabajo + " ]";
    }
    
}

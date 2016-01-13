/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "entrevista_individual_centro_trabajo")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "EntrevistaIndividualCentroTrabajo.findAll", query = "SELECT e FROM EntrevistaIndividualCentroTrabajo e"),
    @NamedQuery(name = "EntrevistaIndividualCentroTrabajo.findByIdEntrevistaIndividual", query = "SELECT e FROM EntrevistaIndividualCentroTrabajo e WHERE e.entrevistaIndividualCentroTrabajoPK.idEntrevistaIndividual = :idEntrevistaIndividual"),
    @NamedQuery(name = "EntrevistaIndividualCentroTrabajo.findByIdCentroTrabajo", query = "SELECT e FROM EntrevistaIndividualCentroTrabajo e WHERE e.entrevistaIndividualCentroTrabajoPK.idCentroTrabajo = :idCentroTrabajo"),
    @NamedQuery(name = "EntrevistaIndividualCentroTrabajo.findByCargo", query = "SELECT e FROM EntrevistaIndividualCentroTrabajo e WHERE e.cargo = :cargo")})
public class EntrevistaIndividualCentroTrabajo implements Serializable {

    private static final long serialVersionUID = 1L;

    @EmbeddedId
    protected EntrevistaIndividualCentroTrabajoPK entrevistaIndividualCentroTrabajoPK;

    @Column(name = "desde")
    @Temporal(TemporalType.DATE)
    private Date desde;

    @Column(name = "hasta")
    @Temporal(TemporalType.DATE)
    private Date hasta;

    @Column(name = "cargo", length = 255)
    private String cargo;

    @Column(name = "causa_baja", length = 255)
    private String causaBaja;

    @JoinColumn(name = "id_centro_trabajo", referencedColumnName = "id_centro_trabajo", nullable = false, insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private CentroTrabajo centroTrabajo;

    @JoinColumn(name = "id_entrevista_individual", referencedColumnName = "id_entrevista_individual", nullable = false, insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private EntrevistaIndividual entrevistaIndividual;

    public EntrevistaIndividualCentroTrabajo() {
    }

    public EntrevistaIndividualCentroTrabajo(EntrevistaIndividualCentroTrabajoPK entrevistaIndividualCentroTrabajoPK) {
        this.entrevistaIndividualCentroTrabajoPK = entrevistaIndividualCentroTrabajoPK;
    }

    public EntrevistaIndividualCentroTrabajo(int idEntrevistaIndividual, int idCentroTrabajo) {
        this.entrevistaIndividualCentroTrabajoPK = new EntrevistaIndividualCentroTrabajoPK(idEntrevistaIndividual, idCentroTrabajo);
    }

    public EntrevistaIndividualCentroTrabajoPK getEntrevistaIndividualCentroTrabajoPK() {
        return entrevistaIndividualCentroTrabajoPK;
    }

    public void setEntrevistaIndividualCentroTrabajoPK(EntrevistaIndividualCentroTrabajoPK entrevistaIndividualCentroTrabajoPK) {
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

    public void setEntrevistaIndividual(EntrevistaIndividual entrevistaIndividual) {
        this.entrevistaIndividual = entrevistaIndividual;
    }

    public void setCausaBaja(String causaBaja) {
        this.causaBaja = causaBaja;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (entrevistaIndividualCentroTrabajoPK != null ? entrevistaIndividualCentroTrabajoPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof EntrevistaIndividualCentroTrabajo)) {
            return false;
        }
        EntrevistaIndividualCentroTrabajo other = (EntrevistaIndividualCentroTrabajo) object;
        if ((this.entrevistaIndividualCentroTrabajoPK == null && other.entrevistaIndividualCentroTrabajoPK != null) || (this.entrevistaIndividualCentroTrabajoPK != null && !this.entrevistaIndividualCentroTrabajoPK.equals(other.entrevistaIndividualCentroTrabajoPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "javaapplication30.EntrevistaIndividualCentroTrabajo[ entrevistaIndividualCentroTrabajoPK=" + entrevistaIndividualCentroTrabajoPK + " ]";
    }

}

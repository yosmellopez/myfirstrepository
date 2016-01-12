/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clases;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author María Isabel
 */
@Entity
@Table(name = "causa")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Causa.findAll", query = "SELECT c FROM Causa c"),
    @NamedQuery(name = "Causa.findByIdCausa", query = "SELECT c FROM Causa c WHERE c.idCausa = :idCausa"),
    @NamedQuery(name = "Causa.findByCausa", query = "SELECT c FROM Causa c WHERE c.causa = :causa")})
public class Causa implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_causa", nullable = false)
    private Integer idCausa;

    @Column(name = "causa", length = 255)
    private String causa;

    @OneToMany(mappedBy = "causaBaja")
    @JsonIgnore
    private List<Paciente> pacienteList;

    public Causa() {
    }

    public Causa(Integer idCausa) {
        this.idCausa = idCausa;
    }

    public Integer getIdCausa() {
        return idCausa;
    }

    public void setIdCausa(Integer idCausa) {
        this.idCausa = idCausa;
    }

    public String getCausa() {
        return causa;
    }

    public void setCausa(String causa) {
        this.causa = causa;
    }

    @XmlTransient
    public List<Paciente> getPacienteList() {
        return pacienteList;
    }

    public void setPacienteList(List<Paciente> pacienteList) {
        this.pacienteList = pacienteList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idCausa != null ? idCausa.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Causa)) {
            return false;
        }
        Causa other = (Causa) object;
        if ((this.idCausa == null && other.idCausa != null) || (this.idCausa != null && !this.idCausa.equals(other.idCausa))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "clases.Causa[ idCausa=" + idCausa + " ]";
    }
    
}

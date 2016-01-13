/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

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

@Entity
@Table(name = "nivel_escolar")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NivelEscolar.findAll", query = "SELECT n FROM NivelEscolar n"),
    @NamedQuery(name = "NivelEscolar.findByIdNivelEscolar", query = "SELECT n FROM NivelEscolar n WHERE n.idNivelEscolar = :idNivelEscolar"),
    @NamedQuery(name = "NivelEscolar.findByNivelEscolar", query = "SELECT n FROM NivelEscolar n WHERE n.nivelEscolar = :nivelEscolar")})
public class NivelEscolar implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_nivel_escolar", nullable = false)
    private Integer idNivelEscolar;

    @Column(name = "nivel_escolar", length = 255)
    private String nivelEscolar;

    @OneToMany(mappedBy = "nivelEscolar")
    @JsonIgnore
    private List<EntrevistaIndividual> entrevistaIndividualList;

    public NivelEscolar() {
    }

    public NivelEscolar(Integer idNivelEscolar) {
        this.idNivelEscolar = idNivelEscolar;
    }

    public Integer getIdNivelEscolar() {
        return idNivelEscolar;
    }

    public void setIdNivelEscolar(Integer idNivelEscolar) {
        this.idNivelEscolar = idNivelEscolar;
    }

    public String getNivelEscolar() {
        return nivelEscolar;
    }

    public void setNivelEscolar(String nivelEscolar) {
        this.nivelEscolar = nivelEscolar;
    }

    @XmlTransient
    public List<EntrevistaIndividual> getEntrevistaIndividualList() {
        return entrevistaIndividualList;
    }

    public void setEntrevistaIndividualList(List<EntrevistaIndividual> entrevistaIndividualList) {
        this.entrevistaIndividualList = entrevistaIndividualList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idNivelEscolar != null ? idNivelEscolar.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof NivelEscolar)) {
            return false;
        }
        NivelEscolar other = (NivelEscolar) object;
        if ((this.idNivelEscolar == null && other.idNivelEscolar != null) || (this.idNivelEscolar != null && !this.idNivelEscolar.equals(other.idNivelEscolar))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "modelo.NivelEscolar[ idNivelEscolar=" + idNivelEscolar + " ]";
    }
    
}

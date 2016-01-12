package entidades;

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
@Table(name = "metrorragia")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Metrorragia.findAll", query = "SELECT m FROM Metrorragia m"),
    @NamedQuery(name = "Metrorragia.findByIdMetrorragia", query = "SELECT m FROM Metrorragia m WHERE m.idMetrorragia = :idMetrorragia"),
    @NamedQuery(name = "Metrorragia.findByMetrorragia", query = "SELECT m FROM Metrorragia m WHERE m.metrorragia = :metrorragia")})
public class Metrorragia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_metrorragia", nullable = false)
    private Integer idMetrorragia;

    @Column(name = "metrorragia", length = 255)
    private String metrorragia;

    @OneToMany(mappedBy = "metrorragia")
    @JsonIgnore
    private List<Antecedente> antecedentes;

    public Metrorragia() {
    }

    public Metrorragia(Integer idMetrorragia) {
        this.idMetrorragia = idMetrorragia;
    }

    public Integer getIdMetrorragia() {
        return idMetrorragia;
    }

    public void setIdMetrorragia(Integer idMetrorragia) {
        this.idMetrorragia = idMetrorragia;
    }

    public String getMetrorragia() {
        return metrorragia;
    }

    public void setMetrorragia(String metrorragia) {
        this.metrorragia = metrorragia;
    }

    @XmlTransient
    public List<Antecedente> getAntecedentes() {
        return antecedentes;
    }

    public void setAntecedentes(List<Antecedente> antecedentes) {
        this.antecedentes = antecedentes;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idMetrorragia != null ? idMetrorragia.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Metrorragia)) {
            return false;
        }
        Metrorragia other = (Metrorragia) object;
        if ((this.idMetrorragia == null && other.idMetrorragia != null) || (this.idMetrorragia != null && !this.idMetrorragia.equals(other.idMetrorragia))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entidades.Metrorragia[ idMetrorragia=" + idMetrorragia + " ]";
    }

}

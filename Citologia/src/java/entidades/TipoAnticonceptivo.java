package entidades;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "tipo_anticonceptivo")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "TipoAnticonceptivo.findAll", query = "SELECT t FROM TipoAnticonceptivo t"),
    @NamedQuery(name = "TipoAnticonceptivo.findByIdTipoAnticonceptivo", query = "SELECT t FROM TipoAnticonceptivo t WHERE t.idTipoAnticonceptivo = :idTipoAnticonceptivo"),
    @NamedQuery(name = "TipoAnticonceptivo.findByNombreAnticonceptivo", query = "SELECT t FROM TipoAnticonceptivo t WHERE t.nombreAnticonceptivo = :nombreAnticonceptivo"),
    @NamedQuery(name = "TipoAnticonceptivo.findByOral", query = "SELECT t FROM TipoAnticonceptivo t WHERE t.oral = :oral")})
@JsonIgnoreProperties(value = {"objeto"})
public class TipoAnticonceptivo implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_tipo_anticonceptivo", nullable = false)
    private Integer idTipoAnticonceptivo;

    @Column(name = "nombre_anticonceptivo", length = 255)
    private String nombreAnticonceptivo;

    @Column(name = "oral")
    private Boolean oral;

    @OneToMany(mappedBy = "tipoAnticonceptivo")
    @JsonIgnore
    private List<Antecedente> antecedentes;

    public TipoAnticonceptivo() {
    }

    public TipoAnticonceptivo(Integer idTipoAnticonceptivo) {
        this.idTipoAnticonceptivo = idTipoAnticonceptivo;
    }

    public Integer getIdTipoAnticonceptivo() {
        return idTipoAnticonceptivo;
    }

    public void setIdTipoAnticonceptivo(Integer idTipoAnticonceptivo) {
        this.idTipoAnticonceptivo = idTipoAnticonceptivo;
    }

    public String getNombreAnticonceptivo() {
        return nombreAnticonceptivo;
    }

    public void setNombreAnticonceptivo(String nombreAnticonceptivo) {
        this.nombreAnticonceptivo = nombreAnticonceptivo;
    }

    public Boolean getOral() {
        return oral;
    }

    public void setOral(Boolean oral) {
        this.oral = oral;
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
        hash += (idTipoAnticonceptivo != null ? idTipoAnticonceptivo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof TipoAnticonceptivo)) {
            return false;
        }
        TipoAnticonceptivo other = (TipoAnticonceptivo) object;
        if ((this.idTipoAnticonceptivo == null && other.idTipoAnticonceptivo != null) || (this.idTipoAnticonceptivo != null && !this.idTipoAnticonceptivo.equals(other.idTipoAnticonceptivo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entidades.TipoAnticonceptivo[ idTipoAnticonceptivo=" + idTipoAnticonceptivo + " ]";
    }
    
}

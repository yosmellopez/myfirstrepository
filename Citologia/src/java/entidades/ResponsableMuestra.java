package entidades;

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
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@Table(name = "responsable_muestra")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ResponsableMuestra.findAll", query = "SELECT r FROM ResponsableMuestra r"),
    @NamedQuery(name = "ResponsableMuestra.findByIdResponsableMuestra", query = "SELECT r FROM ResponsableMuestra r WHERE r.idResponsableMuestra = :idResponsableMuestra"),
    @NamedQuery(name = "ResponsableMuestra.findByNombre", query = "SELECT r FROM ResponsableMuestra r WHERE r.nombre = :nombre"),
    @NamedQuery(name = "ResponsableMuestra.findByApellidos", query = "SELECT r FROM ResponsableMuestra r WHERE r.apellidos = :apellidos")})
@JsonIgnoreProperties(value = {"objeto"})
public class ResponsableMuestra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_responsable_muestra", nullable = false)
    private Integer idResponsableMuestra;

    @Column(name = "nombre", length = 255)
    private String nombre;

    @Column(name = "apellidos", length = 255)
    private String apellidos;

    @ManyToMany(mappedBy = "responsablesMuestras")
    @JsonIgnore
    private List<PrimeraCitologia> primerasCitologias;

    public ResponsableMuestra() {
    }

    public ResponsableMuestra(Integer idResponsableMuestra) {
        this.idResponsableMuestra = idResponsableMuestra;
    }

    public Integer getIdResponsableMuestra() {
        return idResponsableMuestra;
    }

    public void setIdResponsableMuestra(Integer idResponsableMuestra) {
        this.idResponsableMuestra = idResponsableMuestra;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    @XmlTransient
    public List<PrimeraCitologia> getPrimerasCitologias() {
        return primerasCitologias;
    }

    public void setPrimerasCitologias(List<PrimeraCitologia> primerasCitologias) {
        this.primerasCitologias = primerasCitologias;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idResponsableMuestra != null ? idResponsableMuestra.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ResponsableMuestra)) {
            return false;
        }
        ResponsableMuestra other = (ResponsableMuestra) object;
        if ((this.idResponsableMuestra == null && other.idResponsableMuestra != null) || (this.idResponsableMuestra != null && !this.idResponsableMuestra.equals(other.idResponsableMuestra))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entidades.ResponsableMuestra[ idResponsableMuestra=" + idResponsableMuestra + " ]";
    }

}

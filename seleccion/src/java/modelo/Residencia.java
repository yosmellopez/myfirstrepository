package modelo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import utiles.SerializadorFecha;

@Entity
@Table(name = "residencia")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Residencia.findAll", query = "SELECT r FROM Residencia r"),
    @NamedQuery(name = "Residencia.findByDireccion", query = "SELECT r FROM Residencia r WHERE r.direccion = :direccion")})
public class Residencia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_residencia", nullable = false)
    private Integer idResidencia;

    @Column(name = "desde")
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @JsonSerialize(using = SerializadorFecha.class)
    private Date desde;

    @Column(name = "hasta")
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @JsonSerialize(using = SerializadorFecha.class)
    private Date hasta;

    @Column(name = "direccion", length = 21474)
    private String direccion;

    @ManyToMany(mappedBy = "residencias")
    @JsonIgnore
    private List<EntrevistaIndividual> entrevistaIndividualList;

    public Residencia() {
    }

    public Residencia(Integer idResidencia) {
        this.idResidencia = idResidencia;
    }

    public Integer getIdResidencia() {
        return idResidencia;
    }

    public void setIdResidencia(Integer idResidencia) {
        this.idResidencia = idResidencia;
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

    public void setHasta(Date hasta) {
        this.hasta = hasta;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
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
        hash += (idResidencia != null ? idResidencia.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Residencia)) {
            return false;
        }
        Residencia other = (Residencia) object;
        if ((this.idResidencia == null && other.idResidencia != null) || (this.idResidencia != null && !this.idResidencia.equals(other.idResidencia))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "modelo.Residencia[ idResidencia=" + idResidencia + " ]";
    }
    
}

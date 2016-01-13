package modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import utiles.DeserializadorFecha;
import utiles.SerializadorFecha;

@Entity
@Table(name = "observacion")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Observacion.findAll", query = "SELECT o FROM Observacion o"),
    @NamedQuery(name = "Observacion.findByMotivoBaja", query = "SELECT o FROM Observacion o WHERE o.motivoBaja = :motivoBaja")})
public class Observacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_observacion", nullable = false)
    private Integer idObservacion;

    @Column(name = "fecha_presentacion")
    @Temporal(TemporalType.DATE)
    @JsonSerialize(using = SerializadorFecha.class)
    @JsonDeserialize(using = DeserializadorFecha.class)
    private Date fechaPresentacion;

    @Column(name = "fecha_baja")
    @Temporal(TemporalType.DATE)
    @JsonSerialize(using = SerializadorFecha.class)
    @JsonDeserialize(using = DeserializadorFecha.class)
    private Date fechaBaja;

    @Column(name = "motivo_baja", length = 255)
    private String motivoBaja;

    @OneToMany(mappedBy = "observacion")
    @JsonIgnore
    private List<ControlAspirante> controlAspirantes;

    public Observacion() {
    }

    public Observacion(Integer idObservacion) {
        this.idObservacion = idObservacion;
    }

    public Integer getIdObservacion() {
        return idObservacion;
    }

    public void setIdObservacion(Integer idObservacion) {
        this.idObservacion = idObservacion;
    }

    public Date getFechaPresentacion() {
        return fechaPresentacion;
    }

    public void setFechaPresentacion(Date fechaPresentacion) {
        this.fechaPresentacion = fechaPresentacion;
    }

    public Date getFechaBaja() {
        return fechaBaja;
    }

    public void setFechaBaja(Date fechaBaja) {
        this.fechaBaja = fechaBaja;
    }

    public String getMotivoBaja() {
        return motivoBaja;
    }

    public void setMotivoBaja(String motivoBaja) {
        this.motivoBaja = motivoBaja;
    }

    @XmlTransient
    public List<ControlAspirante> getControlAspirantes() {
        return controlAspirantes;
    }

    public void setControlAspirantes(List<ControlAspirante> controlAspirantes) {
        this.controlAspirantes = controlAspirantes;
    }
}

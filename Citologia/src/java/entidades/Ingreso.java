package entidades;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;
import utiles.DeserializadorFecha;
import utiles.SerializadorFecha;

@Entity
@Table(name = "ingreso")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Ingreso.findAll", query = "SELECT i FROM Ingreso i"),
    @NamedQuery(name = "Ingreso.cantidad", query = "SELECT COUNT(i) FROM Ingreso i"),
    @NamedQuery(name = "Ingreso.findByIdIngreso", query = "SELECT i FROM Ingreso i WHERE i.idIngreso = :idIngreso"),
    @NamedQuery(name = "Ingreso.findByDiagnosticoProbable", query = "SELECT i FROM Ingreso i WHERE i.diagnosticoProbable = :diagnosticoProbable")})
@JsonIgnoreProperties(value = {"historiaClinica", "nombre", "primerApellido", "segundoApellido", "avisarNombre", "avisarTelefono", "avisarDireccion"})
public class Ingreso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_ingreso")
    private Integer idIngreso;

    @JoinColumn(name = "id_paciente", referencedColumnName = "id_paciente")
    @ManyToOne(cascade = CascadeType.REFRESH)
    private Paciente paciente;

    @JoinColumn(name = "id_cama", referencedColumnName = "id_cama")
    @ManyToOne
    private Cama cama;

    @Column(name = "fecha")
    @Temporal(TemporalType.DATE)
    @JsonSerialize(using = SerializadorFecha.class)
    @JsonDeserialize(using = DeserializadorFecha.class)
    private Date fecha;

    @Column(name = "meridiano")
    private Boolean meridiano;

    @Column(name = "diagnostico_probable")
    private String diagnosticoProbable;

    @Transient
    private String agrupar;

    public Ingreso() {
    }

    public Ingreso(Integer idIngreso) {
        this.idIngreso = idIngreso;
    }

    public Integer getIdIngreso() {
        return idIngreso;
    }

    public void setIdIngreso(Integer idIngreso) {
        this.idIngreso = idIngreso;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Cama getCama() {
        return cama;
    }

    public void setCama(Cama cama) {
        this.cama = cama;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Boolean getMeridiano() {
        return meridiano;
    }

    public void setMeridiano(Boolean meridiano) {
        this.meridiano = meridiano;
    }

    public String getDiagnosticoProbable() {
        return diagnosticoProbable;
    }

    public void setDiagnosticoProbable(String diagnosticoProbable) {
        this.diagnosticoProbable = diagnosticoProbable;
    }

    public String getAgrupar() {
        agrupar = paciente.getNombreCompleto();
        return agrupar;
    }

    public void setAgrupar(String agrupar) {
        this.agrupar = paciente.getNombreCompleto();
    }

}

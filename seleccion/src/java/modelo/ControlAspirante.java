package modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "control_aspirante")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ControlAspirante.findAll", query = "SELECT c FROM ControlAspirante c")})
@JsonIgnoreProperties(ignoreUnknown = true)
public class ControlAspirante implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_control_aspirante", nullable = false)
    private Integer idControlAspirante;

    @Column(name = "exp_proceso")
    private Boolean expProceso;

    @Column(name = "aprobado_minint")
    private Boolean aprobadoMinint;

    @Column(name = "aprobado")
    private Boolean aprobado;

    @Column(name = "cursando")
    private Boolean cursando;

    @Column(name = "numero_expediente")
    private Integer numeroExpediente;

    @Column(name = "fecha_baja")
    @Temporal(TemporalType.DATE)
    private Date fechaBaja;

    @Column(name = "fecha_inicio")
    @Temporal(TemporalType.DATE)
    private Date fechaInicio;

    @Column(name = "fecha_examen_sicometrico")
    @Temporal(TemporalType.DATE)
    private Date fechaExamenSicometrico;

    @JoinColumn(name = "observacion", referencedColumnName = "id_observacion")
    @ManyToOne(cascade = CascadeType.ALL)
    private Observacion observacion;

    @JoinColumn(name = "aspirante", referencedColumnName = "id_aspirante")
    @OneToOne(optional = true, cascade = {CascadeType.MERGE})
    private Aspirante aspirante;

    public ControlAspirante() {
    }

    public ControlAspirante(Integer idControlAspirante) {
        this.idControlAspirante = idControlAspirante;
    }

    public Integer getIdControlAspirante() {
        return idControlAspirante;
    }

    public void setIdControlAspirante(Integer idControlAspirante) {
        this.idControlAspirante = idControlAspirante;
    }

    public Boolean getExpProceso() {
        return expProceso;
    }

    public void setExpProceso(Boolean expProceso) {
        this.expProceso = expProceso;
    }

    public Boolean getAprobadoMinint() {
        return aprobadoMinint;
    }

    public void setAprobadoMinint(Boolean aprobadoMinint) {
        this.aprobadoMinint = aprobadoMinint;
    }

    public Observacion getObservacion() {
        return observacion;
    }

    public void setObservacion(Observacion observacion) {
        this.observacion = observacion;
    }

    public Boolean getAprobado() {
        return aprobado;
    }

    public void setAprobado(Boolean aprobado) {
        this.aprobado = aprobado;
    }

    public Boolean getCursando() {
        return cursando;
    }

    public void setCursando(Boolean cursando) {
        this.cursando = cursando;
    }

    public Integer getNumeroExpediente() {
        return numeroExpediente;
    }

    public void setNumeroExpediente(Integer numeroExpediente) {
        this.numeroExpediente = numeroExpediente;
    }

    public Date getFechaBaja() {
        return fechaBaja;
    }

    public void setFechaBaja(Date fechaBaja) {
        this.fechaBaja = fechaBaja;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaExamenSicometrico() {
        return fechaExamenSicometrico;
    }

    public void setFechaExamenSicometrico(Date fechaExamenSicometrico) {
        this.fechaExamenSicometrico = fechaExamenSicometrico;
    }

    public Aspirante getAspirante() {
        return aspirante;
    }

    public void setAspirante(Aspirante aspirante) {
        this.aspirante = aspirante;
    }

}

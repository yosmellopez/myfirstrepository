package entidades;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import utiles.DeserializadorFecha;
import utiles.SerializadorFecha;

@Entity
@Table(name = "primera_citologia")
@NamedQueries({
    @NamedQuery(name = "PrimeraCitologia.findAll", query = "SELECT p FROM PrimeraCitologia p"),
    @NamedQuery(name = "PrimeraCitologia.findByIdPrimeraCitologia", query = "SELECT p FROM PrimeraCitologia p WHERE p.idPrimeraCitologia = :idPrimeraCitologia"),
    @NamedQuery(name = "PrimeraCitologia.findByFechaTomaMuestra", query = "SELECT p FROM PrimeraCitologia p WHERE p.fechaTomaMuestra = :fechaTomaMuestra"),
    @NamedQuery(name = "PrimeraCitologia.findByFechaResultadoFinal", query = "SELECT p FROM PrimeraCitologia p WHERE p.fechaResultadoFinal = :fechaResultadoFinal")})
public class PrimeraCitologia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_primera_citologia", nullable = false)
    private Integer idPrimeraCitologia;

    @Column(name = "fecha_toma_muestra")
    @Temporal(TemporalType.DATE)
    @JsonDeserialize(using = DeserializadorFecha.class)
    @JsonSerialize(using = SerializadorFecha.class)
    private Date fechaTomaMuestra;

    @Column(name = "fecha_resultado_final")
    @Temporal(TemporalType.DATE)
    @JsonDeserialize(using = DeserializadorFecha.class)
    @JsonSerialize(using = SerializadorFecha.class)
    private Date fechaResultadoFinal;

    @ManyToOne
    @JoinColumn(name = "id_diagnostico_final", referencedColumnName = "id_diagnostico_final", nullable = false)
    private DiagnosticoFinal diagnosticoFinal;

    @JoinTable(name = "reponsable_primera_citologia", joinColumns = {
        @JoinColumn(name = "id_primera_citologia", referencedColumnName = "id_primera_citologia", nullable = false)}, inverseJoinColumns = {
        @JoinColumn(name = "id_responsable_muestra", referencedColumnName = "id_responsable_muestra", nullable = false)})
    @ManyToMany(fetch = FetchType.EAGER)
    private List<ResponsableMuestra> responsablesMuestras;

    public PrimeraCitologia() {
    }

    public PrimeraCitologia(Integer idPrimeraCitologia) {
        this.idPrimeraCitologia = idPrimeraCitologia;
    }

    public Integer getIdPrimeraCitologia() {
        return idPrimeraCitologia;
    }

    public void setIdPrimeraCitologia(Integer idPrimeraCitologia) {
        this.idPrimeraCitologia = idPrimeraCitologia;
    }

    public Date getFechaTomaMuestra() {
        return fechaTomaMuestra;
    }

    public void setFechaTomaMuestra(Date fechaTomaMuestra) {
        this.fechaTomaMuestra = fechaTomaMuestra;
    }

    public Date getFechaResultadoFinal() {
        return fechaResultadoFinal;
    }

    public void setFechaResultadoFinal(Date fechaResultadoFinal) {
        this.fechaResultadoFinal = fechaResultadoFinal;
    }

    public DiagnosticoFinal getDiagnosticoFinal() {
        return diagnosticoFinal;
    }

    public void setDiagnosticoFinal(DiagnosticoFinal diagnosticoFinal) {
        this.diagnosticoFinal = diagnosticoFinal;
    }

    public List<ResponsableMuestra> getResponsablesMuestras() {
        return responsablesMuestras;
    }

    public void setResponsablesMuestras(List<ResponsableMuestra> responsablesMuestras) {
        this.responsablesMuestras = responsablesMuestras;
    }

}

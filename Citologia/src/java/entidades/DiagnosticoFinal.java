package entidades;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
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
@Table(name = "diagnostico_final")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "DiagnosticoFinal.findAll", query = "SELECT d FROM DiagnosticoFinal d"),
    @NamedQuery(name = "DiagnosticoFinal.findByDiagnosticoFinal", query = "SELECT d FROM DiagnosticoFinal d WHERE d.diagnosticoFinal = :diagnosticoFinal")})
@JsonIgnoreProperties(value = {"objeto"})
public class DiagnosticoFinal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_diagnostico_final", nullable = false)
    private Integer idDiagnosticoFinal;

    @Column(name = "diagnostico_final", length = 255)
    private String diagnosticoFinal;

    @OneToMany(mappedBy = "diagnosticoFinal", cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<PrimeraCitologia> primerasCitologias;

    public DiagnosticoFinal() {
    }

    public DiagnosticoFinal(Integer idDiagnosticoFinal) {
        this.idDiagnosticoFinal = idDiagnosticoFinal;
    }

    public Integer getIdDiagnosticoFinal() {
        return idDiagnosticoFinal;
    }

    public void setIdDiagnosticoFinal(Integer idDiagnosticoFinal) {
        this.idDiagnosticoFinal = idDiagnosticoFinal;
    }

    public String getDiagnosticoFinal() {
        return diagnosticoFinal;
    }

    public void setDiagnosticoFinal(String diagnosticoFinal) {
        this.diagnosticoFinal = diagnosticoFinal;
    }

    @XmlTransient
    public List<PrimeraCitologia> getPrimerasCitologias() {
        return primerasCitologias;
    }

    public void setPrimerasCitologias(List<PrimeraCitologia> primerasCitologias) {
        this.primerasCitologias = primerasCitologias;
    }
}

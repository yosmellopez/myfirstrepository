package modelo;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "resumen_sicometro")
public class ResumenSicometrico implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_resumen_sicometrico", nullable = false)
    private Integer idResumenSicometrico;

    @OneToOne(mappedBy = "resumenSicometrico")
    private DocumentoAprobatorio documentoAprobatorio;

    @JoinColumn(name = "aspirante", referencedColumnName = "id_aspirante", foreignKey = @ForeignKey(name = "fk_resumen_sicometrico_aspirante"))
    @ManyToOne
    private Aspirante aspirante;

    @Column(name = "enfermedades")
    private String enfermedades;

    @Column(name = "diagnostico")
    private String diagnostico;

    public ResumenSicometrico() {
    }

    public ResumenSicometrico(Integer idResumenSicometrico) {
        this.idResumenSicometrico = idResumenSicometrico;
    }

    public Integer getIdResumenSicometrico() {
        return idResumenSicometrico;
    }

    public void setIdResumenSicometrico(Integer idResumenSicometrico) {
        this.idResumenSicometrico = idResumenSicometrico;
    }

    public DocumentoAprobatorio getDocumentoAprobatorio() {
        return documentoAprobatorio;
    }

    public void setDocumentoAprobatorio(DocumentoAprobatorio documentoAprobatorio) {
        this.documentoAprobatorio = documentoAprobatorio;
    }

    public String getEnfermedades() {
        return enfermedades;
    }

    public void setEnfermedades(String enfermedades) {
        this.enfermedades = enfermedades;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    public Aspirante getAspirante() {
        return aspirante;
    }

    public void setAspirante(Aspirante aspirante) {
        this.aspirante = aspirante;
    }
}

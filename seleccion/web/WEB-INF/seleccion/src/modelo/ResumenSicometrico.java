package modelo;

public class ResumenSicometrico {

    private Integer idResumenSicometrico;

    private DocumentoAprobatorio documentoAprobatorio;

    private Aspirante aspirante;

    private String enfermedades;

    private String diagnostico;

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

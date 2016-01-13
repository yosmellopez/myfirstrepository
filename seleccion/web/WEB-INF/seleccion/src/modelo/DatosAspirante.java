package modelo;

public class DatosAspirante {

    private Integer idDatosAspirante;

    private String antecedentePatologico;

    private String antecedentePenal;

    private String antecedenteFamiliar;

    private Short numHijos;

    private String problemaFamiliar;

    private String personasConvivencia;

    private Aspirante aspirante;

    public DatosAspirante() {
    }

    public DatosAspirante(Integer idAspirante) {
        this.idDatosAspirante = idAspirante;
    }

    public Integer getIdDatosAspirante() {
        return idDatosAspirante;
    }

    public void setIdDatosAspirante(Integer idDatosAspirante) {
        this.idDatosAspirante = idDatosAspirante;
    }

    public String getAntecedentePatologico() {
        return antecedentePatologico;
    }

    public void setAntecedentePatologico(String antecedentePatologico) {
        this.antecedentePatologico = antecedentePatologico;
    }

    public String getAntecedentePenal() {
        return antecedentePenal;
    }

    public void setAntecedentePenal(String antecedentePenal) {
        this.antecedentePenal = antecedentePenal;
    }

    public String getAntecedenteFamiliar() {
        return antecedenteFamiliar;
    }

    public void setAntecedenteFamiliar(String antecedenteFamiliar) {
        this.antecedenteFamiliar = antecedenteFamiliar;
    }

    public Short getNumHijos() {
        return numHijos;
    }

    public void setNumHijos(Short numHijos) {
        this.numHijos = numHijos;
    }

    public String getProblemaFamiliar() {
        return problemaFamiliar;
    }

    public void setProblemaFamiliar(String problemaFamiliar) {
        this.problemaFamiliar = problemaFamiliar;
    }

    public String getPersonasConvivencia() {
        return personasConvivencia;
    }

    public void setPersonasConvivencia(String personasConvivencia) {
        this.personasConvivencia = personasConvivencia;
    }

    public Aspirante getAspirante() {
        return aspirante;
    }

    public void setAspirante(Aspirante aspirante) {
        this.aspirante = aspirante;
    }
}

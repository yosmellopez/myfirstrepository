package modelo;

import java.util.List;

public class Convivencia  {
	
    private Integer idConvivencia;

    private String nombreApellidos;

    private String parentesco;

    private Integer edad;

    private String centroTrabajoEscuela;

    private Boolean escuelaOCentro;

    private List<EntrevistaIndividual> entrevistasIndividuales;

    public Convivencia() {
    }

    public Convivencia(Integer idConvivencia) {
        this.idConvivencia = idConvivencia;
    }

    public Integer getIdConvivencia() {
        return idConvivencia;
    }

    public void setIdConvivencia(Integer idConvivencia) {
        this.idConvivencia = idConvivencia;
    }

    public String getParentesco() {
        return parentesco;
    }

    public void setParentesco(String parentesco) {
        this.parentesco = parentesco;
    }

    public Integer getEdad() {
        return edad;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public String getCentroTrabajoEscuela() {
        return centroTrabajoEscuela;
    }

    public void setCentroTrabajoEscuela(String centroTrabajoEscuela) {
        this.centroTrabajoEscuela = centroTrabajoEscuela;
    }

    public Boolean getEscuelaOCentro() {
        return escuelaOCentro;
    }

    public void setEscuelaOCentro(Boolean escuelaOCentro) {
        this.escuelaOCentro = escuelaOCentro;
    }

    public List<EntrevistaIndividual> getEntrevistasIndividuales() {
        return entrevistasIndividuales;
    }

    public void setEntrevistasIndividuales(List<EntrevistaIndividual> entrevistasIndividuales) {
        this.entrevistasIndividuales = entrevistasIndividuales;
    }

    public String getNombreApellidos() {
        return nombreApellidos;
    }

    public void setNombreApellidos(String nombreApellidos) {
        this.nombreApellidos = nombreApellidos;
    }
}

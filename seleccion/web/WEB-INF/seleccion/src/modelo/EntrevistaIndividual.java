package modelo;

import java.util.Date;
import java.util.List;

public class EntrevistaIndividual {

	private Integer idEntrevistaIndividual;

    private Date fechaEntrevista;

    private String numExpediente;

    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    private Float financiamiento;

    private String nombrePadre;

    private String nombreMadre;

    private String estatura;

    private String colorPiel;

    private String colorOjos;

    private String estadoCivil;

    private String numHijos;

    private String proficuo;

    private Boolean siSmg;

    private Date fechaSmg;

    private Boolean siInternacionalista;

    private String paisInternacionalista;

    private Boolean procedenciaFar;

    private Boolean procedenciaMinint;

    private String senasVisibles;

    private Integer telefono;

    private String nombreEntrevistador;

    private Aspirante aspirante;

    private List<EntrevistaIndividualCentroTrabajo> entrevistaIndividualCentroTrabajos;

    private List<Convivencia> convivencias;

    private List<IntegracionRevolucionaria> integracionesRevolucionarias;

    private List<Residencia> residencias;

    private NivelEscolar nivelEscolar;

    public EntrevistaIndividual() {
    }

    public EntrevistaIndividual(Integer idEntrevistaIndividual) {
        this.idEntrevistaIndividual = idEntrevistaIndividual;
    }

    public Integer getIdEntrevistaIndividual() {
        return idEntrevistaIndividual;
    }

    public void setIdEntrevistaIndividual(Integer idEntrevistaIndividual) {
        this.idEntrevistaIndividual = idEntrevistaIndividual;
    }

    public Date getFechaEntrevista() {
        return fechaEntrevista;
    }

    public void setFechaEntrevista(Date fechaEntrevista) {
        this.fechaEntrevista = fechaEntrevista;
    }

    public String getNumExpediente() {
        return numExpediente;
    }

    public void setNumExpediente(String numExpediente) {
        this.numExpediente = numExpediente;
    }

    public Float getFinanciamiento() {
        return financiamiento;
    }

    public void setFinanciamiento(Float financiamiento) {
        this.financiamiento = financiamiento;
    }

    public String getNombrePadre() {
        return nombrePadre;
    }

    public void setNombrePadre(String nombrePadre) {
        this.nombrePadre = nombrePadre;
    }

    public String getNombreMadre() {
        return nombreMadre;
    }

    public void setNombreMadre(String nombreMadre) {
        this.nombreMadre = nombreMadre;
    }

    public String getEstatura() {
        return estatura;
    }

    public void setEstatura(String estatura) {
        this.estatura = estatura;
    }

    public String getColorPiel() {
        return colorPiel;
    }

    public void setColorPiel(String colorPiel) {
        this.colorPiel = colorPiel;
    }

    public String getColorOjos() {
        return colorOjos;
    }

    public void setColorOjos(String colorOjos) {
        this.colorOjos = colorOjos;
    }

    public String getEstadoCivil() {
        return estadoCivil;
    }

    public void setEstadoCivil(String estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public String getNumHijos() {
        return numHijos;
    }

    public void setNumHijos(String numHijos) {
        this.numHijos = numHijos;
    }

    public String getProficuo() {
        return proficuo;
    }

    public void setProficuo(String proficuo) {
        this.proficuo = proficuo;
    }

    public Boolean getSiSmg() {
        return siSmg;
    }

    public void setSiSmg(Boolean siSmg) {
        this.siSmg = siSmg;
    }

    public Date getFechaSmg() {
        return fechaSmg;
    }

    public void setFechaSmg(Date fechaSmg) {
        this.fechaSmg = fechaSmg;
    }

    public Boolean getSiInternacionalista() {
        return siInternacionalista;
    }

    public void setSiInternacionalista(Boolean siInternacionalista) {
        this.siInternacionalista = siInternacionalista;
    }

    public String getPaisInternacionalista() {
        return paisInternacionalista;
    }

    public void setPaisInternacionalista(String paisInternacionalista) {
        this.paisInternacionalista = paisInternacionalista;
    }

    public Boolean getProcedenciaFar() {
        return procedenciaFar;
    }

    public void setProcedenciaFar(Boolean procedenciaFar) {
        this.procedenciaFar = procedenciaFar;
    }

    public Boolean getProcedenciaMinint() {
        return procedenciaMinint;
    }

    public void setProcedenciaMinint(Boolean procedenciaMinint) {
        this.procedenciaMinint = procedenciaMinint;
    }

    public String getSenasVisibles() {
        return senasVisibles;
    }

    public void setSenasVisibles(String senasVisibles) {
        this.senasVisibles = senasVisibles;
    }

    public Integer getTelefono() {
        return telefono;
    }

    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
    }

    public String getNombreEntrevistador() {
        return nombreEntrevistador;
    }

    public void setNombreEntrevistador(String nombreEntrevistador) {
        this.nombreEntrevistador = nombreEntrevistador;
    }

    public Aspirante getAspirante() {
        return aspirante;
    }

    public void setAspirante(Aspirante aspirante) {
        this.aspirante = aspirante;
    }

    public NivelEscolar getNivelEscolar() {
        return nivelEscolar;
    }

    public void setNivelEscolar(NivelEscolar nivelEscolar) {
        this.nivelEscolar = nivelEscolar;
    }

    public List<Convivencia> getConvivencias() {
        return convivencias;
    }

    public void setConvivencias(List<Convivencia> convivencias) {
        this.convivencias = convivencias;
    }

    public List<IntegracionRevolucionaria> getIntegracionesRevolucionarias() {
        return integracionesRevolucionarias;
    }

    public void setIntegracionesRevolucionarias(List<IntegracionRevolucionaria> integracionesRevolucionarias) {
        this.integracionesRevolucionarias = integracionesRevolucionarias;
    }

    public List<Residencia> getResidencias() {
        return residencias;
    }

    public void setResidencias(List<Residencia> residencias) {
        this.residencias = residencias;
    }

    public List<EntrevistaIndividualCentroTrabajo> getEntrevistaIndividualCentroTrabajos() {
        return entrevistaIndividualCentroTrabajos;
    }

    public void setEntrevistaIndividualCentroTrabajos(List<EntrevistaIndividualCentroTrabajo> entrevistaIndividualCentroTrabajos) {
        this.entrevistaIndividualCentroTrabajos = entrevistaIndividualCentroTrabajos;
    }

}

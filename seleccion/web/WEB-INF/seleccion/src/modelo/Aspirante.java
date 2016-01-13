package modelo;

import java.util.List;

public class Aspirante {

    private Integer idAspirante;

    private String nombre;

    private String apellidos;

    private String nombrePadre;

    private String nombreMadre;

    private Long ci;

    private Integer edad;

    private Boolean sexo;

    private String direccion;

    private DatosAspirante datosAspirante;

    private ResumenExpediente resumenExpediente;

    private List<Solicitud> solicitudes;

    private List<CronogramaCurso> cronogramasCursos;

    private List<ResumenSicometrico> resumenesSicometricos;

    public Aspirante() {
    }

    public Aspirante(Integer idAspirante) {
        this.idAspirante = idAspirante;
    }

    public Integer getIdAspirante() {
        return idAspirante;
    }

    public void setIdAspirante(Integer idAspirante) {
        this.idAspirante = idAspirante;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public Long getCi() {
        return ci;
    }

    public void setCi(Long ci) {
        this.ci = ci;
    }

    public Integer getEdad() {
        return edad;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public List<CronogramaCurso> getCronogramasCursos() {
        return cronogramasCursos;
    }

    public void setCronogramasCursos(List<CronogramaCurso> cronogramasCursos) {
        this.cronogramasCursos = cronogramasCursos;
    }

    public DatosAspirante getDatosAspirante() {
        return datosAspirante;
    }

    public List<ResumenSicometrico> getResumenesSicometricos() {
        return resumenesSicometricos;
    }

    public void setResumenesSicometricos(List<ResumenSicometrico> resumenesSicometricos) {
        this.resumenesSicometricos = resumenesSicometricos;
    }

    public void setDatosAspirante(DatosAspirante datosAspirante) {
        this.datosAspirante = datosAspirante;
    }

    public List<Solicitud> getSolicitudes() {
        return solicitudes;
    }

    public void setSolicitudes(List<Solicitud> solicitudes) {
        this.solicitudes = solicitudes;
    }

    public ResumenExpediente getResumenExpediente() {
        return resumenExpediente;
    }

    public void setResumenExpediente(ResumenExpediente resumenExpediente) {
        this.resumenExpediente = resumenExpediente;
    }

    public Boolean getSexo() {
        return sexo;
    }

    public void setSexo(Boolean sexo) {
        this.sexo = sexo;
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
    
    public String getNombreCompleto() {
        return nombre + " " + apellidos;
    }
}

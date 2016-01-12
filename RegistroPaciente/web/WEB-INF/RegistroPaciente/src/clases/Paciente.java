package clases;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class Paciente  {
    private Integer idPaciente;

    private String historiaClinica;

    private String ci;

    private String nombre;

    private String apellidos;

    private String direccionParticular;

    private Integer telefono;

    private String diagnostico;

    private Date fechaEntrada;

    private Date fechaProbableOperacion;

    private String patologiaTumoral;

    private String grupoFactor;

    private Boolean sexo;

    private Boolean fallecido;

    private Date fechaRegistroBaja;

    private String comentarioObservaciones;

    private List<Operacion> operaciones;

    private AreaSalud areaSalud;

    private Causa causaBaja;

    private Especialidad especialidad;

    private ListaEspera listaEspera;

    public Paciente() {
    }

    public Paciente(Integer idPaciente) {
        this.idPaciente = idPaciente;
    }

    public Integer getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(Integer idPaciente) {
        this.idPaciente = idPaciente;
    }

    public String getHistoriaClinica() {
        return historiaClinica;
    }

    public void setHistoriaClinica(String historiaClinica) {
        this.historiaClinica = historiaClinica;
    }

    public String getCi() {
        return ci;
    }

    public void setCi(String ci) {
        this.ci = ci;
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

    public String getDireccionParticular() {
        return direccionParticular;
    }

    public void setDireccionParticular(String direccionParticular) {
        this.direccionParticular = direccionParticular;
    }

    public Integer getTelefono() {
        return telefono;
    }

    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    public Date getFechaEntrada() {
        return fechaEntrada;
    }

    public void setFechaEntrada(Date fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
    }

    public Date getFechaProbableOperacion() {
        return fechaProbableOperacion;
    }

    public void setFechaProbableOperacion(Date fechaProbableOperacion) {
        this.fechaProbableOperacion = fechaProbableOperacion;
    }

    public String getPatologiaTumoral() {
        return patologiaTumoral;
    }

    public void setPatologiaTumoral(String patologiaTumoral) {
        this.patologiaTumoral = patologiaTumoral;
    }

    public String getGrupoFactor() {
        return grupoFactor;
    }

    public void setGrupoFactor(String grupoFactor) {
        this.grupoFactor = grupoFactor;
    }

    public Date getFechaRegistroBaja() {
        return fechaRegistroBaja;
    }

    public void setFechaRegistroBaja(Date fechaRegistroBaja) {
        this.fechaRegistroBaja = fechaRegistroBaja;
    }

    public String getComentarioObservaciones() {
        return comentarioObservaciones;
    }

    public void setComentarioObservaciones(String comentarioObservaciones) {
        this.comentarioObservaciones = comentarioObservaciones;
    }

    public List<Operacion> getOperaciones() {
        return operaciones;
    }

    public void setOperaciones(List<Operacion> operacionList) {
        this.operaciones = operacionList;
    }

    public AreaSalud getAreaSalud() {
        return areaSalud;
    }

    public void setAreaSalud(AreaSalud areaSalud) {
        this.areaSalud = areaSalud;
    }

    public Causa getCausaBaja() {
        return causaBaja;
    }

    public void setCausaBaja(Causa causaBaja) {
        this.causaBaja = causaBaja;
    }

    public Especialidad getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(Especialidad especialidad) {
        this.especialidad = especialidad;
    }

    public ListaEspera getListaEspera() {
        return listaEspera;
    }

    public void setListaEspera(ListaEspera listaEspera) {
        this.listaEspera = listaEspera;
    }

    public Boolean getSexo() {
        return sexo;
    }

    public void setSexo(Boolean sexo) {
        this.sexo = sexo;
    }

    public Boolean getFallecido() {
        return fallecido;
    }

    public void setFallecido(Boolean fallecido) {
        this.fallecido = fallecido;
    }
    
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

import java.util.Date;

public class ResumenExpediente {

    private Integer idResumenExpediente;

    private String ciudad;

    private Date fecha;

    private String nombreDirector;

    private String apodo;

    private Integer telefono;

    private String trayEstudiantil;

    private String trayRevolucionaria;

    private String trayLaboral;

    private String chequeoMedico;

    private String antecPenal;

    private String conclusiones;

    private String elaborador;

    private Date fechaElaborado;

    private Aspirante aspirante;

    public ResumenExpediente() {
    }

    public ResumenExpediente(Integer idResumenExpediente) {
        this.idResumenExpediente = idResumenExpediente;
    }

    public Integer getIdResumenExpediente() {
        return idResumenExpediente;
    }

    public void setIdResumenExpediente(Integer idResumenExpediente) {
        this.idResumenExpediente = idResumenExpediente;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getNombreDirector() {
        return nombreDirector;
    }

    public void setNombreDirector(String nombreDirector) {
        this.nombreDirector = nombreDirector;
    }

    public String getApodo() {
        return apodo;
    }

    public void setApodo(String apodo) {
        this.apodo = apodo;
    }

    public Integer getTelefono() {
        return telefono;
    }

    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
    }

    public String getTrayEstudiantil() {
        return trayEstudiantil;
    }

    public void setTrayEstudiantil(String trayEstudiantil) {
        this.trayEstudiantil = trayEstudiantil;
    }

    public String getTrayRevolucionaria() {
        return trayRevolucionaria;
    }

    public void setTrayRevolucionaria(String trayRevolucionaria) {
        this.trayRevolucionaria = trayRevolucionaria;
    }

    public String getTrayLaboral() {
        return trayLaboral;
    }

    public void setTrayLaboral(String trayLaboral) {
        this.trayLaboral = trayLaboral;
    }

    public String getChequeoMedico() {
        return chequeoMedico;
    }

    public void setChequeoMedico(String chequeoMedico) {
        this.chequeoMedico = chequeoMedico;
    }

    public String getAntecPenal() {
        return antecPenal;
    }

    public void setAntecPenal(String antecPenal) {
        this.antecPenal = antecPenal;
    }

    public String getConclusiones() {
        return conclusiones;
    }

    public void setConclusiones(String conclusiones) {
        this.conclusiones = conclusiones;
    }

    public String getElaborador() {
        return elaborador;
    }

    public void setElaborador(String elaborador) {
        this.elaborador = elaborador;
    }

    public Date getFechaElaborado() {
        return fechaElaborado;
    }

    public void setFechaElaborado(Date fechaElaborado) {
        this.fechaElaborado = fechaElaborado;
    }

    public Aspirante getAspirante() {
        return aspirante;
    }

    public void setAspirante(Aspirante aspirante) {
        this.idResumenExpediente = aspirante.getIdAspirante();
        this.aspirante = aspirante;
    }

}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clases;

import java.util.Date;

public class Operacion  {

    private Integer idOperacion;

    private Especialidad especialidad;

    private Grupo grupo;

    private Paciente paciente;

    private Date fechaOperacion;

    private Boolean pacienteFallecido;

    private Boolean cancerDetectado;

    private TipoOperacion tipoOperacion;

    public Operacion() {
    }

    public Operacion(Integer idOperacion) {
        this.idOperacion = idOperacion;
    }

    public Integer getIdOperacion() {
        return idOperacion;
    }

    public void setIdOperacion(Integer idOperacion) {
        this.idOperacion = idOperacion;
    }

    public Especialidad getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(Especialidad especialidad) {
        this.especialidad = especialidad;
    }

    public Grupo getGrupo() {
        return grupo;
    }

    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Date getFechaOperacion() {
        return fechaOperacion;
    }

    public void setFechaOperacion(Date fechaOperacion) {
        this.fechaOperacion = fechaOperacion;
    }

    public Boolean getPacienteFallecido() {
        return pacienteFallecido;
    }

    public void setPacienteFallecido(Boolean pacienteFallecido) {
        this.pacienteFallecido = pacienteFallecido;
    }

    public Boolean getCancerDetectado() {
        return cancerDetectado;
    }

    public void setCancerDetectado(Boolean cancerDetectado) {
        this.cancerDetectado = cancerDetectado;
    }

    public TipoOperacion getTipoOperacion() {
        return tipoOperacion;
    }

    public void setTipoOperacion(TipoOperacion tipoOperacion) {
        this.tipoOperacion = tipoOperacion;
    }

}

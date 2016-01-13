/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

import java.util.Date;
import java.util.List;

public class CronogramaCurso {

    private Integer idCronogramaCurso;

    private String nombrePadre;

    private String nombreMadre;

    private String escolaridad;

    private String lugar;

    private String capacidad;

    private TipoCurso tipoCurso;

    private Date fechaInicio;

    private Date fechaFin;

    private List<Aspirante> aspirantes;

    public CronogramaCurso() {
    }

    public CronogramaCurso(Integer idCronogramaCurso) {
        this.idCronogramaCurso = idCronogramaCurso;
    }

    public Integer getIdCronogramaCurso() {
        return idCronogramaCurso;
    }

    public void setIdCronogramaCurso(Integer idCronogramaCurso) {
        this.idCronogramaCurso = idCronogramaCurso;
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

    public String getEscolaridad() {
        return escolaridad;
    }

    public void setEscolaridad(String escolaridad) {
        this.escolaridad = escolaridad;
    }

    public List<Aspirante> getAspirantes() {
        return aspirantes;
    }

    public void setAspirantes(List<Aspirante> aspirantes) {
        this.aspirantes = aspirantes;
    }

    public String getLugar() {
        return lugar;
    }

    public void setLugar(String lugar) {
        this.lugar = lugar;
    }

    public String getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(String capacidad) {
        this.capacidad = capacidad;
    }

    public TipoCurso getTipoCurso() {
        return tipoCurso;
    }

    public void setTipoCurso(TipoCurso tipoCurso) {
        this.tipoCurso = tipoCurso;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Date fechaFin) {
        this.fechaFin = fechaFin;
    }
}

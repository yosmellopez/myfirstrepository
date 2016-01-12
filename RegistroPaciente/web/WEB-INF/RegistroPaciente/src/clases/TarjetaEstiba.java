/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clases;

import java.util.Date;

public class TarjetaEstiba {

    private Integer idTarjetaEstiba;

    private Integer cantidad;

    private Date fecha;

    private Boolean operacion;

    private Recurso recurso;

    private String agrupar;

    public TarjetaEstiba() {
    }

    public TarjetaEstiba(Integer cantidad, Date fecha, Boolean operacion, Recurso recurso) {
        this.cantidad = cantidad;
        this.fecha = fecha;
        this.operacion = operacion;
        this.recurso = recurso;
    }

    public TarjetaEstiba(Integer idTarjetaEstiba) {
        this.idTarjetaEstiba = idTarjetaEstiba;
    }

    public Integer getIdTarjetaEstiba() {
        return idTarjetaEstiba;
    }

    public void setIdTarjetaEstiba(Integer idTarjetaEstiba) {
        this.idTarjetaEstiba = idTarjetaEstiba;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Boolean getOperacion() {
        return operacion;
    }

    public void setOperacion(Boolean operacion) {
        this.operacion = operacion;
    }

    public Recurso getRecurso() {
        return recurso;
    }

    public void setRecurso(Recurso recurso) {
        this.recurso = recurso;
    }

    public void setAgrupar(String agrupar) {
        this.agrupar = recurso.getNombre();
    }

    public String getAgrupar() {
        agrupar = recurso.getNombre();
        return agrupar;
    }
}

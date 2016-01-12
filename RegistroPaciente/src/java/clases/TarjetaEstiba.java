/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clases;

import clasesUtiles.DeserializadorFecha;
import clasesUtiles.SerializadorFecha;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "tarjeta_estiba")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "TarjetaEstiba.findAll", query = "SELECT t FROM TarjetaEstiba t"),
    @NamedQuery(name = "TarjetaEstiba.findByOperacion", query = "SELECT t FROM TarjetaEstiba t WHERE t.operacion = :operacion")})
public class TarjetaEstiba implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_tarjeta_estiba", nullable = false)
    private Integer idTarjetaEstiba;

    @Column(name = "cantidad")
    private Integer cantidad;

    @Column(name = "fecha")
    @Temporal(TemporalType.DATE)
    @JsonDeserialize(using = DeserializadorFecha.class)
    @JsonSerialize(using = SerializadorFecha.class)
    private Date fecha;

    @Column(name = "operacion")
    private Boolean operacion;

    @JoinColumn(name = "recurso", referencedColumnName = "id_recurso")
    @ManyToOne
    private Recurso recurso;

    @Transient
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

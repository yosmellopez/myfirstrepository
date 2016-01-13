/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.deser.std.DateDeserializers;
import com.fasterxml.jackson.databind.ser.std.DateSerializer;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@Table(name = "cronograma_curso")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CronogramaCurso.findAll", query = "SELECT c FROM CronogramaCurso c"),
    @NamedQuery(name = "CronogramaCurso.findByIdCronogramaCurso", query = "SELECT c FROM CronogramaCurso c WHERE c.idCronogramaCurso = :idCronogramaCurso"),
    @NamedQuery(name = "CronogramaCurso.findByEscolaridad", query = "SELECT c FROM CronogramaCurso c WHERE c.escolaridad = :escolaridad")})
@JsonIgnoreProperties(ignoreUnknown = true)
public class CronogramaCurso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_cronograma_curso", nullable = false)
    private Integer idCronogramaCurso;

    @Column(name = "nombre_padre", length = 255)
    private String nombrePadre;

    @Column(name = "nombre_madre", length = 255)
    private String nombreMadre;

    @Column(name = "escolaridad", length = 255)
    private String escolaridad;

    @Column(name = "lugar", length = 255)
    private String lugar;

    @Column(name = "capacidad", length = 255)
    private String capacidad;

    @ManyToOne
    @JoinColumn(name = "tipo_curso", referencedColumnName = "id_tipo_curso", foreignKey = @ForeignKey(name = "fk_cronograma_tipo_curso"))
    private TipoCurso tipoCurso;

    @Column(name = "fecha_inicio")
    @Temporal(TemporalType.DATE)
    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateDeserializers.DateDeserializer.class)
    private Date fechaInicio;

    @Column(name = "fecha_fin")
    @Temporal(TemporalType.DATE)
    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateDeserializers.DateDeserializer.class)
    private Date fechaFin;

    @JoinTable(name = "cronograma_curso_aspirante", inverseJoinColumns = {
        @JoinColumn(name = "id_aspirante", referencedColumnName = "id_aspirante", nullable = false, foreignKey = @ForeignKey(name = "fk_aspirante"))}, joinColumns = {
        @JoinColumn(name = "id_cronograma_curso", referencedColumnName = "id_cronograma_curso", nullable = false, foreignKey = @ForeignKey(name = "fk_cronograma_curso"))})
    @ManyToMany(fetch = FetchType.EAGER)
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

    @XmlTransient
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

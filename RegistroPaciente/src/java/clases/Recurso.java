package clases;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import clasesUtiles.SerializadorListaTarjetaEstiba;

@Entity
@Table(name = "recurso", uniqueConstraints = {
    @UniqueConstraint(name = "nombre_unico", columnNames = "nombre")})
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Recurso.findAll", query = "SELECT r FROM Recurso r"),
    @NamedQuery(name = "Recurso.findByIdRecurso", query = "SELECT r FROM Recurso r WHERE r.idRecurso = :idRecurso"),
    @NamedQuery(name = "Recurso.findByNombre", query = "SELECT r FROM Recurso r WHERE r.nombre = :nombre")})
public class Recurso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_recurso", nullable = false)
    private Integer idRecurso;

    @Column(name = "nombre", length = 255)
    private String nombre;

    @Column(name = "cantidad_restante")
    private Integer cantidadRestante;
    
    @Column(name = "desechable")
    private Boolean desechable;

    @OneToMany(mappedBy = "recurso", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonSerialize(using = SerializadorListaTarjetaEstiba.class)
    private List<TarjetaEstiba> tarjetasEstibas;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "recurso")
    @JsonIgnore
    private List<TipoOperacionRecurso> tipoOperacionRecursoList;

    public Recurso() {
        tarjetasEstibas = new LinkedList<>();
    }

    public Recurso(Integer idRecurso, String nombre, Integer cantidadRestante) {
        this.idRecurso = idRecurso;
        this.nombre = nombre;
        this.cantidadRestante = cantidadRestante;
    }

    public Recurso(Integer idRecurso) {
        this.idRecurso = idRecurso;
    }

    public Integer getIdRecurso() {
        return idRecurso;
    }

    public void setIdRecurso(Integer idRecurso) {
        this.idRecurso = idRecurso;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @XmlTransient
    public List<TarjetaEstiba> getTarjetasEstibas() {
        return tarjetasEstibas;
    }

    public void setTarjetasEstibas(List<TarjetaEstiba> tarjetasEstibas) {
        this.tarjetasEstibas = tarjetasEstibas;
    }

    @XmlTransient
    public List<TipoOperacionRecurso> getTipoOperacionRecursoList() {
        return tipoOperacionRecursoList;
    }

    public void setTipoOperacionRecursoList(List<TipoOperacionRecurso> operacionRecursoList) {
        this.tipoOperacionRecursoList = operacionRecursoList;
    }

    public Integer getCantidadRestante() {
        return cantidadRestante;
    }

    public void setCantidadRestante(Integer cantidadRestante) {
        this.cantidadRestante = cantidadRestante;
    }

    public Boolean getDesechable() {
        return desechable;
    }

    public void setDesechable(Boolean desechable) {
        this.desechable = desechable;
    }
}

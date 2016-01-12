/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clases;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
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

@Entity
@Table(name = "lista_espera", uniqueConstraints = {
    @UniqueConstraint(name = "prioridad_unica", columnNames = "prioridad")})
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ListaEspera.findAll", query = "SELECT l FROM ListaEspera l"),
    @NamedQuery(name = "ListaEspera.findByNombreLista", query = "SELECT l FROM ListaEspera l WHERE l.nombreLista = :nombreLista")})
public class ListaEspera implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_lista_espera", nullable = false)
    private Integer idListaEspera;

    @Column(name = "nombre_lista", length = 255)
    private String nombreLista;

    @Column(name = "prioridad")
    private Integer prioridad;

    @OneToMany(mappedBy = "listaEspera")
    @JsonIgnore
    private List<Paciente> pacienteList;

    public ListaEspera() {
    }

    public ListaEspera(Integer idListaEspera) {
        this.idListaEspera = idListaEspera;
    }

    public Integer getIdListaEspera() {
        return idListaEspera;
    }

    public void setIdListaEspera(Integer idListaEspera) {
        this.idListaEspera = idListaEspera;
    }

    public String getNombreLista() {
        return nombreLista;
    }

    public void setNombreLista(String nombreLista) {
        this.nombreLista = nombreLista;
    }

    @XmlTransient
    public List<Paciente> getPacienteList() {
        return pacienteList;
    }

    public void setPacienteList(List<Paciente> pacienteList) {
        this.pacienteList = pacienteList;
    }

    public Integer getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(Integer prioridad) {
        this.prioridad = prioridad;
    }
}

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
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author María Isabel
 */
@Entity
@Table(name = "area_salud")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "AreaSalud.findAll", query = "SELECT a FROM AreaSalud a"),
    @NamedQuery(name = "AreaSalud.findByIdAreaSalud", query = "SELECT a FROM AreaSalud a WHERE a.idAreaSalud = :idAreaSalud"),
    @NamedQuery(name = "AreaSalud.findByNombre", query = "SELECT a FROM AreaSalud a WHERE a.nombre = :nombre"),
    @NamedQuery(name = "AreaSalud.findByDireccion", query = "SELECT a FROM AreaSalud a WHERE a.direccion = :direccion")})
public class AreaSalud implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_area_salud", nullable = false)
    private Integer idAreaSalud;

    @Column(name = "nombre", length = 255)
    private String nombre;

    @Column(name = "direccion", length = 255)
    private String direccion;

    @OneToMany(mappedBy = "areaSalud")
    @JsonIgnore
    private List<Paciente> pacienteList;

    public AreaSalud() {
    }

    public AreaSalud(Integer idAreaSalud) {
        this.idAreaSalud = idAreaSalud;
    }

    public Integer getIdAreaSalud() {
        return idAreaSalud;
    }

    public void setIdAreaSalud(Integer idAreaSalud) {
        this.idAreaSalud = idAreaSalud;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    @XmlTransient
    public List<Paciente> getPacienteList() {
        return pacienteList;
    }

    public void setPacienteList(List<Paciente> pacienteList) {
        this.pacienteList = pacienteList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idAreaSalud != null ? idAreaSalud.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof AreaSalud)) {
            return false;
        }
        AreaSalud other = (AreaSalud) object;
        if ((this.idAreaSalud == null && other.idAreaSalud != null) || (this.idAreaSalud != null && !this.idAreaSalud.equals(other.idAreaSalud))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "clases.AreaSalud[ idAreaSalud=" + idAreaSalud + " ]";
    }
    
}

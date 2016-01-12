package clases;

import java.io.Serializable;
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
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "especialista")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Especialista.findAll", query = "SELECT e FROM Especialista e"),
    @NamedQuery(name = "Especialista.findByApellidos", query = "SELECT e FROM Especialista e WHERE e.apellidos = :apellidos")})
public class Especialista implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_especialista", nullable = false)
    private Integer idEspecialista;

    @Column(name = "nombre", length = 255)
    private String nombre;

    @Column(name = "apellidos", length = 255)
    private String apellidos;

    @JoinColumn(name = "especialidad", referencedColumnName = "id_especialidad")
    @ManyToOne
    private Especialidad especialidad;

    @JoinColumn(name = "grupo", referencedColumnName = "id_grupo")
    @ManyToOne
    private Grupo grupo;
    
    @Column(name = "disponible")
    private Boolean disponible;

    public Especialista() {
    }

    public Especialista(Integer idEspecialista) {
        this.idEspecialista = idEspecialista;
    }

    public Integer getIdEspecialista() {
        return idEspecialista;
    }

    public void setIdEspecialista(Integer idEspecialista) {
        this.idEspecialista = idEspecialista;
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

    public Boolean getDisponible() {
        return disponible;
    }

    public void setDisponible(Boolean disponible) {
        this.disponible = disponible;
    }
    
}

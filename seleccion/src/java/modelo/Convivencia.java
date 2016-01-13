package modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@Table(name = "convivencia")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Convivencia.findAll", query = "SELECT c FROM Convivencia c"),
    @NamedQuery(name = "Convivencia.findByIdConvivencia", query = "SELECT c FROM Convivencia c WHERE c.idConvivencia = :idConvivencia")})
public class Convivencia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_convivencia", nullable = false)
    private Integer idConvivencia;

    @Column(name = "nombre_apellidos", length = 512)
    private String nombreApellidos;

    @Column(name = "parentesco", length = 255)
    private String parentesco;

    @Column(name = "edad")
    private Integer edad;

    @Column(name = "centro_trabajo_escuela", length = 255)
    private String centroTrabajoEscuela;

    @Column(name = "escuela_centro")
    private Boolean escuelaOCentro;

    @ManyToMany(mappedBy = "convivencias", cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<EntrevistaIndividual> entrevistasIndividuales;

    public Convivencia() {
    }

    public Convivencia(Integer idConvivencia) {
        this.idConvivencia = idConvivencia;
    }

    public Integer getIdConvivencia() {
        return idConvivencia;
    }

    public void setIdConvivencia(Integer idConvivencia) {
        this.idConvivencia = idConvivencia;
    }

    public String getParentesco() {
        return parentesco;
    }

    public void setParentesco(String parentesco) {
        this.parentesco = parentesco;
    }

    public Integer getEdad() {
        return edad;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public String getCentroTrabajoEscuela() {
        return centroTrabajoEscuela;
    }

    public void setCentroTrabajoEscuela(String centroTrabajoEscuela) {
        this.centroTrabajoEscuela = centroTrabajoEscuela;
    }

    public Boolean getEscuelaOCentro() {
        return escuelaOCentro;
    }

    public void setEscuelaOCentro(Boolean escuelaOCentro) {
        this.escuelaOCentro = escuelaOCentro;
    }

    @XmlTransient
    public List<EntrevistaIndividual> getEntrevistasIndividuales() {
        return entrevistasIndividuales;
    }

    public void setEntrevistasIndividuales(List<EntrevistaIndividual> entrevistasIndividuales) {
        this.entrevistasIndividuales = entrevistasIndividuales;
    }

    public String getNombreApellidos() {
        return nombreApellidos;
    }

    public void setNombreApellidos(String nombreApellidos) {
        this.nombreApellidos = nombreApellidos;
    }
}

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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "centro_trabajo")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CentroTrabajo.findAll", query = "SELECT c FROM CentroTrabajo c"),
    @NamedQuery(name = "CentroTrabajo.findByNombre", query = "SELECT c FROM CentroTrabajo c WHERE c.nombre = :nombre")})
public class CentroTrabajo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_centro_trabajo", nullable = false)
    private Integer idCentroTrabajo;

    @Column(name = "nombre", length = 255)
    private String nombre;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "centroTrabajo")
    private List<EntrevistaIndividualCentroTrabajo> entrevistaIndividualCentroTrabajoList;

    public CentroTrabajo() {
    }

    public List<EntrevistaIndividualCentroTrabajo> getEntrevistaIndividualCentroTrabajoList() {
        return entrevistaIndividualCentroTrabajoList;
    }

    public void setEntrevistaIndividualCentroTrabajoList(List<EntrevistaIndividualCentroTrabajo> entrevistaIndividualCentroTrabajoList) {
        this.entrevistaIndividualCentroTrabajoList = entrevistaIndividualCentroTrabajoList;
    }

    public CentroTrabajo(Integer idCentroTrabajo) {
        this.idCentroTrabajo = idCentroTrabajo;
    }

    public Integer getIdCentroTrabajo() {
        return idCentroTrabajo;
    }

    public void setIdCentroTrabajo(Integer idCentroTrabajo) {
        this.idCentroTrabajo = idCentroTrabajo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}

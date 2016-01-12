package entidades;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

@Entity
@Table(name = "enfermedad_transmision_sexual")
@NamedQueries({
    @NamedQuery(name = "EnfermedadTransmisionSexual.findAll", query = "SELECT e FROM EnfermedadTransmisionSexual e"),
    @NamedQuery(name = "EnfermedadTransmisionSexual.findByIdEnfermedadTransmisionSexual", query = "SELECT e FROM EnfermedadTransmisionSexual e WHERE e.idEnfermedadTransmisionSexual = :idEnfermedadTransmisionSexual"),
    @NamedQuery(name = "EnfermedadTransmisionSexual.findByEnfermedad", query = "SELECT e FROM EnfermedadTransmisionSexual e WHERE e.enfermedad = :enfermedad")})
@JsonIgnoreProperties(value = {"objeto"})
public class EnfermedadTransmisionSexual implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_enfermedad_transmision_sexual", nullable = false)
    private Integer idEnfermedadTransmisionSexual;

    @Column(name = "enfermedad", length = 255)
    private String enfermedad;

    @ManyToMany(mappedBy = "enfermedadesTransmisionSexual", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<TarjetaPrueba> tarjetaPruebas;

    public EnfermedadTransmisionSexual() {
    }

    public EnfermedadTransmisionSexual(Integer idEnfermedadTransmisionSexual) {
        this.idEnfermedadTransmisionSexual = idEnfermedadTransmisionSexual;
    }

    public Integer getIdEnfermedadTransmisionSexual() {
        return idEnfermedadTransmisionSexual;
    }

    public void setIdEnfermedadTransmisionSexual(Integer idEnfermedadTransmisionSexual) {
        this.idEnfermedadTransmisionSexual = idEnfermedadTransmisionSexual;
    }

    public String getEnfermedad() {
        return enfermedad;
    }

    public void setEnfermedad(String enfermedad) {
        this.enfermedad = enfermedad;
    }

    public List<TarjetaPrueba> getTarjetaPruebas() {
        return tarjetaPruebas;
    }

    public void setTarjetaPruebas(List<TarjetaPrueba> tarjetaPruebas) {
        this.tarjetaPruebas = tarjetaPruebas;
    }

}

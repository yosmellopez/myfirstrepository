package entidades;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "consultorio")
@NamedQueries({
    @NamedQuery(name = "Consultorio.findAll", query = "SELECT c FROM Consultorio c"),
    @NamedQuery(name = "Consultorio.findByIdConsultorio", query = "SELECT c FROM Consultorio c WHERE c.idConsultorio = :idConsultorio"),
    @NamedQuery(name = "Consultorio.findByNombre", query = "SELECT c FROM Consultorio c WHERE c.nombre = :nombre")})
public class Consultorio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_consultorio", nullable = false)
    private Integer idConsultorio;

    @Column(name = "nombre", length = 255)
    private String nombre;

    @JoinColumn(name = "id_area_salud", referencedColumnName = "id_area_salud")
    @ManyToOne
    private AreaSalud areaSalud;

    @OneToMany(mappedBy = "consultorio", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Paciente> pacientes;

    public Consultorio() {
    }

    public Consultorio(Integer idConsultorio) {
        this.idConsultorio = idConsultorio;
    }

    public Integer getIdConsultorio() {
        return idConsultorio;
    }

    public void setIdConsultorio(Integer idConsultorio) {
        this.idConsultorio = idConsultorio;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public AreaSalud getAreaSalud() {
        return areaSalud;
    }

    public void setAreaSalud(AreaSalud areaSalud) {
        this.areaSalud = areaSalud;
    }

    public List<Paciente> getPacientes() {
        return pacientes;
    }

    public void setPacientes(List<Paciente> pacientes) {
        this.pacientes = pacientes;
    }
}

package entidades;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "tratamiento")
public class Tratamiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tratamiento")
    private Integer idTratamiento;

    @Column(name = "tratamiento")
    private String tratamiento;

    @ManyToMany
    @JoinTable(name = "paciente_tratamiento", joinColumns = {
        @JoinColumn(name = "id_tratamiento", referencedColumnName = "id_tratamiento", foreignKey = @ForeignKey(name = "fk_id_tratamiento"))}, inverseJoinColumns = {
        @JoinColumn(name = "id_paciente", referencedColumnName = "id_paciente", foreignKey = @ForeignKey(name = "fk_id_paciente"))})
    private List<Paciente> pacientes;

    public Integer getIdTratamiento() {
        return idTratamiento;
    }

    public void setIdTratamiento(Integer idTratamiento) {
        this.idTratamiento = idTratamiento;
    }

    public String getTratamiento() {
        return tratamiento;
    }

    public void setTratamiento(String tratamiento) {
        this.tratamiento = tratamiento;
    }

    public List<Paciente> getPacientes() {
        return pacientes;
    }

    public void setPacientes(List<Paciente> pacientes) {
        this.pacientes = pacientes;
    }
}

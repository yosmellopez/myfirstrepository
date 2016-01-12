package entidades;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "cama", uniqueConstraints = {
    @UniqueConstraint(name = "cama_sala_unico",columnNames = {"numero_cama", "id_sala"})})
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Cama.findAll", query = "SELECT c FROM Cama c"),
    @NamedQuery(name = "Cama.cantidad", query = "SELECT COUNT(c) FROM Cama c"),
    @NamedQuery(name = "Cama.cantidadSala", query = "SELECT COUNT(c) FROM Cama c WHERE c.sala=:sala"),
    @NamedQuery(name = "Cama.findByIdCama", query = "SELECT c FROM Cama c WHERE c.idCama = :idCama"),
    @NamedQuery(name = "Cama.findByHabilitada", query = "SELECT c FROM Cama c WHERE c.habilitada = :habilitada")})
public class Cama implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_cama")
    private Integer idCama;

    @Column(name = "numero_cama")
    private Integer numeroCama;

    @Column(name = "habilitada")
    private Boolean habilitada;

    @JoinColumn(name = "id_sala", referencedColumnName = "id_sala", foreignKey = @ForeignKey(name = "fk_cama_sala"))
    @ManyToOne
    private Sala sala;    
    
    @OneToMany(mappedBy = "cama")
    @JsonIgnore
    private List<Ingreso> ingresos;

    public Cama() {
    }

    public Cama(Integer idCama) {
        this.idCama = idCama;
    }

    public Integer getIdCama() {
        return idCama;
    }

    public void setIdCama(Integer idCama) {
        this.idCama = idCama;
    }

    public Integer getNumeroCama() {
        return numeroCama;
    }

    public void setNumeroCama(Integer numeroCama) {
        this.numeroCama = numeroCama;
    }

    public Boolean getHabilitada() {
        return habilitada;
    }

    public void setHabilitada(Boolean habilitada) {
        this.habilitada = habilitada;
    }

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }

    public List<Ingreso> getIngresos() {
        return ingresos;
    }

    public void setIngresos(List<Ingreso> ingresos) {
        this.ingresos = ingresos;
    }
}

package entidades;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "area_salud")
@NamedQueries({
    @NamedQuery(name = "AreaSalud.findAll", query = "SELECT a FROM AreaSalud a"),
    @NamedQuery(name = "AreaSalud.findByNombre", query = "SELECT a FROM AreaSalud a WHERE a.nombre = :nombre")})
public class AreaSalud implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_area_salud", nullable = false)
    private Integer idAreaSalud;

    @Column(name = "nombre", length = 255)
    private String nombre;

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

}

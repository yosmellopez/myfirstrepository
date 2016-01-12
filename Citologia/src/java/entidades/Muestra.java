package entidades;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "muestra")
public class Muestra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_muestra")
    private Integer idMuestra;

    @Column(name = "cantidad_celulas")
    private int cantidadCelulas;

    public Integer getIdMuestra() {
        return idMuestra;
    }

    public void setIdMuestra(Integer idMuestra) {
        this.idMuestra = idMuestra;
    }

    public int getCantidadCelulas() {
        return cantidadCelulas;
    }

    public void setCantidadCelulas(int cantidadCelulas) {
        this.cantidadCelulas = cantidadCelulas;
    }

}

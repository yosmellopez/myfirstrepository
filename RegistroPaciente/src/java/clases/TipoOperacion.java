package clases;

import clasesUtiles.SerializadorTipoOperacion;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "tipo_operacion")
public class TipoOperacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_operacion")
    @Basic(optional = false)
    private Integer idTipoOperacion;

    @Column(name = "tipo", length = 255)
    private String tipo;

    @OneToMany(mappedBy = "tipoOperacion", fetch = FetchType.EAGER)
    @JsonSerialize(using = SerializadorTipoOperacion.class)
    private List<TipoOperacionRecurso> tipoOperacionRecursos;

    public TipoOperacion() {
    }

    public TipoOperacion(Integer idTipoOperacion) {
        this.idTipoOperacion = idTipoOperacion;
    }

    public TipoOperacion(Integer idTipoOperacion, String tipo) {
        this.idTipoOperacion = idTipoOperacion;
        this.tipo = tipo;
    }

    public Integer getIdTipoOperacion() {
        return idTipoOperacion;
    }

    public void setIdTipoOperacion(Integer idTipoOperacion) {
        this.idTipoOperacion = idTipoOperacion;
    }

    public List<TipoOperacionRecurso> getTipoOperacionRecursos() {
        return tipoOperacionRecursos;
    }

    public void setTipoOperacionRecursos(List<TipoOperacionRecurso> tipoOperacionRecursos) {
        this.tipoOperacionRecursos = tipoOperacionRecursos;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}

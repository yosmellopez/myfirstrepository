package clases;

import clasesUtiles.DeserializadorOperacionRecurso;
import clasesUtiles.SerializadorOperacionRecurso;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "tipo_operacion_recurso")
public class TipoOperacionRecurso implements Serializable {

    private static final long serialVersionUID = 1L;

    @EmbeddedId
    @JsonDeserialize(using = DeserializadorOperacionRecurso.class)
    @JsonSerialize(using = SerializadorOperacionRecurso.class)
    protected TipoOperacionRecursoPK tipoOperacionRecursoPK;

    @Column(name = "cantidad")
    private Integer cantidad;
    
    @JoinColumn(name = "id_tipo_operacion", referencedColumnName = "id_tipo_operacion", nullable = false, insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_id_tipo_operacion"))
    @ManyToOne(optional = false)
    private TipoOperacion tipoOperacion;

    @JoinColumn(name = "id_recurso", referencedColumnName = "id_recurso", nullable = false, insertable = false, updatable = false,
            foreignKey = @ForeignKey(name = "fk_id_recurso"))
    @ManyToOne(optional = false)
    private Recurso recurso;

    public TipoOperacionRecurso() {
    }

    public TipoOperacionRecurso(TipoOperacionRecursoPK tipoOperacionRecursoPK) {
        this.tipoOperacionRecursoPK = tipoOperacionRecursoPK;
    }

    public TipoOperacionRecurso(int idTipoOperacion, int idRecurso) {
        this.tipoOperacionRecursoPK = new TipoOperacionRecursoPK(idTipoOperacion, idRecurso);
    }

    public TipoOperacionRecurso(TipoOperacionRecursoPK tipoOperacionRecursoPK, Integer cantidad, TipoOperacion tipoOperacion, Recurso recurso) {
        this.tipoOperacionRecursoPK = tipoOperacionRecursoPK;
        this.cantidad = cantidad;
        this.tipoOperacion = tipoOperacion;
        this.recurso = recurso;
    }

    public TipoOperacionRecursoPK getOperacionRecursoPK() {
        return tipoOperacionRecursoPK;
    }

    public void setOperacionRecursoPK(TipoOperacionRecursoPK operacionRecursoPK) {
        this.tipoOperacionRecursoPK = operacionRecursoPK;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public TipoOperacion getTipoOperacion() {
        return tipoOperacion;
    }

    public void setTipoOperacion(TipoOperacion tipoOperacion) {
        this.tipoOperacion = tipoOperacion;
    }

    public Recurso getRecurso() {
        return recurso;
    }

    public void setRecurso(Recurso recurso) {
        this.recurso = recurso;
    }

    public void crearClavePrimaria() {
        tipoOperacionRecursoPK = new TipoOperacionRecursoPK(tipoOperacion.getIdTipoOperacion(), recurso.getIdRecurso());
    }
}

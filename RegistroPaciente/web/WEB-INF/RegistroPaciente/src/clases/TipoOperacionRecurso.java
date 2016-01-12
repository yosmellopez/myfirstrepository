package clases;

public class TipoOperacionRecurso {

    protected TipoOperacionRecursoPK tipoOperacionRecursoPK;

    private Integer cantidad;

    private TipoOperacion tipoOperacion;

    private Recurso recurso;

    public TipoOperacionRecurso() {
    }

    public TipoOperacionRecurso(TipoOperacionRecursoPK tipoOperacionRecursoPK) {
        this.tipoOperacionRecursoPK = tipoOperacionRecursoPK;
    }

    public TipoOperacionRecurso(int idTipoOperacion, int idRecurso) {
        this.tipoOperacionRecursoPK = new TipoOperacionRecursoPK(idTipoOperacion, idRecurso);
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

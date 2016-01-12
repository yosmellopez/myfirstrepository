package clases;

import java.util.List;

public class TipoOperacion {

    private Integer idTipoOperacion;

    private String tipo;

    private List<TipoOperacionRecurso> tipoOperacionRecursos;

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

package clases;

import java.util.Date;

public class Traza {

    private Integer idTraza;

    private String accion;

    private Date fecha;

    private String url;

    private Usuario usuario;

    public Traza() {
    }

    public Traza(String url, Date fecha, String accion, Usuario usuario) {
        this.accion = accion;
        this.fecha = fecha;
        this.url = url;
        this.usuario = usuario;
    }

    public Traza(Integer idTraza) {
        this.idTraza = idTraza;
    }

    public Integer getIdTraza() {
        return idTraza;
    }

    public void setIdTraza(Integer idTraza) {
        this.idTraza = idTraza;
    }

    public String getAccion() {
        return accion;
    }

    public void setAccion(String accion) {
        this.accion = accion;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

}

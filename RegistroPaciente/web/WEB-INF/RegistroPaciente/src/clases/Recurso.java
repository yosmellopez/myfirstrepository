package clases;

import java.util.LinkedList;
import java.util.List;

public class Recurso {

    private Integer idRecurso;

    private String nombre;

    private Integer cantidadRestante;
    
    private Boolean desechable;

    private List<TarjetaEstiba> tarjetasEstibas;

    private List<TipoOperacionRecurso> tipoOperacionRecursoList;

    public Recurso() {
        tarjetasEstibas = new LinkedList<>();
    }

    public Recurso(Integer idRecurso, String nombre, Integer cantidadRestante) {
        this.idRecurso = idRecurso;
        this.nombre = nombre;
        this.cantidadRestante = cantidadRestante;
    }

    public Recurso(Integer idRecurso) {
        this.idRecurso = idRecurso;
    }

    public Integer getIdRecurso() {
        return idRecurso;
    }

    public void setIdRecurso(Integer idRecurso) {
        this.idRecurso = idRecurso;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<TarjetaEstiba> getTarjetasEstibas() {
        return tarjetasEstibas;
    }

    public void setTarjetasEstibas(List<TarjetaEstiba> tarjetasEstibas) {
        this.tarjetasEstibas = tarjetasEstibas;
    }

    public List<TipoOperacionRecurso> getTipoOperacionRecursoList() {
        return tipoOperacionRecursoList;
    }

    public void setTipoOperacionRecursoList(List<TipoOperacionRecurso> operacionRecursoList) {
        this.tipoOperacionRecursoList = operacionRecursoList;
    }

    public Integer getCantidadRestante() {
        return cantidadRestante;
    }

    public void setCantidadRestante(Integer cantidadRestante) {
        this.cantidadRestante = cantidadRestante;
    }

    public Boolean getDesechable() {
        return desechable;
    }

    public void setDesechable(Boolean desechable) {
        this.desechable = desechable;
    }
}

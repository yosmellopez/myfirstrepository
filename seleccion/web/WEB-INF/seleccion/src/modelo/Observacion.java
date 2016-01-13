package modelo;

import java.util.Date;
import java.util.List;

public class Observacion {

    private Integer idObservacion;

    private Date fechaPresentacion;

    private Date fechaBaja;

    private String motivoBaja;

    private List<ControlAspirante> controlAspirantes;

    public Observacion() {
    }

    public Observacion(Integer idObservacion) {
        this.idObservacion = idObservacion;
    }

    public Integer getIdObservacion() {
        return idObservacion;
    }

    public void setIdObservacion(Integer idObservacion) {
        this.idObservacion = idObservacion;
    }

    public Date getFechaPresentacion() {
        return fechaPresentacion;
    }

    public void setFechaPresentacion(Date fechaPresentacion) {
        this.fechaPresentacion = fechaPresentacion;
    }

    public Date getFechaBaja() {
        return fechaBaja;
    }

    public void setFechaBaja(Date fechaBaja) {
        this.fechaBaja = fechaBaja;
    }

    public String getMotivoBaja() {
        return motivoBaja;
    }

    public void setMotivoBaja(String motivoBaja) {
        this.motivoBaja = motivoBaja;
    }

    public List<ControlAspirante> getControlAspirantes() {
        return controlAspirantes;
    }

    public void setControlAspirantes(List<ControlAspirante> controlAspirantes) {
        this.controlAspirantes = controlAspirantes;
    }
}

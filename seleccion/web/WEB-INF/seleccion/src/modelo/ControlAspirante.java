package modelo;

import java.util.Date;

public class ControlAspirante {

    private Integer idControlAspirante;

    private Boolean expProceso;

    private Boolean aprobadoMinint;

    private Boolean aprobado;

    private Boolean cursando;

    private Integer numeroExpediente;

    private Date fechaBaja;

    private Date fechaInicio;

    private Date fechaExamenSicometrico;

    private Observacion observacion;
    
    private Aspirante aspirante;

    public ControlAspirante() {
    }

    public ControlAspirante(Integer idControlAspirante) {
        this.idControlAspirante = idControlAspirante;
    }

    public Integer getIdControlAspirante() {
        return idControlAspirante;
    }

    public void setIdControlAspirante(Integer idControlAspirante) {
        this.idControlAspirante = idControlAspirante;
    }

    public Boolean getExpProceso() {
        return expProceso;
    }

    public void setExpProceso(Boolean expProceso) {
        this.expProceso = expProceso;
    }

    public Boolean getAprobadoMinint() {
        return aprobadoMinint;
    }

    public void setAprobadoMinint(Boolean aprobadoMinint) {
        this.aprobadoMinint = aprobadoMinint;
    }

    public Observacion getObservacion() {
        return observacion;
    }

    public void setObservacion(Observacion observacion) {
        this.observacion = observacion;
    }

    public Boolean getAprobado() {
        return aprobado;
    }

    public void setAprobado(Boolean aprobado) {
        this.aprobado = aprobado;
    }

    public Boolean getCursando() {
        return cursando;
    }

    public void setCursando(Boolean cursando) {
        this.cursando = cursando;
    }

    public Integer getNumeroExpediente() {
        return numeroExpediente;
    }

    public void setNumeroExpediente(Integer numeroExpediente) {
        this.numeroExpediente = numeroExpediente;
    }

    public Date getFechaBaja() {
        return fechaBaja;
    }

    public void setFechaBaja(Date fechaBaja) {
        this.fechaBaja = fechaBaja;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaExamenSicometrico() {
        return fechaExamenSicometrico;
    }

    public void setFechaExamenSicometrico(Date fechaExamenSicometrico) {
        this.fechaExamenSicometrico = fechaExamenSicometrico;
    }

	public Aspirante getAspirante() {
		return aspirante;
	}

	public void setAspirante(Aspirante aspirante) {
		this.aspirante = aspirante;
	}

}

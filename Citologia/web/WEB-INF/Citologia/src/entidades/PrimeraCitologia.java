package entidades;

import java.util.Date;
import java.util.List;

public class PrimeraCitologia {

	private Integer idPrimeraCitologia;

	private Date fechaTomaMuestra;

	private Date fechaResultadoFinal;

	private List<DiagnosticoFinal> diagnosticosFinales;

	private List<ResponsableMuestra> responsablesMuestras;

	public PrimeraCitologia() {
	}

	public PrimeraCitologia(Integer idPrimeraCitologia) {
		this.idPrimeraCitologia = idPrimeraCitologia;
	}

	public Integer getIdPrimeraCitologia() {
		return idPrimeraCitologia;
	}

	public void setIdPrimeraCitologia(Integer idPrimeraCitologia) {
		this.idPrimeraCitologia = idPrimeraCitologia;
	}

	public Date getFechaTomaMuestra() {
		return fechaTomaMuestra;
	}

	public void setFechaTomaMuestra(Date fechaTomaMuestra) {
		this.fechaTomaMuestra = fechaTomaMuestra;
	}

	public Date getFechaResultadoFinal() {
		return fechaResultadoFinal;
	}

	public void setFechaResultadoFinal(Date fechaResultadoFinal) {
		this.fechaResultadoFinal = fechaResultadoFinal;
	}

	public List<DiagnosticoFinal> getDiagnosticosFinales() {
		return diagnosticosFinales;
	}

	public void setDiagnosticosFinales(
			List<DiagnosticoFinal> diagnosticosFinales) {
		this.diagnosticosFinales = diagnosticosFinales;
	}

	public List<ResponsableMuestra> getResponsablesMuestras() {
		return responsablesMuestras;
	}

	public void setResponsablesMuestras(
			List<ResponsableMuestra> responsablesMuestras) {
		this.responsablesMuestras = responsablesMuestras;
	}

}

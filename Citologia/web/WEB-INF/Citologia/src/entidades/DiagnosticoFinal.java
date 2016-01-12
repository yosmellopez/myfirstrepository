package entidades;

import java.util.List;

public class DiagnosticoFinal {

	private Integer idDiagnosticoFinal;

	private String diagnosticoFinal;

	private List<PrimeraCitologia> primerasCitologias;

	public DiagnosticoFinal() {
	}

	public DiagnosticoFinal(Integer idDiagnosticoFinal) {
		this.idDiagnosticoFinal = idDiagnosticoFinal;
	}

	public Integer getIdDiagnosticoFinal() {
		return idDiagnosticoFinal;
	}

	public void setIdDiagnosticoFinal(Integer idDiagnosticoFinal) {
		this.idDiagnosticoFinal = idDiagnosticoFinal;
	}

	public String getDiagnosticoFinal() {
		return diagnosticoFinal;
	}

	public void setDiagnosticoFinal(String diagnosticoFinal) {
		this.diagnosticoFinal = diagnosticoFinal;
	}

	public List<PrimeraCitologia> getPrimerasCitologias() {
		return primerasCitologias;
	}

	public void setPrimerasCitologias(List<PrimeraCitologia> primerasCitologias) {
		this.primerasCitologias = primerasCitologias;
	}
}

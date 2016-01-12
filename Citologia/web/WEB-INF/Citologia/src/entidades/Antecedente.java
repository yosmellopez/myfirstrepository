package entidades;

import java.util.Date;

public class Antecedente {

	private Integer idAntecedente;

	private Integer edadPrimeraRelacionSexual;

	private Integer edadPrimerEmbarazo;

	private Integer numeroPartos;

	private Integer yearMenopausia;

	private String otros;

	private Date ultimaMestruacion;

	private Metrorragia metrorragia;

	TipoAnticonceptivo tipoAnticonceptivo;

	public Antecedente() {
	}

	public Antecedente(Integer idAntecedente) {
		this.idAntecedente = idAntecedente;
	}

	public Integer getIdAntecedente() {
		return idAntecedente;
	}

	public void setIdAntecedente(Integer idAntecedente) {
		this.idAntecedente = idAntecedente;
	}

	public Integer getEdadPrimeraRelacionSexual() {
		return edadPrimeraRelacionSexual;
	}

	public void setEdadPrimeraRelacionSexual(Integer edadPrimeraRelacionSexual) {
		this.edadPrimeraRelacionSexual = edadPrimeraRelacionSexual;
	}

	public Integer getEdadPrimerEmbarazo() {
		return edadPrimerEmbarazo;
	}

	public void setEdadPrimerEmbarazo(Integer edadPrimerEmbarazo) {
		this.edadPrimerEmbarazo = edadPrimerEmbarazo;
	}

	public Integer getNumeroPartos() {
		return numeroPartos;
	}

	public void setNumeroPartos(Integer numeroPartos) {
		this.numeroPartos = numeroPartos;
	}

	public Integer getYearMenopausia() {
		return yearMenopausia;
	}

	public void setYearMenopausia(Integer yearMenopausia) {
		this.yearMenopausia = yearMenopausia;
	}

	public Date getUltimaMestruacion() {
		return ultimaMestruacion;
	}

	public void setUltimaMestruacion(Date ultimaMestruacion) {
		this.ultimaMestruacion = ultimaMestruacion;
	}

	public Metrorragia getMetrorragia() {
		return metrorragia;
	}

	public void setMetrorragia(Metrorragia metrorragia) {
		this.metrorragia = metrorragia;
	}

	public TipoAnticonceptivo getTipoAnticonceptivo() {
		return tipoAnticonceptivo;
	}

	public void setTipoAnticonceptivo(TipoAnticonceptivo tipoAnticonceptivo) {
		this.tipoAnticonceptivo = tipoAnticonceptivo;
	}

	public String getOtros() {
		return otros;
	}

	public void setOtros(String otros) {
		this.otros = otros;
	}

}

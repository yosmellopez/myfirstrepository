package entidades;

import java.util.List;

public class TipoAnticonceptivo {
	private Integer idTipoAnticonceptivo;

	private String nombreAnticonceptivo;

	private Boolean oral;

	private List<Antecedente> antecedentes;

	public TipoAnticonceptivo() {
	}

	public TipoAnticonceptivo(Integer idTipoAnticonceptivo) {
		this.idTipoAnticonceptivo = idTipoAnticonceptivo;
	}

	public Integer getIdTipoAnticonceptivo() {
		return idTipoAnticonceptivo;
	}

	public void setIdTipoAnticonceptivo(Integer idTipoAnticonceptivo) {
		this.idTipoAnticonceptivo = idTipoAnticonceptivo;
	}

	public String getNombreAnticonceptivo() {
		return nombreAnticonceptivo;
	}

	public void setNombreAnticonceptivo(String nombreAnticonceptivo) {
		this.nombreAnticonceptivo = nombreAnticonceptivo;
	}

	public Boolean getOral() {
		return oral;
	}

	public void setOral(Boolean oral) {
		this.oral = oral;
	}

	public List<Antecedente> getAntecedentes() {
		return antecedentes;
	}

	public void setAntecedentes(List<Antecedente> antecedentes) {
		this.antecedentes = antecedentes;
	}

}

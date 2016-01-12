package entidades;

import java.util.List;

public class Metrorragia {

	private Integer idMetrorragia;

	private String metrorragia;

	private List<Antecedente> antecedentes;

	public Metrorragia() {
	}

	public Metrorragia(Integer idMetrorragia) {
		this.idMetrorragia = idMetrorragia;
	}

	public Integer getIdMetrorragia() {
		return idMetrorragia;
	}

	public void setIdMetrorragia(Integer idMetrorragia) {
		this.idMetrorragia = idMetrorragia;
	}

	public String getMetrorragia() {
		return metrorragia;
	}

	public void setMetrorragia(String metrorragia) {
		this.metrorragia = metrorragia;
	}

	public List<Antecedente> getAntecedentes() {
		return antecedentes;
	}

	public void setAntecedentes(List<Antecedente> antecedentes) {
		this.antecedentes = antecedentes;
	}

}

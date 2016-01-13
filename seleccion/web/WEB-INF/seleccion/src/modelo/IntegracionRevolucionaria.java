package modelo;

import java.util.List;

public class IntegracionRevolucionaria {

	private Integer idIntegracionRevolucionaria;

	private String integracionRevolucionaria;

	private String siglas;

	private List<EntrevistaIndividual> entrevistasIndividuales;

	public IntegracionRevolucionaria() {
	}

	public IntegracionRevolucionaria(Integer idIntegracionRevolucioanaria) {
		this.idIntegracionRevolucionaria = idIntegracionRevolucioanaria;
	}

	public Integer getIdIntegracionRevolucionaria() {
		return idIntegracionRevolucionaria;
	}

	public void setIdIntegracionRevolucionaria(
			Integer idIntegracionRevolucionaria) {
		this.idIntegracionRevolucionaria = idIntegracionRevolucionaria;
	}

	public String getIntegracionRevolucionaria() {
		return integracionRevolucionaria;
	}

	public void setIntegracionRevolucionaria(String integracionRevolucionaria) {
		this.integracionRevolucionaria = integracionRevolucionaria;
	}

	public List<EntrevistaIndividual> getEntrevistasIndividuales() {
		return entrevistasIndividuales;
	}

	public void setEntrevistasIndividuales(
			List<EntrevistaIndividual> entrevistasIndividuales) {
		this.entrevistasIndividuales = entrevistasIndividuales;
	}

	public String getSiglas() {
		return siglas;
	}

	public void setSiglas(String siglas) {
		this.siglas = siglas;
	}

}

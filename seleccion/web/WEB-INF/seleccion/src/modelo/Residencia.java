package modelo;

import java.util.Date;
import java.util.List;

public class Residencia {

	private Integer idResidencia;

	private Date desde;

	private Date hasta;

	private String direccion;

	private List<EntrevistaIndividual> entrevistaIndividualList;

	public Residencia() {
	}

	public Residencia(Integer idResidencia) {
		this.idResidencia = idResidencia;
	}

	public Integer getIdResidencia() {
		return idResidencia;
	}

	public void setIdResidencia(Integer idResidencia) {
		this.idResidencia = idResidencia;
	}

	public Date getDesde() {
		return desde;
	}

	public void setDesde(Date desde) {
		this.desde = desde;
	}

	public Date getHasta() {
		return hasta;
	}

	public void setHasta(Date hasta) {
		this.hasta = hasta;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public List<EntrevistaIndividual> getEntrevistaIndividualList() {
		return entrevistaIndividualList;
	}

	public void setEntrevistaIndividualList(
			List<EntrevistaIndividual> entrevistaIndividualList) {
		this.entrevistaIndividualList = entrevistaIndividualList;
	}
}

package entidades;

import java.util.List;

public class EnfermedadTransmisionSexual {

	private Integer idEnfermedadTransmisionSexual;

	private String enfermedad;

	private List<TarjetaPrueba> tarjetaPruebas;

	public EnfermedadTransmisionSexual() {
	}

	public EnfermedadTransmisionSexual(Integer idEnfermedadTransmisionSexual) {
		this.idEnfermedadTransmisionSexual = idEnfermedadTransmisionSexual;
	}

	public Integer getIdEnfermedadTransmisionSexual() {
		return idEnfermedadTransmisionSexual;
	}

	public void setIdEnfermedadTransmisionSexual(
			Integer idEnfermedadTransmisionSexual) {
		this.idEnfermedadTransmisionSexual = idEnfermedadTransmisionSexual;
	}

	public String getEnfermedad() {
		return enfermedad;
	}

	public void setEnfermedad(String enfermedad) {
		this.enfermedad = enfermedad;
	}

	public List<TarjetaPrueba> getTarjetaPruebas() {
		return tarjetaPruebas;
	}

	public void setTarjetaPruebas(List<TarjetaPrueba> tarjetaPruebas) {
		this.tarjetaPruebas = tarjetaPruebas;
	}

}

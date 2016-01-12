package entidades;

public class TarjetaPrueba {
	private Integer idTarjeta;

	private Paciente paciente;

	private Antecedente antecedente;

	private PrimeraCitologia primeraCitologia;

	private TipoCaso tipoCaso;

	private DiagnosticoFinal diagnosticoFinal;

	private String nombre;

	public Integer getIdTarjeta() {
		return idTarjeta;
	}

	public void setIdTarjeta(Integer idTarjeta) {
		this.idTarjeta = idTarjeta;
	}

	public Paciente getPaciente() {
		return paciente;
	}

	public void setPaciente(Paciente paciente) {
		this.paciente = paciente;
	}

	public Antecedente getAntecedente() {
		return antecedente;
	}

	public void setAntecedente(Antecedente antecedente) {
		this.antecedente = antecedente;
	}

	public PrimeraCitologia getPrimeraCitologia() {
		return primeraCitologia;
	}

	public void setPrimeraCitologia(PrimeraCitologia primeraCitologia) {
		this.primeraCitologia = primeraCitologia;
	}

	public TipoCaso getTipoCaso() {
		return tipoCaso;
	}

	public void setTipoCaso(TipoCaso tipoCaso) {
		this.tipoCaso = tipoCaso;
	}

	public DiagnosticoFinal getDiagnosticoFinal() {
		return diagnosticoFinal;
	}

	public void setDiagnosticoFinal(DiagnosticoFinal diagnosticoFinal) {
		this.diagnosticoFinal = diagnosticoFinal;
	}

	public String getNombre() {
		nombre = paciente.getNombreCompleto();
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = paciente.getNombreCompleto();
	}

}

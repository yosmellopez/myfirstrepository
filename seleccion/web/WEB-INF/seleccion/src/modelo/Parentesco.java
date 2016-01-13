package modelo;

public class Parentesco {

	private Integer idParentesco;

    private String nombreApellidos;

    private NivelEscolar nivelEscolar;

    public Parentesco() {
    }

    public Parentesco(Integer idParentesco) {
        this.idParentesco = idParentesco;
    }

    public Integer getIdParentesco() {
        return idParentesco;
    }

    public void setIdParentesco(Integer idParentesco) {
        this.idParentesco = idParentesco;
    }

    public String getNombreApellidos() {
        return nombreApellidos;
    }

    public void setNombreApellidos(String nombreApellidos) {
        this.nombreApellidos = nombreApellidos;
    }

    public NivelEscolar getNivelEscolar() {
        return nivelEscolar;
    }

    public void setNivelEscolar(NivelEscolar nivelEscolar) {
        this.nivelEscolar = nivelEscolar;
    }

}

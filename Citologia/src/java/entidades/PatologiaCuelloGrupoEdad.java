package entidades;

public class PatologiaCuelloGrupoEdad {

    private int id;

    private String rangoEdad;

    private int negativo;

    private int inflamatorio;

    private int nicI;

    private int nicII;

    private int nicIII;

    private int carsinoma;

    public PatologiaCuelloGrupoEdad(int id, String rangoEdad, int negativo, int inflamatoria, int nicI, int nicII, int nicIII, int carsinoma) {
        this.id = id;
        this.rangoEdad = rangoEdad;
        this.negativo = negativo;
        this.inflamatorio = inflamatoria;
        this.nicI = nicI;
        this.nicII = nicII;
        this.nicIII = nicIII;
        this.carsinoma = carsinoma;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRangoEdad() {
        return rangoEdad;
    }

    public void setRangoEdad(String rangoEdad) {
        this.rangoEdad = rangoEdad;
    }

    public int getNegativo() {
        return negativo;
    }

    public void setNegativo(int negativo) {
        this.negativo = negativo;
    }

    public int getInflamatorio() {
        return inflamatorio;
    }

    public void setInflamatorio(int inflamatorio) {
        this.inflamatorio = inflamatorio;
    }

    public int getNicI() {
        return nicI;
    }

    public void setNicI(int nicI) {
        this.nicI = nicI;
    }

    public int getNicII() {
        return nicII;
    }

    public void setNicII(int nicII) {
        this.nicII = nicII;
    }

    public int getNicIII() {
        return nicIII;
    }

    public void setNicIII(int nicIII) {
        this.nicIII = nicIII;
    }

    public int getCarsinoma() {
        return carsinoma;
    }

    public void setCarsinoma(int carsinoma) {
        this.carsinoma = carsinoma;
    }

}

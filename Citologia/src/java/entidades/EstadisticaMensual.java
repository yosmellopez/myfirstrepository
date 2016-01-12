package entidades;

public class EstadisticaMensual {

    private int idEstadistica;

    private String area;

    private int negativo;

    private int noUtil;

    private int infectadas;

    private int total;

    public EstadisticaMensual(int idEstadistica, String area, int negativo, int noUtil, int infectadas) {
        this.idEstadistica = idEstadistica;
        this.area = area;
        this.negativo = negativo;
        this.noUtil = noUtil;
        this.infectadas = infectadas;
        total = negativo + noUtil + infectadas;
    }

    public int getIdEstadistica() {
        return idEstadistica;
    }

    public void setIdEstadistica(int idEstadistica) {
        this.idEstadistica = idEstadistica;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public int getNegativo() {
        return negativo;
    }

    public void setNegativo(int negativo) {
        this.negativo = negativo;
    }

    public int getNoUtil() {
        return noUtil;
    }

    public void setNoUtil(int noUtil) {
        this.noUtil = noUtil;
    }

    public int getInfectadas() {
        return infectadas;
    }

    public void setInfectadas(int infectadas) {
        this.infectadas = infectadas;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }
}

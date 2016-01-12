package entidades;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import utiles.DeserializadorFecha;
import utiles.SerializadorFecha;

@Entity
@Table(name = "antecedente")
@NamedQueries({
    @NamedQuery(name = "Antecedente.findAll", query = "SELECT a FROM Antecedente a"),
    @NamedQuery(name = "Antecedente.findByIdAntecedente", query = "SELECT a FROM Antecedente a WHERE a.idAntecedente = :idAntecedente"),
    @NamedQuery(name = "Antecedente.findByEdadPrimeraRelacionSexual", query = "SELECT a FROM Antecedente a WHERE a.edadPrimeraRelacionSexual = :edadPrimeraRelacionSexual"),
    @NamedQuery(name = "Antecedente.findByEdadPrimerEmbarazo", query = "SELECT a FROM Antecedente a WHERE a.edadPrimerEmbarazo = :edadPrimerEmbarazo"),
    @NamedQuery(name = "Antecedente.findByNumeroPartos", query = "SELECT a FROM Antecedente a WHERE a.numeroPartos = :numeroPartos"),
    @NamedQuery(name = "Antecedente.findByUltimaMestruacion", query = "SELECT a FROM Antecedente a WHERE a.ultimaMestruacion = :ultimaMestruacion")})
public class Antecedente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_antecedente", nullable = false)
    private Integer idAntecedente;

    @Column(name = "edad_primera_relacion_sexual")
    private Integer edadPrimeraRelacionSexual;

    @Column(name = "edad_primer_embarazo")
    private Integer edadPrimerEmbarazo;

    @Column(name = "numero_partos")
    private Integer numeroPartos;

    @Column(name = "year_menopausia")
    private Integer yearMenopausia;

    @Column(name = "otros")
    private String otros;

    @Column(name = "ultima_mestruacion")
    @Temporal(TemporalType.DATE)
    @JsonDeserialize(using = DeserializadorFecha.class)
    @JsonSerialize(using = SerializadorFecha.class)
    private Date ultimaMestruacion;

    @JoinColumn(name = "id_metrorragia", referencedColumnName = "id_metrorragia")
    @ManyToOne
    private Metrorragia metrorragia;

    @ManyToOne
    @JoinColumn(name = "id_tipo_anticonceptivo", referencedColumnName = "id_tipo_anticonceptivo",
            foreignKey = @ForeignKey(name = "fk_id_tipo_anticonceptivo"))
    private TipoAnticonceptivo tipoAnticonceptivo;

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

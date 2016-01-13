package modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import utiles.SerializadorAspirante;

@Entity
@Table(name = "datos_aspirante")
public class DatosAspirante implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id_datos_aspirante", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    private Integer idDatosAspirante;

    @Column(name = "antecedente_patologico", length = 21474)
    private String antecedentePatologico;

    @Column(name = "antecedente_penal", length = 21474)
    private String antecedentePenal;

    @Column(name = "antecedente_familiar", length = 21474)
    private String antecedenteFamiliar;

    @Column(name = "num_hijos")
    private Short numHijos;

    @Column(name = "problema_familiar", length = 21474)
    private String problemaFamiliar;

    @Column(name = "personas_convivencia", length = 255)
    private String personasConvivencia;

    @OneToOne(optional = false)
    @JoinColumn(name = "aspirante", referencedColumnName = "id_aspirante", foreignKey = @ForeignKey(name = "fk_aspirante_datos_aspirante"))
    @JsonSerialize(using = SerializadorAspirante.class)
    private Aspirante aspirante;

    public DatosAspirante() {
    }

    public DatosAspirante(Integer idAspirante) {
        this.idDatosAspirante = idAspirante;
    }

    public Integer getIdDatosAspirante() {
        return idDatosAspirante;
    }

    public void setIdDatosAspirante(Integer idDatosAspirante) {
        this.idDatosAspirante = idDatosAspirante;
    }

    public String getAntecedentePatologico() {
        return antecedentePatologico;
    }

    public void setAntecedentePatologico(String antecedentePatologico) {
        this.antecedentePatologico = antecedentePatologico;
    }

    public String getAntecedentePenal() {
        return antecedentePenal;
    }

    public void setAntecedentePenal(String antecedentePenal) {
        this.antecedentePenal = antecedentePenal;
    }

    public String getAntecedenteFamiliar() {
        return antecedenteFamiliar;
    }

    public void setAntecedenteFamiliar(String antecedenteFamiliar) {
        this.antecedenteFamiliar = antecedenteFamiliar;
    }

    public Short getNumHijos() {
        return numHijos;
    }

    public void setNumHijos(Short numHijos) {
        this.numHijos = numHijos;
    }

    public String getProblemaFamiliar() {
        return problemaFamiliar;
    }

    public void setProblemaFamiliar(String problemaFamiliar) {
        this.problemaFamiliar = problemaFamiliar;
    }

    public String getPersonasConvivencia() {
        return personasConvivencia;
    }

    public void setPersonasConvivencia(String personasConvivencia) {
        this.personasConvivencia = personasConvivencia;
    }

    public Aspirante getAspirante() {
        return aspirante;
    }

    public void setAspirante(Aspirante aspirante) {
        this.aspirante = aspirante;
    }
}

package modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@Table(name = "integracion_revolucionaria")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "IntegracionRevolucionaria.findAll", query = "SELECT i FROM IntegracionRevolucionaria i"),
    @NamedQuery(name = "IntegracionRevolucionaria.findByIntegracionRevolucionaria", query = "SELECT i FROM IntegracionRevolucionaria i WHERE i.integracionRevolucionaria = :integracionRevolucionaria")})
@JsonIgnoreProperties(value = {"objeto"})
public class IntegracionRevolucionaria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_integracion_revolucionaria", nullable = false)
    private Integer idIntegracionRevolucionaria;

    @Column(name = "integracion_revolucionaria", length = 255)
    private String integracionRevolucionaria;

    @Column(name = "siglas", length = 20)
    private String siglas;

    @ManyToMany(mappedBy = "integracionesRevolucionarias")
    @JsonIgnore
    private List<EntrevistaIndividual> entrevistasIndividuales;

    public IntegracionRevolucionaria() {
    }

    public IntegracionRevolucionaria(Integer idIntegracionRevolucioanaria) {
        this.idIntegracionRevolucionaria = idIntegracionRevolucioanaria;
    }

    public Integer getIdIntegracionRevolucionaria() {
        return idIntegracionRevolucionaria;
    }

    public void setIdIntegracionRevolucionaria(Integer idIntegracionRevolucionaria) {
        this.idIntegracionRevolucionaria = idIntegracionRevolucionaria;
    }

    public String getIntegracionRevolucionaria() {
        return integracionRevolucionaria;
    }

    public void setIntegracionRevolucionaria(String integracionRevolucionaria) {
        this.integracionRevolucionaria = integracionRevolucionaria;
    }

    @XmlTransient
    public List<EntrevistaIndividual> getEntrevistasIndividuales() {
        return entrevistasIndividuales;
    }

    public void setEntrevistasIndividuales(List<EntrevistaIndividual> entrevistasIndividuales) {
        this.entrevistasIndividuales = entrevistasIndividuales;
    }

    public String getSiglas() {
        return siglas;
    }

    public void setSiglas(String siglas) {
        this.siglas = siglas;
    }

}

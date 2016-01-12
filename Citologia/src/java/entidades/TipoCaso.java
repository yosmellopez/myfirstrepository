package entidades;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "tipo_caso")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "TipoCaso.findAll", query = "SELECT t FROM TipoCaso t"),
    @NamedQuery(name = "TipoCaso.findByIdTipoCaso", query = "SELECT t FROM TipoCaso t WHERE t.idTipoCaso = :idTipoCaso"),
    @NamedQuery(name = "TipoCaso.findByTipoCaso", query = "SELECT t FROM TipoCaso t WHERE t.tipoCaso = :tipoCaso")})
@JsonIgnoreProperties(value = {"objeto"})
public class TipoCaso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_tipo_caso", nullable = false)
    private Integer idTipoCaso;

    @Column(name = "tipo_caso", length = 255)
    private String tipoCaso;

    public TipoCaso() {
    }

    public TipoCaso(Integer idTipoCaso) {
        this.idTipoCaso = idTipoCaso;
    }

    public Integer getIdTipoCaso() {
        return idTipoCaso;
    }

    public void setIdTipoCaso(Integer idTipoCaso) {
        this.idTipoCaso = idTipoCaso;
    }

    public String getTipoCaso() {
        return tipoCaso;
    }

    public void setTipoCaso(String tipoCaso) {
        this.tipoCaso = tipoCaso;
    }

}

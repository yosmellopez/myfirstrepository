package clases;

import clasesUtiles.SerializadorFechaTraza;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
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
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "traza")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Traza.findAll", query = "SELECT t FROM Traza t"),
    @NamedQuery(name = "Traza.findByIdTraza", query = "SELECT t FROM Traza t WHERE t.idTraza = :idTraza"),
    @NamedQuery(name = "Traza.findByFecha", query = "SELECT t FROM Traza t WHERE t.fecha = :fecha"),
    @NamedQuery(name = "Traza.findByUrl", query = "SELECT t FROM Traza t WHERE t.url = :url")})
public class Traza implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_traza", nullable = false)
    private Integer idTraza;

    @Column(name = "accion", length = 255)
    private String accion;

    @Column(name = "fecha")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonSerialize(using = SerializadorFechaTraza.class)
    private Date fecha;

    @Column(name = "url", length = 255)
    private String url;

    @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario")
    @ManyToOne
    private Usuario usuario;

    public Traza() {
    }

    public Traza(String url, Date fecha, String accion, Usuario usuario) {
        this.accion = accion;
        this.fecha = fecha;
        this.url = url;
        this.usuario = usuario;
    }

    public Traza(Integer idTraza) {
        this.idTraza = idTraza;
    }

    public Integer getIdTraza() {
        return idTraza;
    }

    public void setIdTraza(Integer idTraza) {
        this.idTraza = idTraza;
    }

    public String getAccion() {
        return accion;
    }

    public void setAccion(String accion) {
        this.accion = accion;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

}

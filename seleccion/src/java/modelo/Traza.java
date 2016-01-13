package modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
import utiles.SerializadorFechaTraza;

@Entity
@Table(name = "traza")
@NamedQueries({
    @NamedQuery(name = "Traza.findAll", query = "SELECT t FROM Traza t ORDER BY t.idTraza")})
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler", "objeto"})
public class Traza implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_traza", nullable = false)
    private Integer idTraza;

    @Column(name = "url", length = 300)
    private String url;

    @Column(name = "tiempo")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonSerialize(using = SerializadorFechaTraza.class)
    private Date tiempo;

    @Column(name = "accion", length = 500)
    private String accion;

    @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario", foreignKey = @ForeignKey(name = "fk_id_usuario"))
    @ManyToOne
    private Usuario usuario;

    public Traza() {
    }

    public Traza(String url, Date tiempo, String accion, Usuario usuario) {
        this.url = url;
        this.tiempo = tiempo;
        this.accion = accion;
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Date getTiempo() {
        return tiempo;
    }

    public void setTiempo(Date tiempo) {
        this.tiempo = tiempo;
    }

    public String getAccion() {
        return accion;
    }

    public void setAccion(String accion) {
        this.accion = accion;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}

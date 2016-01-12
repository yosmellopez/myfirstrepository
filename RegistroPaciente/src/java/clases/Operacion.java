/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clases;

import clasesUtiles.DeserializadorFecha;
import clasesUtiles.SerializadorFecha;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@Table(name = "operacion")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Operacion.findAll", query = "SELECT o FROM Operacion o"),
    @NamedQuery(name = "Operacion.findByIdOperacion", query = "SELECT o FROM Operacion o WHERE o.idOperacion = :idOperacion")})
public class Operacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_operacion", nullable = false)
    private Integer idOperacion;

    @JoinColumn(name = "especialidad", referencedColumnName = "id_especialidad")
    @ManyToOne
    private Especialidad especialidad;

    @JoinColumn(name = "grupo", referencedColumnName = "id_grupo")
    @ManyToOne
    private Grupo grupo;

    @JoinColumn(name = "paciente", referencedColumnName = "id_paciente")
    @ManyToOne
    private Paciente paciente;

    @Column(name = "fecha_operacion")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonDeserialize(using = DeserializadorFecha.class)
    @JsonSerialize(using = SerializadorFecha.class)
    private Date fechaOperacion;

    @Column(name = "paciente_fallecido")
    private Boolean pacienteFallecido;

    @Column(name = "cancer_detectado")
    private Boolean cancerDetectado;

    @JoinColumn(name = "tipo_operacion", referencedColumnName = "id_tipo_operacion")
    @OneToOne
    private TipoOperacion tipoOperacion;

    public Operacion() {
    }

    public Operacion(Integer idOperacion) {
        this.idOperacion = idOperacion;
    }

    public Integer getIdOperacion() {
        return idOperacion;
    }

    public void setIdOperacion(Integer idOperacion) {
        this.idOperacion = idOperacion;
    }

    public Especialidad getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(Especialidad especialidad) {
        this.especialidad = especialidad;
    }

    public Grupo getGrupo() {
        return grupo;
    }

    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Date getFechaOperacion() {
        return fechaOperacion;
    }

    public void setFechaOperacion(Date fechaOperacion) {
        this.fechaOperacion = fechaOperacion;
    }

    public Boolean getPacienteFallecido() {
        return pacienteFallecido;
    }

    public void setPacienteFallecido(Boolean pacienteFallecido) {
        this.pacienteFallecido = pacienteFallecido;
    }

    public Boolean getCancerDetectado() {
        return cancerDetectado;
    }

    public void setCancerDetectado(Boolean cancerDetectado) {
        this.cancerDetectado = cancerDetectado;
    }

    public TipoOperacion getTipoOperacion() {
        return tipoOperacion;
    }

    public void setTipoOperacion(TipoOperacion tipoOperacion) {
        this.tipoOperacion = tipoOperacion;
    }

}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import utiles.DeserializadorFecha;
import utiles.SerializadorFecha;

@Entity
@Table(name = "resumen_expediente")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ResumenExpediente.findAll", query = "SELECT r FROM ResumenExpediente r"),
    @NamedQuery(name = "ResumenExpediente.findByFechaElaborado", query = "SELECT r FROM ResumenExpediente r WHERE r.fechaElaborado = :fechaElaborado")})
public class ResumenExpediente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Basic(optional = false)
    @Column(name = "id_resumen_expediente")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idResumenExpediente;

    @Column(name = "ciudad", length = 255)
    private String ciudad;

    @Column(name = "fecha")
    @Temporal(TemporalType.DATE)
    @JsonDeserialize(using = DeserializadorFecha.class)
    @JsonSerialize(using = SerializadorFecha.class)
    private Date fecha;

    @Column(name = "nombre_director", length = 255)
    private String nombreDirector;

    @Column(name = "apodo", length = 255)
    private String apodo;

    @Column(name = "telefono")
    private Integer telefono;

    @Column(name = "tray_estudiantil", length = 21474)
    private String trayEstudiantil;

    @Column(name = "tray_revolucionaria", length = 21474)
    private String trayRevolucionaria;

    @Column(name = "tray_laboral", length = 21474)
    private String trayLaboral;

    @Column(name = "chequeo_medico", length = 21474)
    private String chequeoMedico;

    @Column(name = "antec_penal", length = 21474)
    private String antecPenal;

    @Column(name = "conclusiones", length = 21474)
    private String conclusiones;

    @Column(name = "elaborador", length = 255)
    private String elaborador;

    @Column(name = "fecha_elaborado")
    @Temporal(TemporalType.DATE)
    @JsonDeserialize(using = DeserializadorFecha.class)
    @JsonSerialize(using = SerializadorFecha.class)
    private Date fechaElaborado;

    @JoinColumn(name = "aspirante", referencedColumnName = "id_aspirante")
    @OneToOne(optional = true, cascade = {CascadeType.MERGE})
    private Aspirante aspirante;

    public ResumenExpediente() {
    }

    public ResumenExpediente(Integer idResumenExpediente) {
        this.idResumenExpediente = idResumenExpediente;
    }

    public Integer getIdResumenExpediente() {
        return idResumenExpediente;
    }

    public void setIdResumenExpediente(Integer idResumenExpediente) {
        this.idResumenExpediente = idResumenExpediente;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getNombreDirector() {
        return nombreDirector;
    }

    public void setNombreDirector(String nombreDirector) {
        this.nombreDirector = nombreDirector;
    }

    public String getApodo() {
        return apodo;
    }

    public void setApodo(String apodo) {
        this.apodo = apodo;
    }

    public Integer getTelefono() {
        return telefono;
    }

    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
    }

    public String getTrayEstudiantil() {
        return trayEstudiantil;
    }

    public void setTrayEstudiantil(String trayEstudiantil) {
        this.trayEstudiantil = trayEstudiantil;
    }

    public String getTrayRevolucionaria() {
        return trayRevolucionaria;
    }

    public void setTrayRevolucionaria(String trayRevolucionaria) {
        this.trayRevolucionaria = trayRevolucionaria;
    }

    public String getTrayLaboral() {
        return trayLaboral;
    }

    public void setTrayLaboral(String trayLaboral) {
        this.trayLaboral = trayLaboral;
    }

    public String getChequeoMedico() {
        return chequeoMedico;
    }

    public void setChequeoMedico(String chequeoMedico) {
        this.chequeoMedico = chequeoMedico;
    }

    public String getAntecPenal() {
        return antecPenal;
    }

    public void setAntecPenal(String antecPenal) {
        this.antecPenal = antecPenal;
    }

    public String getConclusiones() {
        return conclusiones;
    }

    public void setConclusiones(String conclusiones) {
        this.conclusiones = conclusiones;
    }

    public String getElaborador() {
        return elaborador;
    }

    public void setElaborador(String elaborador) {
        this.elaborador = elaborador;
    }

    public Date getFechaElaborado() {
        return fechaElaborado;
    }

    public void setFechaElaborado(Date fechaElaborado) {
        this.fechaElaborado = fechaElaborado;
    }

    public Aspirante getAspirante() {
        return aspirante;
    }

    public void setAspirante(Aspirante aspirante) {
        this.idResumenExpediente = aspirante.getIdAspirante();
        this.aspirante = aspirante;
    }

}

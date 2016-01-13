package modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import utiles.SerializadorListaResumenSicometrico;
import utiles.SerializadorResumenExpediente;

@Entity
@Table(name = "aspirante")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Aspirante.findAll", query = "SELECT a FROM Aspirante a"),
    @NamedQuery(name = "Aspirante.findByIdAspirante", query = "SELECT a FROM Aspirante a WHERE a.idAspirante = :idAspirante")})
@JsonIgnoreProperties(ignoreUnknown = true)
public class Aspirante implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_aspirante", nullable = false)
    private Integer idAspirante;

    @Column(name = "nombre", length = 150)
    private String nombre;

    @Column(name = "apellidos", length = 200)
    private String apellidos;

    @Column(name = "nombre_padre", length = 200)
    private String nombrePadre;

    @Column(name = "nombre_madre", length = 200)
    private String nombreMadre;

    @Column(name = "ci")
    private Long ci;

    @Column(name = "edad")
    private Integer edad;

    @Column(name = "sexo")
    private Boolean sexo;

    @Column(name = "direccion", length = 2147483647)
    private String direccion;

    @OneToOne(mappedBy = "aspirante", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private DatosAspirante datosAspirante;

    @OneToOne(mappedBy = "aspirante", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonSerialize(using = SerializadorResumenExpediente.class)
    private ResumenExpediente resumenExpediente;

    @OneToMany(mappedBy = "aspirante")
    @JsonIgnore
    private List<Solicitud> solicitudes;

    @JsonIgnore
    @ManyToMany(mappedBy = "aspirantes")
    private List<CronogramaCurso> cronogramasCursos;

    @OneToMany(mappedBy = "aspirante", fetch = FetchType.EAGER)
    @JsonSerialize(using = SerializadorListaResumenSicometrico.class)
    private List<ResumenSicometrico> resumenesSicometricos;

    public Aspirante() {
    }

    public Aspirante(Integer idAspirante) {
        this.idAspirante = idAspirante;
    }

    public Integer getIdAspirante() {
        return idAspirante;
    }

    public void setIdAspirante(Integer idAspirante) {
        this.idAspirante = idAspirante;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public Long getCi() {
        return ci;
    }

    public void setCi(Long ci) {
        this.ci = ci;
    }

    public Integer getEdad() {
        return edad;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    @XmlTransient
    public List<CronogramaCurso> getCronogramasCursos() {
        return cronogramasCursos;
    }

    public void setCronogramasCursos(List<CronogramaCurso> cronogramasCursos) {
        this.cronogramasCursos = cronogramasCursos;
    }

    @XmlTransient
    public DatosAspirante getDatosAspirante() {
        return datosAspirante;
    }

    public List<ResumenSicometrico> getResumenesSicometricos() {
        return resumenesSicometricos;
    }

    public void setResumenesSicometricos(List<ResumenSicometrico> resumenesSicometricos) {
        this.resumenesSicometricos = resumenesSicometricos;
    }

    public void setDatosAspirante(DatosAspirante datosAspirante) {
        this.datosAspirante = datosAspirante;
    }

    @XmlTransient
    public List<Solicitud> getSolicitudes() {
        return solicitudes;
    }

    public void setSolicitudes(List<Solicitud> solicitudes) {
        this.solicitudes = solicitudes;
    }

    public ResumenExpediente getResumenExpediente() {
        return resumenExpediente;
    }

    public void setResumenExpediente(ResumenExpediente resumenExpediente) {
        this.resumenExpediente = resumenExpediente;
    }

    public Boolean getSexo() {
        return sexo;
    }

    public void setSexo(Boolean sexo) {
        this.sexo = sexo;
    }

    public String getNombrePadre() {
        return nombrePadre;
    }

    public void setNombrePadre(String nombrePadre) {
        this.nombrePadre = nombrePadre;
    }

    public String getNombreMadre() {
        return nombreMadre;
    }

    public void setNombreMadre(String nombreMadre) {
        this.nombreMadre = nombreMadre;
    }

    public String getNombreCompleto() {
        return nombre + " " + apellidos;
    }
}

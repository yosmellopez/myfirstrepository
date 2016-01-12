package clases;

import clasesUtiles.DeserializadorFecha;
import clasesUtiles.SerializadorFecha;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author María Isabel
 */
@Entity
@Table(name = "paciente")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Paciente.findAll", query = "SELECT p FROM Paciente p"),
    @NamedQuery(name = "Paciente.findByIdPaciente", query = "SELECT p FROM Paciente p WHERE p.idPaciente = :idPaciente"),
    @NamedQuery(name = "Paciente.findByComentarioObservaciones", query = "SELECT p FROM Paciente p WHERE p.comentarioObservaciones = :comentarioObservaciones")})
public class Paciente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_paciente", nullable = false)
    private Integer idPaciente;

    @Column(name = "historia_clinica", length = 255)
    private String historiaClinica;

    @Column(name = "ci", length = 11)
    private String ci;

    @Column(name = "nombre", length = 255)
    private String nombre;

    @Column(name = "apellidos", length = 255)
    private String apellidos;

    @Column(name = "direccion_particular", length = 500)
    private String direccionParticular;

    @Column(name = "telefono")
    private Integer telefono;

    @Column(name = "diagnostico", length = 255)
    private String diagnostico;

    @Column(name = "fecha_entrada")
    @Temporal(TemporalType.DATE)
    @JsonDeserialize(using = DeserializadorFecha.class)
    @JsonSerialize(using = SerializadorFecha.class)
    private Date fechaEntrada;

    @Column(name = "fecha_probable_operacion")
    @Temporal(TemporalType.DATE)
    @JsonDeserialize(using = DeserializadorFecha.class)
    @JsonSerialize(using = SerializadorFecha.class)
    private Date fechaProbableOperacion;

    @Column(name = "patologia_tumoral", length = 255)
    private String patologiaTumoral;

    @Column(name = "grupo_factor", length = 255)
    private String grupoFactor;

    @Column(name = "sexo")
    private Boolean sexo;

    @Column(name = "fallecido")
    private Boolean fallecido;

    @Column(name = "fecha_registro_baja")
    @Temporal(TemporalType.DATE)
    @JsonDeserialize(using = DeserializadorFecha.class)
    @JsonSerialize(using = SerializadorFecha.class)
    private Date fechaRegistroBaja;

    @Column(name = "comentario_observaciones", length = 500)
    private String comentarioObservaciones;

    @OneToMany(mappedBy = "paciente")
    @JsonIgnore
    private List<Operacion> operaciones;

    @JoinColumn(name = "area_salud", referencedColumnName = "id_area_salud")
    @ManyToOne
    private AreaSalud areaSalud;

    @JoinColumn(name = "causa_baja", referencedColumnName = "id_causa")
    @ManyToOne
    private Causa causaBaja;

    @JoinColumn(name = "especialidad", referencedColumnName = "id_especialidad")
    @ManyToOne
    private Especialidad especialidad;

    @JoinColumn(name = "lista_espera", referencedColumnName = "id_lista_espera")
    @ManyToOne
    private ListaEspera listaEspera;

    public Paciente() {
    }

    public Paciente(Integer idPaciente) {
        this.idPaciente = idPaciente;
    }

    public Integer getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(Integer idPaciente) {
        this.idPaciente = idPaciente;
    }

    public String getHistoriaClinica() {
        return historiaClinica;
    }

    public void setHistoriaClinica(String historiaClinica) {
        this.historiaClinica = historiaClinica;
    }

    public String getCi() {
        return ci;
    }

    public void setCi(String ci) {
        this.ci = ci;
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

    public String getDireccionParticular() {
        return direccionParticular;
    }

    public void setDireccionParticular(String direccionParticular) {
        this.direccionParticular = direccionParticular;
    }

    public Integer getTelefono() {
        return telefono;
    }

    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    public Date getFechaEntrada() {
        return fechaEntrada;
    }

    public void setFechaEntrada(Date fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
    }

    public Date getFechaProbableOperacion() {
        return fechaProbableOperacion;
    }

    public void setFechaProbableOperacion(Date fechaProbableOperacion) {
        this.fechaProbableOperacion = fechaProbableOperacion;
    }

    public String getPatologiaTumoral() {
        return patologiaTumoral;
    }

    public void setPatologiaTumoral(String patologiaTumoral) {
        this.patologiaTumoral = patologiaTumoral;
    }

    public String getGrupoFactor() {
        return grupoFactor;
    }

    public void setGrupoFactor(String grupoFactor) {
        this.grupoFactor = grupoFactor;
    }

    public Date getFechaRegistroBaja() {
        return fechaRegistroBaja;
    }

    public void setFechaRegistroBaja(Date fechaRegistroBaja) {
        this.fechaRegistroBaja = fechaRegistroBaja;
    }

    public String getComentarioObservaciones() {
        return comentarioObservaciones;
    }

    public void setComentarioObservaciones(String comentarioObservaciones) {
        this.comentarioObservaciones = comentarioObservaciones;
    }

    @XmlTransient
    public List<Operacion> getOperaciones() {
        return operaciones;
    }

    public void setOperaciones(List<Operacion> operacionList) {
        this.operaciones = operacionList;
    }

    public AreaSalud getAreaSalud() {
        return areaSalud;
    }

    public void setAreaSalud(AreaSalud areaSalud) {
        this.areaSalud = areaSalud;
    }

    public Causa getCausaBaja() {
        return causaBaja;
    }

    public void setCausaBaja(Causa causaBaja) {
        this.causaBaja = causaBaja;
    }

    public Especialidad getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(Especialidad especialidad) {
        this.especialidad = especialidad;
    }

    public ListaEspera getListaEspera() {
        return listaEspera;
    }

    public void setListaEspera(ListaEspera listaEspera) {
        this.listaEspera = listaEspera;
    }

    public Boolean getSexo() {
        return sexo;
    }

    public void setSexo(Boolean sexo) {
        this.sexo = sexo;
    }

    public Boolean getFallecido() {
        return fallecido;
    }

    public void setFallecido(Boolean fallecido) {
        this.fallecido = fallecido;
    }
    
}

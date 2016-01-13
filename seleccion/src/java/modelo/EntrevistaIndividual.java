package modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.deser.std.DateDeserializers;
import com.fasterxml.jackson.databind.ser.std.DateSerializer;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Trabajo
 */
@Entity
@Table(name = "entrevista_individual")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "EntrevistaIndividual.findAll", query = "SELECT e FROM EntrevistaIndividual e"),
    @NamedQuery(name = "EntrevistaIndividual.findByIdEntrevistaIndividual", query = "SELECT e FROM EntrevistaIndividual e WHERE e.idEntrevistaIndividual = :idEntrevistaIndividual")})
@JsonIgnoreProperties(value = {"edadHijos"})
public class EntrevistaIndividual implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_entrevista_individual", nullable = false)
    private Integer idEntrevistaIndividual;

    @Column(name = "fecha_entrevista")
    @Temporal(TemporalType.DATE)
    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateDeserializers.DateDeserializer.class)
    private Date fechaEntrevista;

    @Column(name = "num_expediente", length = 255)
    private String numExpediente;

    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "financiamiento", precision = 8, scale = 8)
    private Float financiamiento;

    @Column(name = "nombre_padre", length = 255)
    private String nombrePadre;

    @Column(name = "nombre_madre", length = 255)
    private String nombreMadre;

    @Column(name = "estatura", length = 255)
    private String estatura;

    @Column(name = "color_piel", length = 255)
    private String colorPiel;

    @Column(name = "color_ojos", length = 255)
    private String colorOjos;

    @Column(name = "estado_civil", length = 255)
    private String estadoCivil;

    @Column(name = "num_hijos", length = 255)
    private String numHijos;

    @Column(name = "proficuo", length = 255)
    private String proficuo;

    @Column(name = "si_smg")
    private Boolean siSmg;

    @Column(name = "fecha_smg")
    @Temporal(TemporalType.DATE)
    @JsonSerialize(using = DateSerializer.class)
    private Date fechaSmg;

    @Column(name = "si_internacionalista")
    private Boolean siInternacionalista;

    @Column(name = "pais_internacionalista", length = 255)
    private String paisInternacionalista;

    @Column(name = "procedencia_far")
    private Boolean procedenciaFar;

    @Column(name = "procedencia_minint")
    private Boolean procedenciaMinint;

    @Column(name = "senas_visibles", length = 100000)
    private String senasVisibles;

    @Column(name = "telefono")
    private Integer telefono;

    @Column(name = "nombre_entrevistador", length = 255)
    private String nombreEntrevistador;

    @ManyToOne
    @JoinColumn(name = "aspirante", referencedColumnName = "id_aspirante")
    private Aspirante aspirante;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "entrevistaIndividual")
    @JsonIgnore
    private List<EntrevistaIndividualCentroTrabajo> entrevistaIndividualCentroTrabajos;

    @JoinTable(name = "entrevista_invididual_convivencia", inverseJoinColumns = {
        @JoinColumn(name = "id_convivencia", referencedColumnName = "id_convivencia", nullable = false)}, joinColumns = {
        @JoinColumn(name = "id_entrevista_individual", referencedColumnName = "id_entrevista_individual", nullable = false)})
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Convivencia> convivencias;

    @JoinTable(name = "entrevista_individual_integracion_revolucionaria", inverseJoinColumns = {
        @JoinColumn(name = "id_integracion_revolucionaria", referencedColumnName = "id_integracion_revolucionaria", nullable = false)}, joinColumns = {
        @JoinColumn(name = "id_entrevista_individual", referencedColumnName = "id_entrevista_individual", nullable = false)})
    @ManyToMany
    private List<IntegracionRevolucionaria> integracionesRevolucionarias;

    @JoinTable(name = "entrevista_individual_residencia", joinColumns = {
        @JoinColumn(name = "id_entrevista_individual", referencedColumnName = "id_entrevista_individual", nullable = false)}, inverseJoinColumns = {
        @JoinColumn(name = "id_residencia", referencedColumnName = "id_residencia", nullable = false)})
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.DETACH})
    private List<Residencia> residencias;

    @JoinColumn(name = "nivel_escolar", referencedColumnName = "id_nivel_escolar")
    @ManyToOne
    private NivelEscolar nivelEscolar;

    public EntrevistaIndividual() {
    }

    public EntrevistaIndividual(Integer idEntrevistaIndividual) {
        this.idEntrevistaIndividual = idEntrevistaIndividual;
    }

    public Integer getIdEntrevistaIndividual() {
        return idEntrevistaIndividual;
    }

    public void setIdEntrevistaIndividual(Integer idEntrevistaIndividual) {
        this.idEntrevistaIndividual = idEntrevistaIndividual;
    }

    public Date getFechaEntrevista() {
        return fechaEntrevista;
    }

    public void setFechaEntrevista(Date fechaEntrevista) {
        this.fechaEntrevista = fechaEntrevista;
    }

    public String getNumExpediente() {
        return numExpediente;
    }

    public void setNumExpediente(String numExpediente) {
        this.numExpediente = numExpediente;
    }

    public Float getFinanciamiento() {
        return financiamiento;
    }

    public void setFinanciamiento(Float financiamiento) {
        this.financiamiento = financiamiento;
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

    public String getEstatura() {
        return estatura;
    }

    public void setEstatura(String estatura) {
        this.estatura = estatura;
    }

    public String getColorPiel() {
        return colorPiel;
    }

    public void setColorPiel(String colorPiel) {
        this.colorPiel = colorPiel;
    }

    public String getColorOjos() {
        return colorOjos;
    }

    public void setColorOjos(String colorOjos) {
        this.colorOjos = colorOjos;
    }

    public String getEstadoCivil() {
        return estadoCivil;
    }

    public void setEstadoCivil(String estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public String getNumHijos() {
        return numHijos;
    }

    public void setNumHijos(String numHijos) {
        this.numHijos = numHijos;
    }

    public String getProficuo() {
        return proficuo;
    }

    public void setProficuo(String proficuo) {
        this.proficuo = proficuo;
    }

    public Boolean getSiSmg() {
        return siSmg;
    }

    public void setSiSmg(Boolean siSmg) {
        this.siSmg = siSmg;
    }

    public Date getFechaSmg() {
        return fechaSmg;
    }

    public void setFechaSmg(Date fechaSmg) {
        this.fechaSmg = fechaSmg;
    }

    public Boolean getSiInternacionalista() {
        return siInternacionalista;
    }

    public void setSiInternacionalista(Boolean siInternacionalista) {
        this.siInternacionalista = siInternacionalista;
    }

    public String getPaisInternacionalista() {
        return paisInternacionalista;
    }

    public void setPaisInternacionalista(String paisInternacionalista) {
        this.paisInternacionalista = paisInternacionalista;
    }

    public Boolean getProcedenciaFar() {
        return procedenciaFar;
    }

    public void setProcedenciaFar(Boolean procedenciaFar) {
        this.procedenciaFar = procedenciaFar;
    }

    public Boolean getProcedenciaMinint() {
        return procedenciaMinint;
    }

    public void setProcedenciaMinint(Boolean procedenciaMinint) {
        this.procedenciaMinint = procedenciaMinint;
    }

    public String getSenasVisibles() {
        return senasVisibles;
    }

    public void setSenasVisibles(String senasVisibles) {
        this.senasVisibles = senasVisibles;
    }

    public Integer getTelefono() {
        return telefono;
    }

    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
    }

    public String getNombreEntrevistador() {
        return nombreEntrevistador;
    }

    public void setNombreEntrevistador(String nombreEntrevistador) {
        this.nombreEntrevistador = nombreEntrevistador;
    }

    public Aspirante getAspirante() {
        return aspirante;
    }

    public void setAspirante(Aspirante aspirante) {
        this.aspirante = aspirante;
    }

    public NivelEscolar getNivelEscolar() {
        return nivelEscolar;
    }

    public void setNivelEscolar(NivelEscolar nivelEscolar) {
        this.nivelEscolar = nivelEscolar;
    }

    public List<Convivencia> getConvivencias() {
        return convivencias;
    }

    public void setConvivencias(List<Convivencia> convivencias) {
        this.convivencias = convivencias;
    }

    public List<IntegracionRevolucionaria> getIntegracionesRevolucionarias() {
        return integracionesRevolucionarias;
    }

    public void setIntegracionesRevolucionarias(List<IntegracionRevolucionaria> integracionesRevolucionarias) {
        this.integracionesRevolucionarias = integracionesRevolucionarias;
    }

    public List<Residencia> getResidencias() {
        return residencias;
    }

    public void setResidencias(List<Residencia> residencias) {
        this.residencias = residencias;
    }

    public List<EntrevistaIndividualCentroTrabajo> getEntrevistaIndividualCentroTrabajos() {
        return entrevistaIndividualCentroTrabajos;
    }

    public void setEntrevistaIndividualCentroTrabajos(List<EntrevistaIndividualCentroTrabajo> entrevistaIndividualCentroTrabajos) {
        this.entrevistaIndividualCentroTrabajos = entrevistaIndividualCentroTrabajos;
    }

}

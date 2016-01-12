package entidades;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "paciente")
@NamedQueries({
    @NamedQuery(name = "Paciente.findAll", query = "SELECT p FROM Paciente p"),
    @NamedQuery(name = "Paciente.findByIdPaciente", query = "SELECT p FROM Paciente p WHERE p.idPaciente = :idPaciente"),
    @NamedQuery(name = "Paciente.findByNombre", query = "SELECT p FROM Paciente p WHERE p.nombre = :nombre"),
    @NamedQuery(name = "Paciente.findByPrimerApellido", query = "SELECT p FROM Paciente p WHERE p.primerApellido = :primerApellido"),
    @NamedQuery(name = "Paciente.findByCi", query = "SELECT p FROM Paciente p WHERE p.ci = :ci"),
    @NamedQuery(name = "Paciente.findByConsulta", query = "SELECT p FROM Paciente p WHERE p.consulta = :consulta")})
public class Paciente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_paciente", nullable = false)
    private Integer idPaciente;

    @Column(name = "nombre", length = 255)
    private String nombre;

    @Column(name = "primer_apellido", length = 255)
    private String primerApellido;

    @Column(name = "segundo_apellido", length = 255)
    private String segundoApellido;

    @Column(name = "ocupacion", length = 255)
    private String ocupacion;

    @Column(name = "historia_clinica", length = 255)
    private String historiaClinica;

    @Column(name = "direccion", length = 255)
    private String direccion;

    @Column(name = "telefono", length = 50)
    private String telefono;

    @Column(name = "detencion_precoz")
    private Boolean detencionPrecoz;

    @Column(name = "ingresado")
    private Boolean ingresado;

    @Column(name = "ci", length = 11)
    private String ci;

    @Column(name = "edad")
    private Integer edad;

    @Column(name = "consulta", length = 255)
    private String consulta;

    @JoinColumn(name = "id_consultorio", referencedColumnName = "id_consultorio")
    @ManyToOne
    private Consultorio consultorio;

    @JoinColumn(name = "id_municipio", referencedColumnName = "id_municipio")
    @ManyToOne
    private Municipio municipio;

    @ManyToMany(mappedBy = "pacientes")
    @JsonIgnore
    private List<Tratamiento> tratamientos;

    public Paciente() {
    }

    public Paciente(Integer idPaciente) {
        this.idPaciente = idPaciente;
    }

    public String getOcupacion() {
        return ocupacion;
    }

    public void setOcupacion(String ocupacion) {
        this.ocupacion = ocupacion;
    }

    public Integer getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(Integer idPaciente) {
        this.idPaciente = idPaciente;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPrimerApellido() {
        return primerApellido;
    }

    public void setPrimerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
    }

    public String getSegundoApellido() {
        return segundoApellido;
    }

    public void setSegundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
    }

    public String getHistoriaClinica() {
        return historiaClinica;
    }

    public void setHistoriaClinica(String historiaClinica) {
        this.historiaClinica = historiaClinica;
    }

    public Boolean getDetencionPrecoz() {
        return detencionPrecoz;
    }

    public void setDetencionPrecoz(Boolean detencionPrecoz) {
        this.detencionPrecoz = detencionPrecoz;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCi() {
        return ci;
    }

    public void setCi(String ci) {
        this.ci = ci;
    }

    public Integer getEdad() {
        return edad;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public String getConsulta() {
        return consulta;
    }

    public void setConsulta(String consulta) {
        this.consulta = consulta;
    }

    public Consultorio getConsultorio() {
        return consultorio;
    }

    public void setConsultorio(Consultorio consultorio) {
        this.consultorio = consultorio;
    }

    public Municipio getMunicipio() {
        return municipio;
    }

    public void setMunicipio(Municipio municipio) {
        this.municipio = municipio;
    }

    @JsonIgnore
    public String getNombreCompleto() {
        return nombre + " " + primerApellido + " " + segundoApellido;
    }

    public List<Tratamiento> getTratamientos() {
        return tratamientos;
    }

    public void setTratamientos(List<Tratamiento> tratamientos) {
        this.tratamientos = tratamientos;
    }

    public void setIngresado(boolean b) {
        this.ingresado = b;
    }

    public Boolean getIngresado() {
        return ingresado;
    }

}

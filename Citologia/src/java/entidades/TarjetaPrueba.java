package entidades;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "tarjeta_prueba")
@NamedQueries({
    @NamedQuery(name = "TarjetaPrueba.contarDiagnosticos", query = "SELECT COUNT(t) FROM TarjetaPrueba t WHERE t.primeraCitologia.diagnosticoFinal=:diagnosticoFinal AND t.paciente.edad BETWEEN :edadInicio AND :edadFin")})
public class TarjetaPrueba implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tarjeta")
    private Integer idTarjeta;

    @OneToOne
    @JoinColumn(name = "id_paciente", referencedColumnName = "id_paciente",
            foreignKey = @ForeignKey(name = "fk_id_paciente"))
    private Paciente paciente;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_antecedente", referencedColumnName = "id_antecedente",
            foreignKey = @ForeignKey(name = "fk_id_antecedente"))
    private Antecedente antecedente;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_primera_citologia", referencedColumnName = "id_primera_citologia",
            foreignKey = @ForeignKey(name = "fk_id_primera_citologia"))
    private PrimeraCitologia primeraCitologia;

    @ManyToOne
    @JoinColumn(name = "id_tipo_caso", referencedColumnName = "id_tipo_caso",
            foreignKey = @ForeignKey(name = "fk_tipo_caso"))
    private TipoCaso tipoCaso;

    @JoinTable(name = "enfermedad_tarjeta_prueba", joinColumns = {
        @JoinColumn(name = "id_tarjeta_prueba", referencedColumnName = "id_tarjeta", nullable = false)}, inverseJoinColumns = {
        @JoinColumn(name = "id_enfermedad_transmision_sexual", referencedColumnName = "id_enfermedad_transmision_sexual", nullable = false)})
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.EAGER)
    private List<EnfermedadTransmisionSexual> enfermedadesTransmisionSexual;

    @Transient
    private String nombre;

    public Integer getIdTarjeta() {
        return idTarjeta;
    }

    public void setIdTarjeta(Integer idTarjeta) {
        this.idTarjeta = idTarjeta;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Antecedente getAntecedente() {
        return antecedente;
    }

    public void setAntecedente(Antecedente antecedente) {
        this.antecedente = antecedente;
    }

    public PrimeraCitologia getPrimeraCitologia() {
        return primeraCitologia;
    }

    public void setPrimeraCitologia(PrimeraCitologia primeraCitologia) {
        this.primeraCitologia = primeraCitologia;
    }

    public TipoCaso getTipoCaso() {
        return tipoCaso;
    }

    public void setTipoCaso(TipoCaso tipoCaso) {
        this.tipoCaso = tipoCaso;
    }

    public List<EnfermedadTransmisionSexual> getEnfermedadesTransmisionSexual() {
        return enfermedadesTransmisionSexual;
    }

    public void setEnfermedadesTransmisionSexual(List<EnfermedadTransmisionSexual> enfermedadesTransmisionSexual) {
        this.enfermedadesTransmisionSexual = enfermedadesTransmisionSexual;
    }

    public String getNombre() {
        nombre = paciente.getNombreCompleto();
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = paciente.getNombreCompleto();
    }

}

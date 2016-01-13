/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

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
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@Entity
@Table(name = "documento_aprobatorio")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "DocumentoAprobatorio.findAll", query = "SELECT d FROM DocumentoAprobatorio d")})
public class DocumentoAprobatorio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_documento_aprobatorio", nullable = false)

    private Integer idDocumentoAprobatorio;

    @Column(name = "fecha_examen")
    @Temporal(TemporalType.DATE)
    private Date fechaExamen;

    @Column(name = "destinatario", length = 255)
    private String destinatario;

    @Column(name = "resume_diagnostico", length = 3000000)
    private String resumenDiagnostico;

    @Column(name = "aprobado")
    private Boolean aprobado;

    @OneToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_resumen_sicometrico", referencedColumnName = "id_resumen_sicometrico")
    private ResumenSicometrico resumenSicometrico;

    public DocumentoAprobatorio() {
    }

    public DocumentoAprobatorio(Integer idDocumentoAprobatorio) {
        this.idDocumentoAprobatorio = idDocumentoAprobatorio;
    }

    public Integer getIdDocumentoAprobatorio() {
        return idDocumentoAprobatorio;
    }

    public void setIdDocumentoAprobatorio(Integer idDocumentoAprobatorio) {
        this.idDocumentoAprobatorio = idDocumentoAprobatorio;
    }

    public Date getFechaExamen() {
        return fechaExamen;
    }

    public void setFechaExamen(Date fechaExamen) {
        this.fechaExamen = fechaExamen;
    }

    public Boolean getAprobado() {
        return aprobado;
    }

    public void setAprobado(Boolean aprobado) {
        this.aprobado = aprobado;
    }

    public String getDestinatario() {
        return destinatario;
    }

    public void setDestinatario(String destinatario) {
        this.destinatario = destinatario;
    }

    public String getResumenDiagnostico() {
        return resumenDiagnostico;
    }

    public void setResumenDiagnostico(String resumenDiagnostico) {
        this.resumenDiagnostico = resumenDiagnostico;
    }

    public ResumenSicometrico getResumenSicometrico() {
        return resumenSicometrico;
    }

    public void setResumenSicometrico(ResumenSicometrico resumenSicometrico) {
        this.resumenSicometrico = resumenSicometrico;
    }

}

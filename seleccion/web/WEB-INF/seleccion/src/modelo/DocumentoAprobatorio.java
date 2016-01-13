/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

import java.util.Date;

public class DocumentoAprobatorio {

	private Integer idDocumentoAprobatorio;

	private Date fechaExamen;

	private String destinatario;

	private String resumenDiagnostico;

	private Boolean aprobado;

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

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

import java.util.List;

public class TipoCurso {

	private Integer idTipoCurso;

	private String tipoCurso;

	private List<CronogramaCurso> cronogramasCursos;

	public TipoCurso() {
	}

	public TipoCurso(Integer idTipoCurso) {
		this.idTipoCurso = idTipoCurso;
	}

	public Integer getIdTipoCurso() {
		return idTipoCurso;
	}

	public void setIdTipoCurso(Integer idTipoCurso) {
		this.idTipoCurso = idTipoCurso;
	}

	public String getTipoCurso() {
		return tipoCurso;
	}

	public void setTipoCurso(String tipoCurso) {
		this.tipoCurso = tipoCurso;
	}

	public List<CronogramaCurso> getCronogramasCursos() {
		return cronogramasCursos;
	}

	public void setCronogramasCursos(List<CronogramaCurso> cronogramasCursos) {
		this.cronogramasCursos = cronogramasCursos;
	}
}

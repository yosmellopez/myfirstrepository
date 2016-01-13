/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "tipo_curso")
@JsonIgnoreProperties(ignoreUnknown = true)
public class TipoCurso implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_tipo_curso")
    private Integer idTipoCurso;

    @Column(name = "tipo_curso", length = 100)
    private String tipoCurso;

    @OneToMany(mappedBy = "tipoCurso")
    @JsonIgnore
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

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clases;

import java.io.Serializable;
import java.util.List;

import javax.xml.bind.annotation.XmlTransient;

public class Grupo implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer idGrupo;

    private String grupo;

    private List<Operacion> operacionList;

    private List<Especialista> especialistaList;

    public Grupo() {
    }

    public Grupo(Integer idGrupo) {
        this.idGrupo = idGrupo;
    }

    public Integer getIdGrupo() {
        return idGrupo;
    }

    public void setIdGrupo(Integer idGrupo) {
        this.idGrupo = idGrupo;
    }

    public String getGrupo() {
        return grupo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }

    @XmlTransient
    public List<Operacion> getOperacionList() {
        return operacionList;
    }

    public void setOperacionList(List<Operacion> operacionList) {
        this.operacionList = operacionList;
    }

    @XmlTransient
    public List<Especialista> getEspecialistaList() {
        return especialistaList;
    }

    public void setEspecialistaList(List<Especialista> especialistaList) {
        this.especialistaList = especialistaList;
    }
}

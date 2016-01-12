/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clases;

import java.util.List;

public class Causa {
    private Integer idCausa;

    private String causa;

    private List<Paciente> pacienteList;

    public Causa() {
    }

    public Causa(Integer idCausa) {
        this.idCausa = idCausa;
    }

    public Integer getIdCausa() {
        return idCausa;
    }

    public void setIdCausa(Integer idCausa) {
        this.idCausa = idCausa;
    }

    public String getCausa() {
        return causa;
    }

    public void setCausa(String causa) {
        this.causa = causa;
    }

    public List<Paciente> getPacienteList() {
        return pacienteList;
    }

    public void setPacienteList(List<Paciente> pacienteList) {
        this.pacienteList = pacienteList;
    }
}

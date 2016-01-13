/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modelo;

import java.util.List;

public class NivelEscolar {

    private Integer idNivelEscolar;

    private String nivelEscolar;

    private List<EntrevistaIndividual> entrevistaIndividualList;

    public NivelEscolar() {
    }

    public NivelEscolar(Integer idNivelEscolar) {
        this.idNivelEscolar = idNivelEscolar;
    }

    public Integer getIdNivelEscolar() {
        return idNivelEscolar;
    }

    public void setIdNivelEscolar(Integer idNivelEscolar) {
        this.idNivelEscolar = idNivelEscolar;
    }

    public String getNivelEscolar() {
        return nivelEscolar;
    }

    public void setNivelEscolar(String nivelEscolar) {
        this.nivelEscolar = nivelEscolar;
    }

    public List<EntrevistaIndividual> getEntrevistaIndividualList() {
        return entrevistaIndividualList;
    }

    public void setEntrevistaIndividualList(List<EntrevistaIndividual> entrevistaIndividualList) {
        this.entrevistaIndividualList = entrevistaIndividualList;
    }

}

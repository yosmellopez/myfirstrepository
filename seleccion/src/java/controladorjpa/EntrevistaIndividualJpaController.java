/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controladorjpa;

import modelo.EntrevistaIndividual;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class EntrevistaIndividualJpaController extends RepositorioEntidades<EntrevistaIndividual, Integer> {

    public EntrevistaIndividualJpaController() {
        super(EntrevistaIndividual.class);
    }

    @Override
    @Transactional
    public EntrevistaIndividual actualizarEntidad(Integer id, EntrevistaIndividual t) {
        EntrevistaIndividual entrevistaIndividual = em.find(EntrevistaIndividual.class, id);
        entrevistaIndividual.setAspirante(t.getAspirante());
        entrevistaIndividual.setColorOjos(t.getColorOjos());
        entrevistaIndividual.setColorPiel(t.getColorPiel());
        entrevistaIndividual.setEstadoCivil(t.getEstadoCivil());
        entrevistaIndividual.setEstatura(t.getEstatura());
        entrevistaIndividual.setFechaEntrevista(t.getFechaEntrevista());
        entrevistaIndividual.setFechaSmg(t.getFechaSmg());
        entrevistaIndividual.setFinanciamiento(t.getFinanciamiento());
        entrevistaIndividual.setNivelEscolar(t.getNivelEscolar());
        entrevistaIndividual.setNombreEntrevistador(t.getNombreEntrevistador());
        entrevistaIndividual.setNombreMadre(t.getNombreMadre());
        entrevistaIndividual.setNombrePadre(t.getNombrePadre());
        entrevistaIndividual.setNumExpediente(t.getNumExpediente());
        entrevistaIndividual.setNumHijos(t.getNumHijos());
        entrevistaIndividual.setPaisInternacionalista(t.getPaisInternacionalista());
        entrevistaIndividual.setProcedenciaFar(t.getProcedenciaFar());
        entrevistaIndividual.setProcedenciaMinint(t.getProcedenciaMinint());
        entrevistaIndividual.setProficuo(t.getProficuo());
        entrevistaIndividual.setSenasVisibles(t.getSenasVisibles());
        entrevistaIndividual.setSiInternacionalista(t.getSiInternacionalista());
        entrevistaIndividual.setSiSmg(t.getSiSmg());
        entrevistaIndividual.setTelefono(t.getTelefono());
        em.merge(entrevistaIndividual);
        return entrevistaIndividual;
    }

}

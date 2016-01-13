/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controladorjpa;

import modelo.DatosAspirante;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class DatosAspiranteJpaController extends RepositorioEntidades<DatosAspirante, Integer> {

    public DatosAspiranteJpaController() {
        super(DatosAspirante.class);
    }
 
   @Override
   @Transactional
    public DatosAspirante actualizarEntidad (Integer id, DatosAspirante  t){
    DatosAspirante datosAspirante = em.find(DatosAspirante.class,id);
    datosAspirante.setAntecedenteFamiliar(t.getAntecedenteFamiliar());
    datosAspirante.setAntecedentePatologico(t.getAntecedentePatologico());
    datosAspirante.setAntecedentePenal(t.getAntecedentePenal());
//    datosAspirante.setAspirante(t.getAspirante());
    datosAspirante.setNumHijos(t.getNumHijos());
    datosAspirante.setPersonasConvivencia(t.getPersonasConvivencia());
    datosAspirante.setProblemaFamiliar(t.getProblemaFamiliar());
    em.merge(datosAspirante);
    return datosAspirante;
    }
    
    
}

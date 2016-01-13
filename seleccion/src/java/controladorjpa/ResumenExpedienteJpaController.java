/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controladorjpa;

import modelo.ResumenExpediente;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class ResumenExpedienteJpaController extends RepositorioEntidades<ResumenExpediente, Integer> {

    public ResumenExpedienteJpaController() {
        super(ResumenExpediente.class);
    }

    @Override
    @Transactional
    public ResumenExpediente actualizarEntidad(Integer id, ResumenExpediente t) {
        ResumenExpediente resumenExpediente = em.find(ResumenExpediente.class, id);
        resumenExpediente.setAntecPenal(t.getAntecPenal());
        resumenExpediente.setApodo(t.getApodo());
        resumenExpediente.setAspirante(t.getAspirante());
        resumenExpediente.setChequeoMedico(t.getChequeoMedico());
        resumenExpediente.setCiudad(t.getCiudad());
        resumenExpediente.setConclusiones(t.getConclusiones());
        resumenExpediente.setElaborador(t.getElaborador());
        resumenExpediente.setFecha(t.getFecha());
        resumenExpediente.setFechaElaborado(t.getFechaElaborado());
        resumenExpediente.setNombreDirector(t.getNombreDirector());
        resumenExpediente.setTelefono(t.getTelefono());
        resumenExpediente.setTrayEstudiantil(t.getTrayEstudiantil());
        resumenExpediente.setTrayLaboral(t.getTrayLaboral());
        resumenExpediente.setTrayRevolucionaria(t.getTrayRevolucionaria());

        em.merge(resumenExpediente);
        return resumenExpediente;
    }

}

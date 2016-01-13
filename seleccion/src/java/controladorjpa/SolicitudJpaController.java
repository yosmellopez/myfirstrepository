/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controladorjpa;

import modelo.Solicitud;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class SolicitudJpaController extends RepositorioEntidades<Solicitud, Integer> {

    public SolicitudJpaController() {
        super(Solicitud.class);
    }

    @Override
    @Transactional
    public Solicitud actualizarEntidad(Integer id, Solicitud t) {
        Solicitud solicitud = em.find(Solicitud.class, id);
        solicitud.setAspirante(t.getAspirante());
        solicitud.setCausaSolicitud(t.getCausaSolicitud());
        solicitud.setFechaSolicitud(t.getFechaSolicitud());
        em.merge(solicitud);
        return solicitud;
    }

}

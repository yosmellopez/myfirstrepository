package jpa;

import entidades.Consultorio;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class ConsultorioJpaController extends EntitiesRepository<Consultorio, Integer> {

    public ConsultorioJpaController() {
        super(Consultorio.class);
        orderBy = "idConsultorio";
    }

    @Override
    @Transactional
    public Consultorio actualizarEntidad(Integer id, Consultorio t) {
        Consultorio consultorio = em.find(Consultorio.class, id);
        consultorio.setAreaSalud(t.getAreaSalud());
        consultorio.setNombre(t.getNombre());
        em.merge(consultorio);
        return consultorio;
    }

}

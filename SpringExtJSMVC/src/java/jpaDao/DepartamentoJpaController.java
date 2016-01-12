package jpaDao;

import clases.Departamento;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class DepartamentoJpaController extends EntitiesRepository<Departamento, Integer> {

    public DepartamentoJpaController() {
        super(Departamento.class);
        orderBy = "facultad";
    }

    @Override
    @Transactional
    public Departamento actualizarEntidad(Integer id, Departamento t) {
        Departamento departamento = em.getReference(Departamento.class, id);
        departamento.setFacultad(t.getFacultad());
        departamento.setNombre(t.getNombre());
        em.merge(departamento);
        return departamento;
    }

}

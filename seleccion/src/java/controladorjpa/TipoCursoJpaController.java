package controladorjpa;

import modelo.TipoCurso;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class TipoCursoJpaController extends RepositorioEntidades<TipoCurso, Integer> {

    public TipoCursoJpaController() {
        super(TipoCurso.class);
    }

    @Override
    @Transactional
    public TipoCurso actualizarEntidad(Integer id, TipoCurso t) {
        TipoCurso tipoCurso = em.find(TipoCurso.class, id);
        em.merge(tipoCurso);
        return tipoCurso;
    }

}

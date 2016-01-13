package controladorjpa;

import modelo.Convivencia;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class ConvivenciaJpaController extends RepositorioEntidades<Convivencia, Integer> {
    
    public ConvivenciaJpaController() {
        super(Convivencia.class);
    }
    
    @Override
    @Transactional
    public Convivencia actualizarEntidad(Integer id, Convivencia t) {
        Convivencia convivencia = em.find(Convivencia.class, id);
        convivencia.setCentroTrabajoEscuela(t.getCentroTrabajoEscuela());
        convivencia.setEscuelaOCentro(t.getEscuelaOCentro());
        convivencia.setNombreApellidos(t.getNombreApellidos());
        convivencia.setEdad(t.getEdad());
        convivencia.setParentesco(t.getParentesco());
        em.merge(convivencia);
        return convivencia;
    }
    
}

package controladorjpa;

import modelo.Aspirante;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class AspiranteJpaController extends RepositorioEntidades<Aspirante, Integer> {
    
    public AspiranteJpaController() {
        super(Aspirante.class);
        orderBy = "idAspirante";
    }
    
    @Override
    @Transactional
    public Aspirante actualizarEntidad(Integer id, Aspirante t) {
        Aspirante aspirante = em.find(Aspirante.class, id);
        aspirante.setApellidos(t.getApellidos());
        aspirante.setCi(t.getCi());
        aspirante.setNombrePadre(t.getNombrePadre());
        aspirante.setNombreMadre(t.getNombreMadre());
        aspirante.setDireccion(t.getDireccion());
        aspirante.setEdad(t.getEdad());
        aspirante.setNombre(t.getNombre());
        aspirante.setResumenExpediente(t.getResumenExpediente());
        em.merge(aspirante);
        return aspirante;
    }
    
}

package jpa;

import entidades.Antecedente;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class AntecedenteJpaController extends EntitiesRepository<Antecedente, Integer> {

    public AntecedenteJpaController() {
        super(Antecedente.class);
    }

    @Override
    @Transactional
    public Antecedente actualizarEntidad(Integer id, Antecedente t) {
        Antecedente antecedente = em.find(Antecedente.class, orderBy);
        antecedente.setEdadPrimerEmbarazo(t.getEdadPrimerEmbarazo());
        antecedente.setEdadPrimeraRelacionSexual(t.getEdadPrimeraRelacionSexual());
        antecedente.setMetrorragia(t.getMetrorragia());
        antecedente.setNumeroPartos(t.getNumeroPartos());
        antecedente.setOtros(t.getOtros());
        antecedente.setTipoAnticonceptivo(t.getTipoAnticonceptivo());
        antecedente.setUltimaMestruacion(t.getUltimaMestruacion());
        antecedente.setUltimaMestruacion(t.getUltimaMestruacion());
        antecedente.setYearMenopausia(t.getYearMenopausia());
        em.merge(antecedente);
        return antecedente;
    }
}

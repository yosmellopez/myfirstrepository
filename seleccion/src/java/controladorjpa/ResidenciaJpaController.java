/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controladorjpa;

import modelo.Residencia;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class ResidenciaJpaController extends RepositorioEntidades<Residencia, Integer> {

    public ResidenciaJpaController() {
        super(Residencia.class);
    }

    @Override
    @Transactional
    public Residencia actualizarEntidad(Integer id, Residencia t) {
        Residencia residencia = em.find(Residencia.class, id);
        residencia.setDesde(t.getDesde());
        residencia.setHasta(t.getHasta());
        residencia.setDireccion(t.getDireccion());
        em.merge(residencia);
        return residencia;
    }

    @Override
    @Transactional
    public void insertarEntidad(Residencia t) {
        super.insertarEntidad(t); //To change body of generated methods, choose Tools | Templates.
        em.clear();
    }
}

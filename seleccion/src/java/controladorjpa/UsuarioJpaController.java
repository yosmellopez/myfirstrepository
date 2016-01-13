/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controladorjpa;

import javax.persistence.Query;
import modelo.Usuario;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class UsuarioJpaController extends RepositorioEntidades<Usuario, Integer> {

    public UsuarioJpaController() {
        super(Usuario.class);
    }

    @Override
    @Transactional
    public Usuario actualizarEntidad(Integer id, Usuario t) {
        Usuario usuario = em.find(Usuario.class, id);
        usuario.setApellidos(t.getApellidos());
        usuario.setContrasena(t.getContrasena());
        usuario.setNombre(t.getNombre());
        usuario.setRol(t.getRol());
        usuario.setUltimoInicio(t.getUltimoInicio());
        usuario.setUsuario(t.getUsuario());
        em.merge(usuario);
        return usuario;
    }

    @Transactional
    public Usuario buscarUsuario(String usuario) {
        Query query = em.createNamedQuery("Usuario.findByUsuario");
        query.setParameter("usuario", usuario);
        try {
            //Devuelve un solo resultado si la consulta solo devuelve un resultado
            return (Usuario) query.getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }
}

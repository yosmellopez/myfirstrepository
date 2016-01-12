package jpa;

import clases.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioJpa extends JpaRepository<Usuario, Integer>, JpaSpecificationExecutor<Usuario> {
}

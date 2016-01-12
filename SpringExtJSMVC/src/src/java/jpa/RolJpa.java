package jpa;

import org.springframework.stereotype.Repository;
import clases.Rol;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface RolJpa extends CrudRepository<Rol, Integer>{
    
}

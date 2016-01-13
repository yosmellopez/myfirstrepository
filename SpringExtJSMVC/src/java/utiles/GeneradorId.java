package utiles;

import clases.Rol;
import com.fasterxml.jackson.annotation.ObjectIdGenerator;

public class GeneradorId extends ObjectIdGenerator<Rol> {

    @Override
    public Class<?> getScope() {
        return Rol.class;
    }

    @Override
    public boolean canUseFor(ObjectIdGenerator<?> gen) {
        return true;
    }

    @Override
    public ObjectIdGenerator<Rol> forScope(Class<?> scope) {
        return this;
    }

    @Override
    public ObjectIdGenerator<Rol> newForSerialization(Object context) {
        return this;
    }

    @Override
    public IdKey key(Object key) {
        return new IdKey(Rol.class, null, key);
    }

    @Override
    public Rol generateId(Object forPojo) {
        Rol r = (Rol) forPojo;
        return new Rol(r.getIdRol(), r.getRol());
    }

}

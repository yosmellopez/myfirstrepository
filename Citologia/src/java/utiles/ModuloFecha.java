package utiles;

import com.fasterxml.jackson.databind.module.SimpleModule;
import java.util.Date;

public class ModuloFecha extends SimpleModule {

    public ModuloFecha() {
        addSerializer(Date.class, new SerializadorFecha());
        addDeserializer(Date.class, new DeserializadorFecha());
    }
}

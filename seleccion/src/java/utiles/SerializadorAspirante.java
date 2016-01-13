/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utiles;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;
import modelo.Aspirante;

/**
 *
 * @author Postgrado
 */
public class SerializadorAspirante extends JsonSerializer<Aspirante>{

    @Override
    public void serialize(Aspirante value, JsonGenerator gen, SerializerProvider serializers) throws IOException, JsonProcessingException {
        value.setDatosAspirante(null);
        gen.writeObject(value);
    }
    
}

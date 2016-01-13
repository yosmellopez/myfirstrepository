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
import modelo.ResumenExpediente;

public class SerializadorResumenExpediente extends JsonSerializer<ResumenExpediente>{

    @Override
    public void serialize(ResumenExpediente resumen, JsonGenerator gen, SerializerProvider serializers) throws IOException, JsonProcessingException {
        resumen.setAspirante(new Aspirante(resumen.getAspirante().getIdAspirante()));
        gen.writeObject(resumen);
    }
    
}

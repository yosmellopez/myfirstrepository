/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clasesUtiles;

import clases.TipoOperacionRecursoPK;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.IOException;

public class DeserializadorOperacionRecurso extends JsonDeserializer<TipoOperacionRecursoPK> {

    @Override
    public TipoOperacionRecursoPK deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonNode jsonNode = p.getCodec().readTree(p);
        String[] split = jsonNode.asText().split("-");
        return new TipoOperacionRecursoPK(Integer.parseInt(split[0]), Integer.parseInt(split[1]));
    }

}

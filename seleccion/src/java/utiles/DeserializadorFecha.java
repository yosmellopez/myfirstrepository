package utiles;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

public class DeserializadorFecha extends JsonDeserializer<Date> {

    @Override
    public Date deserialize(JsonParser jp, DeserializationContext dc) throws IOException, JsonProcessingException {
        try {
            JsonNode nodo = jp.getCodec().readTree(jp);
            SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
            return format.parse(nodo.asText());
        } catch (ParseException ex) {
            Logger.getLogger(DeserializadorFecha.class.getName()).log(Level.SEVERE, null, ex);
        }
        return new Date();
    }
}

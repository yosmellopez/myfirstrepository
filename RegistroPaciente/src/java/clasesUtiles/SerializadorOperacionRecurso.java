package clasesUtiles;

import clases.TipoOperacionRecursoPK;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;

public class SerializadorOperacionRecurso extends JsonSerializer<TipoOperacionRecursoPK> {
    
    @Override
    public void serialize(TipoOperacionRecursoPK value, JsonGenerator gen, SerializerProvider serializers) throws IOException, JsonProcessingException {
        gen.writeString(value.getIdTipoOperacion() + "-" + value.getIdRecurso());
    }
    
}

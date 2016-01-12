package config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
//Con esta clase se puede representar el web.xml
//Aqui se le especifican cuales son las clases que debe cargar el framework 
//El getRootConfigClasses son clases que el framework va a cargar al inicio donde se ubican los beans
//las Conexiones a la base en caso de que desees injectar el EntityManager, Manejo de Transanciones,
//Cargado de Repositorios Tanto de la Forma (Data Access Objects DAO o Spring Data JPA que es el caso que te hago esto
//Aqui se le especifican cuales son las clases que debe cargar el framework 
/*
El getServletConfigClasses son las clases que el dispatcher Servlet va a cargar como parte del MVC
Recuerda que a partir de la especificacion de Servlet 3.0 no se hace uso del web.xml sino que los servlets estan 
configurados con anotaciones
*/
public class InicializadorWeb extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{AppConfig.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{ConfiguracionWeb.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

}

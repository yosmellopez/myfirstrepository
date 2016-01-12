package config;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import resolver.SpecificationArgumentResolver;

@Configuration
//Recuerda donde buscar las anotaciones de los controladores
@ComponentScan(basePackages = {"control"})
@EnableWebMvc

//Debes heredar de esta clase para configurar bien el DispatcherServlet porque ya trae un grupo de metodos que lo resuelven todo
public class ConfiguracionWeb extends WebMvcConfigurerAdapter {

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
    

    //Resolvedor de vistas
    @Bean
    public ViewResolver resolver() {
        InternalResourceViewResolver url = new InternalResourceViewResolver();
        url.setPrefix("/WEB-INF/vistas/");
        url.setSuffix(".jsp");
        return url;
    }

    //Esto es para inyectar las clases Pageable en los metodos de los controladores que permite paginar resultado y ordenarlos
    //Y puedes agregar los que desees ahi
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        PageableHandlerMethodArgumentResolver resolver = new PageableHandlerMethodArgumentResolver();
        resolver.setOneIndexedParameters(true);
        SpecificationArgumentResolver sar = new SpecificationArgumentResolver();
        argumentResolvers.add(sar);
        argumentResolvers.add(resolver);
    }
}

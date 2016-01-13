package configuracion;

import aspectos.TrazaAspecto;
import java.util.LinkedList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.web.method.annotation.AuthenticationPrincipalArgumentResolver;
import org.springframework.web.accept.ContentNegotiationManager;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsViewResolver;
import utiles.MapeadorObjetos;
import vistas.ContentNegociationResolvedorVista;
import vistas.JasperReportsMultiFormatoView;

@Configuration
@ComponentScan(basePackages = {"controlador"})
@EnableWebMvc
@EnableAspectJAutoProxy
public class ConfiguracionWeb extends WebMvcConfigurerAdapter {

    @Autowired
    MapeadorObjetos mapeadorObjetos;

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setObjectMapper(mapeadorObjetos);
        converters.add(converter);
        super.configureMessageConverters(converters);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/").addResourceLocations("/**");
    }

    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer.favorPathExtension(true).ignoreAcceptHeader(true).useJaf(false).defaultContentType(MediaType.TEXT_HTML).
                mediaType("html", MediaType.TEXT_HTML).
                mediaType("htm", MediaType.TEXT_HTML).
                mediaType("xml", MediaType.APPLICATION_XML).
                mediaType("do", MediaType.APPLICATION_FORM_URLENCODED).
                mediaType("json", MediaType.APPLICATION_JSON);
        super.configureContentNegotiation(configurer); //To change body of generated methods, choose Tools | Templates.
    }

    @Bean(name = "contentNegotiatingViewResolver")
    public ViewResolver contentNegotiatingViewResolver(ContentNegotiationManager manager) {
        List<ViewResolver> resolvers = new LinkedList<>();
        JasperReportsViewResolver reportsViewResolver = new JasperReportsViewResolver();
        reportsViewResolver.setPrefix("/WEB-INF/seleccion/");
        reportsViewResolver.setSuffix(".jrxml");
        reportsViewResolver.setViewClass(JasperReportsMultiFormatoView.class);
        
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setPrefix("/WEB-INF/vista/");
        viewResolver.setSuffix(".jsp");
        viewResolver.setViewClass(JstlView.class);
        resolvers.add(reportsViewResolver);
        resolvers.add(viewResolver);
        ContentNegociationResolvedorVista resolver = new ContentNegociationResolvedorVista();
        resolver.setContentNegotiationManager(manager);
        resolver.setViewResolvers(resolvers);
        return resolver;
    }

//    @Override
//    public void configureViewResolvers(ViewResolverRegistry registry) {
//        registry.enableContentNegotiation(true, new MappingJackson2JsonView(mapeadorObjetos));
//        super.configureViewResolvers(registry);
//    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        AuthenticationPrincipalArgumentResolver resolver = new AuthenticationPrincipalArgumentResolver();
        argumentResolvers.add(resolver);
        super.addArgumentResolvers(argumentResolvers); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    @Bean
    public TrazaAspecto trazaAspecto() {
        return new TrazaAspecto();
    }

//    @Bean
//    public HandlerExceptionResolver exceptionResolver() {
//        Properties mappings = new Properties();
//        mappings.put("org.springframework.web.servlet.PageNotFound", "404");
////        mappings.put(DataAccessException.class.getName(), "dataAccessFailure");
////        mappings.put(TransactionException.class.getName(), "dataAccessFailure");
//        SimpleMappingExceptionResolver resolver = new SimpleMappingExceptionResolver();
//        resolver.setExceptionMappings(mappings);
//        return resolver;
//    }
}

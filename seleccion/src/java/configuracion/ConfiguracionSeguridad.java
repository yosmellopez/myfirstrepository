package configuracion;

import java.util.Arrays;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.dao.ReflectionSaltSource;
import org.springframework.security.authentication.dao.SaltSource;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import utiles.AutenticacionExitosa;
import utiles.AutenticacionFallida;
import utiles.EncriptadorContrasena;
import utiles.ManejadorLogout;
import utiles.ServicioInicio;

@Configuration
@EnableWebSecurity
public class ConfiguracionSeguridad extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private ServicioInicio customUserDetailsService;

    @Autowired
    private EncriptadorContrasena encriptadorContrasena;

    @Autowired
    ReloadableResourceBundleMessageSource messageSource;

    @Override
    protected void configure(AuthenticationManagerBuilder registry) throws Exception {
        registry.authenticationProvider(authenticationProvider());
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/resources/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().headers().frameOptions().disable().and()
                .authorizeRequests().antMatchers("/usuario.htm").hasAnyAuthority("Administrador", "Psicologo").and()
                .authorizeRequests().antMatchers("/index.htm").hasAnyAuthority("Administrador", "Psicologo")
                .antMatchers("/admin/**").hasAuthority("Administrador")
                .antMatchers("/tecnico/**").hasAnyAuthority("Tecnico")
                .antMatchers("/psicologo/**").hasAuthority("Psicologo").and()
                .formLogin().loginPage("/login.htm").loginProcessingUrl("/login_check").successHandler(autenticacionExitosa()).failureHandler(autenticacionFallida())
                .usernameParameter("usuario").passwordParameter("password").and()
                .logout().logoutSuccessHandler(manejadorLogout()).logoutUrl("/salir.htm").logoutSuccessUrl("/login.htm").and()
                .exceptionHandling().accessDeniedPage("/denegado.htm");
//                .and().csrf().and().rememberMe().tokenRepository(persistentTokenRepository())
//                .tokenValiditySeconds(1209600);
    }

    @Bean
    public PersistentTokenRepository persistentTokenRepository() {
        JdbcTokenRepositoryImpl db = new JdbcTokenRepositoryImpl();
        db.setDataSource(dataSource);
        return db;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManager() throws Exception {
        AuthenticationManager authenticationManager = new ProviderManager(Arrays.asList(authenticationProvider()));
        return authenticationManager;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() throws Exception {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setSaltSource(saltSource());
        provider.setPasswordEncoder(encriptadorContrasena);
        provider.setUserDetailsService(customUserDetailsService);
        provider.setMessageSource(messageSource);
        return provider;
    }

    @Bean
    public SaltSource saltSource() throws Exception {
        ReflectionSaltSource saltSource = new ReflectionSaltSource();
        saltSource.setUserPropertyToUse("usuario");
        saltSource.afterPropertiesSet();
        return saltSource;
    }

    @Bean
    public AutenticacionExitosa autenticacionExitosa() {
        return new AutenticacionExitosa();
    }

    @Bean
    public AutenticacionFallida autenticacionFallida() {
        AutenticacionFallida fallida = new AutenticacionFallida();
        fallida.setDefaultFailureUrl("/login.htm?error");
        return fallida;
    }

    @Bean
    public UsernamePasswordAuthenticationFilter usernamePasswordAuthenticationFilter() throws Exception {
        UsernamePasswordAuthenticationFilter filtro = new UsernamePasswordAuthenticationFilter();
        filtro.setUsernameParameter("usuario");
        filtro.setPasswordParameter("password");
        filtro.setAuthenticationManager(authenticationManager());
        filtro.setAllowSessionCreation(true);
        filtro.setAuthenticationSuccessHandler(autenticacionExitosa());
        filtro.setAuthenticationFailureHandler(autenticacionFallida());
        filtro.afterPropertiesSet();
        return filtro;
    }

    @Bean
    public ManejadorLogout manejadorLogout() {
        return new ManejadorLogout();
    }
}

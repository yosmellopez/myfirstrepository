package config;

import java.util.Properties;
import javax.persistence.EntityManagerFactory;
//import org.hsqldb.util.DatabaseManagerSwing;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import utiles.MapeadorObjetos;

/*
@Configuration denota que esta clase es una configuracion de Spring
@EnableWebMvc denota que se debe habilitar toda la parte del dispatcher servlet en esta clase
@EnableTransactionManagement habilitar el manejo de transacciones mediante Spring o sea
ya yo no tengo que manejarlas sino que con anotaciones tu puedes decir que este metodo
se ejecuta de forma transaccional entonces Spring te maneja las Transacciones
@EnableJpaRepositories(basePackages = "jpa") Trabajo con Spring Data JPA lo que te hable
donde ahi mismo le dices el paquete donde tiene que buscar las interfaces para hacer las implementaciones que aunque 
uno lo puede hacer y decirle donde estan pero es mejor que ellos lo hagan.
@EnableSpringDataWebSupport permite inyectar una serie de elementos como el paginado, el sorteo y bueno no se que mas.
de todas maneras voy a enviarte la documentacion de Spring Data JPA
 */
@Configuration
@EnableWebMvc
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "jpa")
//@ComponentScan(basePackages = "jpaDao")
@EnableSpringDataWebSupport
public class AppConfig {

    //Origen de Datos de aqui saldran los parametros de conexion
    @Bean
    public DriverManagerDataSource dataSource() {
//        DriverManagerDataSource dataSource = new DriverManagerDataSource("jdbc:postgresql://localhost:5432/usuario_rol");
//        dataSource.setDriverClassName("org.postgresql.Driver");
//        dataSource.setUsername("postgres");
//        dataSource.setPassword("postgres");

        //Si vas a utilizar SQLite
        DriverManagerDataSource dataSource = new DriverManagerDataSource("jdbc:sqlite:clasePractica.db");
        dataSource.setDriverClassName("org.sqlite.JDBC");
        dataSource.setUsername("");
        dataSource.setPassword("");
        return dataSource;
    }

    //Esto es en caso de que desees usar una base de datos embebida
//    @Bean
//    public DataSource dataSource() {
//
//        // no need shutdown, EmbeddedDatabaseFactoryBean will take care of this
//        EmbeddedDatabaseBuilder builder = new EmbeddedDatabaseBuilder();
//        EmbeddedDatabase db = builder.setType(EmbeddedDatabaseType.HSQL).addScript("db/sql/usuario.sql").build();
//        return db;
//    }
    //Necesario Para cuando le dices a un metodo que es @Transactional Spring maneje las transcacciones por ti
    @Bean
    public PlatformTransactionManager transactionManager() {
        EntityManagerFactory factory = entityManagerFactory().getObject();
        return new JpaTransactionManager(factory);
    }

    //Con esto se inyecta el EntityManager con la Anotacion @PersistenceContext pero si utilizas Spring Data JPA esto se hace internamente;
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        //En este caso Hibernate Genera la Informacion de la base de datos.
        vendorAdapter.setGenerateDdl(Boolean.TRUE);
        //Log del SQL generado
        vendorAdapter.setShowSql(Boolean.FALSE);
        //Dialecto utilizado para las consultas
//        vendorAdapter.setDatabase(Database.POSTGRESQL);
        factory.setDataSource(dataSource());
        /* En caso de que utilices SQLite descomentas este y comentas la parte de Database*/
        Properties p = new Properties();
        p.put("hibernate.dialect", "db.sql.SQLiteDialect5");
        factory.setJpaProperties(p);
        factory.setJpaVendorAdapter(vendorAdapter);
        //Paquetes donde encontrar las anotaciones de las clases de JPA
        factory.setPackagesToScan("clases");
        factory.afterPropertiesSet();
        return factory;
    }

    @Bean
    public MapeadorObjetos mapeadorObjetos() {
        return new MapeadorObjetos();
    }

//    @PostConstruct
//    public void startDBManager() {
////        //hsqldb
//        DatabaseManagerSwing.main(new String[]{"--url", "jdbc:hsqldb:mem:testdb", "--user", "sa", "--password", ""});
////        //derby
////        DatabaseManagerSwing.main(new String[]{"--url", "jdbc:derby:memory:testdb", "--user", "", "--password", ""});
////        //h2
////        DatabaseManagerSwing.main(new String[] { "--url", "jdbc:h2:mem:testdb", "--user", "sa", "--password", "" });
//    }
}

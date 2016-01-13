/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package configuracion;

import javax.persistence.PersistenceContext;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {AplicacionContextoWeb.class, ConfiguracionWeb.class})
@WebAppConfiguration(value = "web")
@PersistenceContext
public class ConfiguracionAplicacionTest {

    private MockMvc mockMvc;

    public ConfiguracionAplicacionTest() {
    }

    @BeforeClass
    public static void setUpClass() {

    }

    @AfterClass
    public static void tearDownClass() {
    }

    @Before
    public void setUp() {

    }

    @After
    public void tearDown() {
    }

    @Test
    public void testGetRootConfigClasses() {
        System.out.println("getRootConfigClasses");
        ConfiguracionAplicacion instance = new ConfiguracionAplicacion();
        Class[] result = instance.getRootConfigClasses();
        Class[] expResult = result;
        assertArrayEquals(expResult, result);
        fail("The test case is a prototype.");
    }

//    @Test
//    public void testGetServletConfigClasses() {
//        System.out.println("getServletConfigClasses");
//        ConfiguracionAplicacion instance = new ConfiguracionAplicacion();
//        Class[] expResult = null;
//        Class[] result = instance.getServletConfigClasses();
//        assertArrayEquals(expResult, result);
//        fail("The test case is a prototype.");
//    }
//
//    @Test
//    public void testGetServletMappings() {
//        System.out.println("getServletMappings");
//        ConfiguracionAplicacion instance = new ConfiguracionAplicacion();
//        String[] expResult = null;
//        String[] result = instance.getServletMappings();
//        assertArrayEquals(expResult, result);
//        fail("The test case is a prototype.");
//    }
//
//    @Test
//    public void testGetServletFilters() {
//        System.out.println("getServletFilters");
//        ConfiguracionAplicacion instance = new ConfiguracionAplicacion();
//        Filter[] expResult = null;
//        Filter[] result = instance.getServletFilters();
//        assertArrayEquals(expResult, result);
//        fail("The test case is a prototype.");
//    }
//    @Test
//    public void testCustomizeRegistration() {
//        System.out.println("customizeRegistration");
//        ServletRegistration.Dynamic registration = null;
//        ConfiguracionAplicacion instance = new ConfiguracionAplicacion();
//        instance.customizeRegistration(registration);
//        fail("The test case is a prototype.");
//    }
}

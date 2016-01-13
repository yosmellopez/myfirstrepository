/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package testeo;

import configuracion.AplicacionContextoWeb;
import configuracion.ConfiguracionWeb;
import java.util.Date;
import modelo.Aspirante;
import modelo.DatosAspirante;
import modelo.ResumenExpediente;
import modelo.Rol;
import modelo.Usuario;
import org.hamcrest.CoreMatchers;
import org.hamcrest.core.Is;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.client.match.MockRestRequestMatchers;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import utiles.MapeadorObjetos;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration(value = "/web")
@ContextConfiguration(classes = {AplicacionContextoWeb.class, ConfiguracionWeb.class})
public class PruebaTest {

    @Autowired
    WebApplicationContext applicationContext;

//    @Autowired
//    @InjectMocks
//    UsuarioController controller;
    MockMvc mockMvc;

    @Autowired
    MapeadorObjetos mapeadorObjetos;

    public PruebaTest() {
    }

    @BeforeClass
    public static void setUpClass() {
        System.out.println("-----> SETUP <-----");
    }

    @AfterClass
    public static void tearDownClass() {
    }

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.webAppContextSetup(applicationContext).build();
    }

    @After
    public void tearDown() {
    }

    @Test
    public void prueba() throws Exception {
//        ModelAndView listarTraza = controller.listarTraza(0, 10);
//        Map<String, Object> model = listarTraza.getModel();
//        for (Map.Entry<String, Object> entry : model.entrySet()) {
//            Object value = entry.getValue();
//            if (value instanceof ArrayList) {
//                ArrayList<Traza> trazas = (ArrayList<Traza>) value;
//                for (Traza traza : trazas) {
//                    System.out.println(traza.getAccion());
//                }
//            }
//        }
//        Aspirante u = new Aspirante();
//        u.setApellidos("Hernandez Martinez");
//        u.setNombre("Pedro");
//        u.setCi(52123123112L);
//        u.setDireccion("Buena Vista");
//        u.setEdad(25);
//        u.setResumenExpediente(new ResumenExpediente());
//        u.setDatosAspirante(new DatosAspirante());
//        u.setSexo(Boolean.TRUE);
//        String contenido = mapeadorObjetos.writeValueAsString(u);
        ResultActions andExpect = mockMvc.perform(MockMvcRequestBuilders.post("/pdf/1/controlAspirante")
                .accept(MediaType.ALL).contentType(MediaType.APPLICATION_JSON_UTF8)/*.content(contenido)*/
                .param("start", "0").param("limit", "10"))
                .andExpect(MockMvcResultMatchers.status().isOk());
        MvcResult andReturn = andExpect.andReturn();
        System.out.println(andReturn.getResponse().getContentAsString());
    }
}

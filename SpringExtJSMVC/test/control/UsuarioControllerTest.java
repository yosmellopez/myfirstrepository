/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package control;

import config.AppConfig;
import config.ConfiguracionWeb;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

/**
 *
 * @author Postgrado
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = {AppConfig.class, ConfiguracionWeb.class})
public class UsuarioControllerTest {

    @Autowired
    WebApplicationContext applicationContext;

//    @Autowired
//    @InjectMocks
//    UsuarioController controller;
    MockMvc mockMvc;

    public UsuarioControllerTest() {
    }

    @BeforeClass
    public static void setUpClass() {
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
    public void testListarUsuario() throws Exception {
        String parametros = "{\"likeLnombre\":\"\",\"apellidos\":\"\",\"usuario\":\"\",\"contrasena\":\"\",\"rangoIfechaAcceso\":\"\",\"rangoFfechaAcceso\":\"\",\"departamento.facultad.sede.idSede\":\"\",\"departamento.facultad.idFacultad\":\"\",\"departamento.idDepartamento\":\"\",\"multipleMrol.idRol\":[1,2],\"joinJcursos.idCurso\":3}";
        ResultActions andExpect = mockMvc.perform(MockMvcRequestBuilders.get("/usuario.json")
                .accept(MediaType.ALL).contentType(MediaType.APPLICATION_JSON_UTF8).content(parametros)
                .param("page", "1").param("size", "10").param("sort", "usuario,apellidos,desc").param("parametros", parametros).param("dateFormat", "dd-MM-yyyy"))
                .andExpect(MockMvcResultMatchers.status().isOk());
        System.out.println(andExpect.andReturn().getResponse().getContentAsString());
    }

}

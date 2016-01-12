<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<div class="span1">
    <!--side bar-->
    <aside class="side-left">
        <ul class="sidebar">
            <li class="active first"> <!--always define class .first for first-child of li element sidebar left-->
                <a href="index.htm" title="dashboard">
                    <div class="helper-font-24">
                        <i class="icofont-home"></i>
                    </div>
                    <span class="sidebar-text">Inicio</span>
                </a>
            </li>

            <!-- Esta parte de aqui crea el menu de administracion-->
            
            <li>
                <a href="#" title="Administración">
                    <div class="badge badge-important">5</div>
                    <div class="helper-font-24">
                        <i class="icofont-edit"></i>
                    </div>
                    <span class="sidebar-text">Administración</span>
                </a>
                <ul class="sub-sidebar-form corner-top shadow-white">
                    <li>
                        <a href="usuarios.htm" title="Ver Usuarios" class="corner-all">
                            <i class="icofont-user"></i>
                            <span class="sidebar-text">Usuarios</span>
                        </a>
                    </li>
                    <li>
                        <a href="trazas.htm" title="Ver Trazas" class="corner-all">
                            <i class="icofont-book"></i>
                            <span class="sidebar-text">Trazas</span>
                        </a>
                    </li>
                    <li>
                        <a href="causas.htm" title="Ver Causas" class="corner-all">
                            <i class="icofont-book"></i>
                            <span class="sidebar-text">Causas</span>
                        </a>
                    </li>
                    <li>
                        <a href="especialidades.htm" title="Ver Especialidades" class="corner-all">
                            <i class="icofont-book"></i>
                            <span class="sidebar-text">Especialidades</span>
                        </a>
                    </li>
                    <li>
                        <a href="areasSalud.htm" title="Ver Especialidades" class="corner-all">
                            <i class="icofont-book"></i>
                            <span class="sidebar-text">Areas de Salud</span>
                        </a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" title="Gestión">
                    <div class="badge badge-important">5</div>
                    <div class="helper-font-24">
                        <i class="icofont-edit"></i>
                    </div>
                    <span class="sidebar-text">Gestión</span>
                </a>
                <ul class="sub-sidebar-form corner-top shadow-white">
                    <li>
                        <a href="listaEspera.htm" title="Ver Usuarios" class="corner-all">
                            <i class="icofont-user"></i>
                            <span class="sidebar-text">Lista de Espera</span>
                        </a>
                    </li>
                    <li>
                        <a href="operaciones.htm" title="Ver Trazas" class="corner-all">
                            <i class="icofont-book"></i>
                            <span class="sidebar-text">Operaciones</span>
                        </a>
                    </li>
                    <li>
                        <a href="recursos.htm" title="Ver Trazas" class="corner-all">
                            <i class="icofont-book"></i>
                            <span class="sidebar-text">Recursos</span>
                        </a>
                    </li>
                    <li>
                        <a href="pacientes.htm" title="Ver Pacientes" class="corner-all">
                            <i class="icofont-book"></i>
                            <span class="sidebar-text">Pacientes</span>
                        </a>
                    </li>
                    <li>
                        <a href="especialistas.htm" title="Ver Especialistas" class="corner-all">
                            <i class="icofont-book"></i>
                            <span class="sidebar-text">Especialistas</span>
                        </a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" title="charts">
                    <div class="helper-font-24">
                        <i class="icofont-bar-chart"></i>
                    </div>
                    <span class="sidebar-text">Reportes</span>
                </a>
                <ul class="sub-sidebar-form corner-top shadow-white">
                    <li>
                        <a href="listaEspera.htm" title="Ver Usuarios" class="corner-all">
                            <i class="icofont-user"></i>
                            <span class="sidebar-text">Lista de Espera</span>
                        </a>
                    </li>
                    <li>
                        <a href="operaciones.htm" title="Ver Trazas" class="corner-all">
                            <i class="icofont-book"></i>
                            <span class="sidebar-text">Operaciones</span>
                        </a>
                    </li>
                    <li>
                        <a href="recursos.htm" title="Ver Trazas" class="corner-all">
                            <i class="icofont-book"></i>
                            <span class="sidebar-text">Recursos</span>
                        </a>
                    </li>
                    <li>
                        <a href="pacientes.htm" title="Ver Pacientes" class="corner-all">
                            <i class="icofont-book"></i>
                            <span class="sidebar-text">Pacientes</span>
                        </a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" title="more">
                    <div class="badge badge-important">2</div>
                    <div class="helper-font-24">
                        <i class="icofont-user"></i>
                    </div>
                    <span class="sidebar-text">Usuario</span>
                </a>
                <ul class="sub-sidebar corner-top shadow-silver-dark">
                    <li>
                        <a href="perfil.htm" title="Perfil">
                            <div class="helper-font-24">
                                <i class="icofont-user"></i>
                            </div>
                            <span class="sidebar-text">Perfil</span>
                        </a>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <a href="salir.htm" title="invoice">
                            <div class="helper-font-24">
                                <i class="icon-off"></i>
                            </div>
                            <span class="sidebar-text">Salir</span>
                        </a>
                    </li>
                    <li class="divider"></li>
                </ul>
            </li>
        </ul>
    </aside><!--/side bar -->
</div>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<div class="nav-collapse" id="sidebar">
    <!-- BEGIN Navlist -->
    <ul class="nav nav-list">
        <!-- BEGIN Search Form -->
        <li>
            <form class="search-form" method="GET" target="#">
                <span class="search-pan">
                    <button type="submit">
                        <i class="icon-search"></i>
                    </button>
                    <input type="text" autocomplete="off" placeholder="Buscar ..." name="search">
                </span>
            </form>
        </li>
        <!-- END Search Form -->
        <li <c:if test="${pagina=='index'}">class="active"</c:if>>
                <a href="index.htm">
                    <i class="icon-home"></i>
                    <span>Inicio</span>
                </a>
            </li>
        <sec:authorize access="hasAuthority('Administrador')">
            <li <c:if test="${pagina=='usuario'||pagina=='traza'}">class="active"</c:if>>
                    <a class="dropdown-toggle" href="#">
                        <i class="icon-desktop"></i>
                        <span>Administración</span>
                        <b class="arrow icon-angle-right"></b>
                    </a>
                    <!-- BEGIN Submenu -->
                    <ul class="submenu">
                        <li>
                            <a href="<c:url value="/admin/usuario.htm"/>">
                            <i class="fa fa-user"></i>
                            <span>Usuarios</span>
                        </a>
                    </li>
                    <li>
                        <a href="<c:url value="/admin/traza.htm"/>">
                            <i class="icon-list"></i>
                            <span>Trazas</span>
                        </a>
                    </li>
                    <li>
                        <a href="<c:url value="/admin/nivelescolar.htm"/>">
                            <i class="icon-user-md"></i>
                            <span>Nivel Escolar</span>
                        </a>
                    </li>
                    <li>
                        <a href="<c:url value="/admin/integRev.htm"/>">
                            <i class="icon-user-md"></i>
                            <span>Integración Revolucionaria</span>
                        </a>
                    </li>
                </ul>
                <!-- END Submenu -->
            </li>
        </sec:authorize>
        <sec:authorize access="hasAnyAuthority('Psicologo','Tecnico')">
            <li <c:if test="${pagina=='centro_trabajo'}">class="active"</c:if>>
                    <a class="dropdown-toggle" href="#">
                        <i class="icon-edit"></i>
                        <span>Gestionar</span>
                        <b class="arrow icon-angle-right"></b>
                    </a>

                    <!-- BEGIN Submenu -->
                    <ul class="submenu">
                    <sec:authorize access="hasAuthority('Tecnico')">
                        <li>
                            <a href="<c:url value="/tecnico/centro_trabajo.htm"/>">
                                <i class="fa fa-shopping-cart"></i>
                                <span>Centro de Trabajo</span>
                            </a>
                        </li>

                        <li>
                            <a href="<c:url value="/tecnico/cronogramaCurso.htm"/>">
                                <i class="icon-calendar"></i>
                                <span>Cronograma Curso</span>
                            </a>
                        </li>
                    </sec:authorize>
                    <sec:authorize access="hasAuthority('Psicologo')">
                        <li>
                            <a href="<c:url value="/psicologo/aspirante.htm"/>">
                                <i class="icon-user-md"></i>
                                <span>Aspirante</span>
                            </a>
                        </li>
                    </sec:authorize>
                    <sec:authorize access="hasAuthority('Tecnico')">
                        <li>
                            <a href="<c:url value="/tecnico/controlAspirante.htm"/>">
                                <i class="icon-user-md"></i>
                                <span>Control de Aspirante</span>
                            </a>
                        </li>
                        <li>
                            <a href="<c:url value="/tecnico/entrevistaIndividual.htm"/>">
                                <i class="icon-user-md"></i>
                                <span>Entrevista Individual</span>
                            </a>
                        </li>
                        <li>
                            <a href="<c:url value="/tecnico/solicitud.htm"/>">
                                <i class="icon-user-md"></i>
                                <span>Solicitud del Aspirante</span>
                            </a>
                        </li>
                        <li>
                            <a href="<c:url value="/tecnico/resumenExpediente.htm"/>">
                                <i class="icon-user-md"></i>
                                <span>Resumen de Expediente</span>
                            </a>
                        </li>
                    </sec:authorize>
                    <sec:authorize access="hasAuthority('Psicologo')">
                        <li>
                            <a href="<c:url value="/psicologo/datosAspirante.htm"/>">
                                <i class="icon-user-md"></i>
                                <span>Datos del Aspirante</span>
                            </a>
                        </li>
                        <li>
                            <a href="<c:url value="/psicologo/resumenPsicometrico.htm"/>">
                                <i class="icon-user-md"></i>
                                <span>Resumen Psicométrico</span>
                            </a>
                        </li>
                        <li>
                            <a href="<c:url value="/psicologo/documentoAprobatorio.htm"/>">
                                <i class="icon-user-md"></i>
                                <span>Documento Aprobatorio</span>
                            </a>
                        </li>

                    </sec:authorize>
                </ul>
                <!-- END Submenu -->
            </li>
        </sec:authorize>
        <li>
            <a class="dropdown-toggle" href="#">
                <i class="icon-list"></i>
                <span>Reportes</span>
                <b class="arrow icon-angle-right"></b>
            </a>

            <!-- BEGIN Submenu -->
            <ul class="submenu">
                <li><a href="cronogramaCursoReporte.htm">Cronograma de Curso</a></li>
                <li><a href="table_advance.htm">Advance</a></li>
                <li><a href="table_dynamic.htm">Dynamic</a></li>
            </ul>
            <!-- END Submenu -->
        </li>
        <li>
            <a href="<c:url value="/${rol}/perfil.htm"/>">
                <i class="icon-user"></i>
                <span>Perfil</span>
            </a>
        </li>
        <li>
            <a href="<c:url value="/${rol}/perfil.htm"/>">
                <i class="icon-off"></i>
                <span>Cerrar Sesión</span>
            </a>
        </li>

    </ul>
    <!-- END Navlist -->

    <!-- BEGIN Sidebar Collapse Button -->
    <div class="visible-desktop" id="sidebar-collapse">
        <i class="icon-double-angle-left" id="expandido"></i>
    </div>
    <!-- END Sidebar Collapse Button -->
</div>
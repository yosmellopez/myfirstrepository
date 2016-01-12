<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<sec:authorize access="isAuthenticated()">
    <nav style="margin: auto auto; width: 1100px;" role="navigation" class="navbar navbar-default navbar-static-top">
        <ul class="nav navbar-top-links navbar-left">
            <li>
                <a href="<c:url value="/${role}/inicio.htm"/>">
                    <div>
                        <i class="fa fa-home fa-fw"></i> Inicio
                    </div>
                </a>
            </li>
            <!-- /.dropdown -->
            <sec:authorize access="hasRole('Administrador')">
                <li class="dropdown">
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                        <i class="fa fa-list-alt fa-fw"></i> Administración <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-tasks" style="width: 200px">
                        <li>
                            <a href="<c:url value="/admin/usuarios.htm"/>">
                                <div>
                                    <p>
                                        <i class="fa fa-fw fa-users"></i><strong>Lista de Secretarias</strong>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="<c:url value="/admin/trazas.htm"/>">
                                <div>
                                    <p>
                                        <i class="fa fa-fw fa-location-arrow "></i><strong>Lista de Trazas</strong>
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="<c:url value="/admin/provincias.htm"/>">
                                <div>
                                    <p>
                                        <i class="fa fa-fw fa-location-arrow "></i><strong>Lista de Provincias</strong>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <!-- /.dropdown-tasks -->
                </li>
            </sec:authorize>
            <sec:authorize access="hasRole('Secretaria')">
                <!-- /.dropdown -->
                <li class="dropdown">
                    <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                        <i class="glyphicon glyphicon-menu-hamburger "></i> Menú de Secretaria <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="<c:url value="/pdf/tarjetaPrueba/tarjetaPrueba"/>" target="new">
                                <i class="fa fa-comment fa-fw"></i> Reporte de Pacientes
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="<c:url value="/pdf/paciente/paciente"/>" target="new">
                                <i class="fa fa-twitter fa-fw"></i> Reporte de Pruebas
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="<c:url value="/${role}/estadisticaMensual.htm"/>">
                                <div>
                                    <i class="fa fa-envelope fa-fw"></i> Estadistica Mensual
                                </div>
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="<c:url value="/${role}/patologiaCuello.htm"/>">
                                <div>
                                    <i class="fa fa-envelope fa-fw"></i> Patología Cuello
                                </div>
                            </a>
                        </li>
                    </ul>
                    <!-- /.dropdown-alerts -->
                </li>
            </sec:authorize>
            <!-- /.dropdown -->
            <li class="dropdown">
                <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                    <i class="fa fa-user fa-fw"></i>
                    <span style="text-transform: capitalize;"><sec:authentication property="principal.usuario"/></span>
                    <i class="fa fa-caret-down"></i>
                </a>
                <ul class="dropdown-menu dropdown-user">
                    <li><a href="<c:url value="/${role}/perfil.htm"/>"><i class="fa fa-user fa-fw"></i> Perfil de Secretaria</a></li>
                    <li><a href="#"><i class="fa fa-gear fa-fw"></i> Configuración</a>
                    </li>
                    <li class="divider"></li>
                    <li><a href="<c:url value="/salir.htm"/>"><i class="fa fa-sign-out fa-fw"></i> Salir</a>
                    </li>
                </ul>
                <!-- /.dropdown-user -->
            </li>
            <!-- /.dropdown -->
        </ul>
    </nav>
</sec:authorize>
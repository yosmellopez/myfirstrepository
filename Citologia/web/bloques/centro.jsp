<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<div class="overlay"></div>			
<div class="top-bar">
    <nav class="navbar navbar-default top-bar right-bar-toggle">
        <div class="menu-bar-mobile" id="open-left"><i class="ti-menu"></i>

        </div>
        <h3 class="logo-holder pull-left" style="color: white;">
            <p class="logo">Departamento Citohistopatología</p>
        </h3>
        <ul class="nav navbar-nav navbar-right top-elements">

            <sec:authorize access="hasRole('Administrador')">
                <li class="piluku-dropdown dropdown" >
                    <a href="#" title="Administración" class="dropdown-toggle right-bar-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="ion-ios-locked icon-notification fa-1x"></i></a>
                    <ul class="dropdown-menu dropdown-piluku-menu animated zoomIn wow notification-drop neat_drop dropdown-right" data-wow-duration="300ms" role="menu">
                        <li>
                            <a href="<c:url value="/admin/usuarios.htm"/>">
                                <div class="hexagon danger">
                                    <span><i class="ion-android-contacts"></i></span>
                                </div>
                                <span class="text_info"> Lista de Usuarios</span>
                            </a>
                        </li>
                        <li>
                            <a href="<c:url value="/admin/trazas.htm"/>">
                                <div class="hexagon success">
                                    <span><i class="ion-clipboard"></i></span>
                                </div>
                                <span class="text_info"> Lista de Trazas</span>
                            </a>
                        </li>
                        <li>
                            <a href="<c:url value="/${role}/consultorios.htm"/>">
                                <div class="hexagon warning">
                                    <span><i class="fa fa-hospital-o"></i></span>
                                </div>
                                <span class="text_info"> Consultorios</span>
                            </a>
                        </li>
                        <li>
                            <a href="<c:url value="/${role}/provincias.htm"/>">
                                <div class="hexagon info">
                                    <span><i class="ion-ios-location"></i></span>
                                </div>
                                <span class="text_info"> Lista de Provincias</span>
                            </a>
                        </li>
                        <li>
                            <a href="<c:url value="/${role}/tecnicos.htm"/>">
                                <div class="hexagon">
                                    <span><i class="ion-android-people"></i></span>
                                </div>
                                <span class="text_info"> Responsables de Muestra</span>
                            </a>
                        </li>
                        <li>
                            <a href="<c:url value="/${role}/salas.htm"/>">
                                <div class="hexagon success">
                                    <span><i class="fa fa-medkit"></i></span>
                                </div>
                                <span class="text_info"> Salas</span>
                            </a>
                        </li>

                    </ul>
                </li>
            </sec:authorize>
            <sec:authorize access="hasRole('Secretaria')">
                <li class="piluku-dropdown dropdown" >
                    <a href="#" title="Menú Secretaría" class="dropdown-toggle right-bar-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-bars fa-1x"></i></a>
                    <ul class="dropdown-menu dropdown-piluku-menu animated zoomIn wow notification-drop neat_drop dropdown-right" data-wow-duration="300ms" role="menu">
                        <li>
                            <a href="<c:url value="/${role}/pacientes.htm"/>">
                                <div class="hexagon warning">
                                    <span><i class="fa fa-wheelchair"></i></span>
                                </div>
                                <span class="text_info"> Lista de Pacientes</span>
                            </a>
                        </li>
                        <li>
                            <a href="<c:url value="/${role}/pruebas.htm"/>">
                                <div class="hexagon success">
                                    <span><i class="ion-android-clipboard"></i></span>
                                </div>
                                <span class="text_info"> Tarjetas de Pruebas</span>
                            </a>
                        </li>
                        <li>
                            <a href="<c:url value="/${role}/ingresos.htm"/>">
                                <div class="hexagon danger">
                                    <span><i class="fa fa-ambulance"></i></span>
                                </div>
                                <span class="text_info"> Lista de Ingresos</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="piluku-dropdown dropdown" >
                    <a href="#" title="Administración" class="dropdown-toggle right-bar-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-area-chart fa-1x"></i></a>
                    <ul class="dropdown-menu dropdown-piluku-menu animated zoomIn wow notification-drop neat_drop dropdown-right" data-wow-duration="300ms" role="menu">
                        <li>
                            <a href="<c:url value="/${role}/reportePaciente.htm"/>">
                                <div class="hexagon danger">
                                    <span><i class="ion-android-contacts"></i></span>
                                </div>
                                <span class="text_info"> Reporte de Pacientes</span>
                            </a>
                        </li>
                        <li>
                            <a href="<c:url value="/${role}/reportePruebas.htm"/>">
                                <div class="hexagon success">
                                    <span><i class="ion-clipboard"></i></span>
                                </div>
                                <span class="text_info"> Reporte de Pruebas</span>
                            </a>
                        </li>
                        <li>
                            <a href="<c:url value="/${role}/reportePaciente.htm"/>">
                                <div class="hexagon warning">
                                    <span><i class="fa fa-hospital-o"></i></span>
                                </div>
                                <span class="text_info"> Reporte de Ingresos</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="piluku-dropdown dropdown" >
                    <a href="#" title="Menú Secretaría" class="dropdown-toggle right-bar-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="icon ti-bar-chart fa-1x"></i></a>
                    <ul class="dropdown-menu dropdown-piluku-menu animated zoomIn wow notification-drop neat_drop dropdown-right" data-wow-duration="300ms" role="menu">
                        <li>
                            <a href="<c:url value="/${role}/estadisticaMensual.htm"/>">
                                <div class="hexagon warning">
                                    <span><i class="fa fa-bar-chart"></i></span>
                                </div>
                                <span class="text_info"> Estadística Mensual</span>
                            </a>
                        </li>
                        <li>
                            <a href="<c:url value="/${role}/patologiaCuello.htm"/>">
                                <div class="hexagon success">
                                    <span><i class="fa fa-line-chart"></i></span>
                                </div>
                                <span class="text_info"> Patología Cuello</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </sec:authorize>
            <li class="piluku-dropdown dropdown">
                <!-- @todo Change design here, its bit of odd or not upto usable -->

                <a href="#" class="dropdown-toggle avatar_width right-bar-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span class="avatar-holder"><i class="fa fa-user fa-2x"></i></span><span class="avatar_info"><sec:authentication property="principal.usuario"/></span><span class="drop-icon"><!-- <i class="ion ion-chevron-down"></i> --></span></a>
                <ul class="dropdown-menu dropdown-piluku-menu  animated zoomIn wow avatar_drop neat_drop dropdown-right" data-wow-duration="300ms" role="menu">
                    <li>
                        <a href="<c:url value="/${role}/perfil.htm"/>"> <i class="ion-android-create"></i>Editar Perfil</a>
                    </li>
                    <li>
                        <a href="<c:url value="/ayuda.pdf"/>"> <i class="ion-help"></i>Ayuda</a>
                    </li>
                    <li>
                        <a href="<c:url value="/salir.htm"/>" class="logout_button"><i class="ion-power"></i>Cerrar Sesión</a>
                    </li>   
                </ul>
            </li>
        </ul>
    </nav>
</div>
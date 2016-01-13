<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<sec:authorize access="isAuthenticated()">
    <div class="left-bar ">
        <div class="admin-logo">
            <!-- logo-holder -->
            <h1 style="font-size: 45px;font-weight: bold;position: absolute;top: -13px;color: #0C82DF;display: block;border-radius: 7px;background-color: white;padding: 3px;">DC</h1>
            <h1 id="h1t" style="font-size: 45px;font-weight: bold;position: absolute;left: 90px;top: -13px;color: white;display: block;border-radius: 7px;background-color: #009966;z-index: 900;padding: 3px;">LTU</h1>
            <a href="javascript:recoger()" class="menu-bar pull-right"><i class="ti-menu"></i></a>
            <script>
                function recoger() {
                    elem = document.getElementById('h1t');
                    elem.style.visibility = elem.style.visibility === 'hidden' ? 'visible' : 'hidden';
                }
            </script>
        </div>
        <!-- admin-logo -->
        <ul class="list-unstyled menu-parent" id="mainMenu">
            <li class="submenu <c:if test="${pagina=='index'}">current</c:if>">
                <a href="<c:url value="/${role}/index.htm"/>" class="current waves-effect waves-light">
                    <i class="icon ti-home"></i>
                    <span class="text ">Inicio</span>
                </a>
            </li>
            <sec:authorize access="hasRole('Administrador')">
                <li class="submenu <c:if test="${pagina=='usuarios'||pagina=='trazas'||pagina=='consultorios'||pagina=='provincias'||pagina=='tecnicos'||pagina=='salas'}">current</c:if>">
                        <a class="waves-effect waves-light" href="#layouts">
                            <i class="icon ti-lock"></i>
                            <span class="text">Administración</span>
                            <i class="chevron ti-angle-right"></i>
                        </a>
                        <ul class="list-unstyled">
                            <li><a href="<c:url value="/admin/usuarios.htm"/>"><i class="ion-android-contacts"></i>Lista de Usuarios</a></li>
                        <li><a href="<c:url value="/admin/trazas.htm"/>"><i class="ion-android-clipboard"></i>Lista de Trazas</a></li>
                        <li><a href="<c:url value="/${role}/consultorios.htm"/>"><i class="fa fa-hospital-o"></i>Consultorios</a></li>					
                        <li><a href="<c:url value="/${role}/provincias.htm"/>"><i class="fa fa-map-marker"></i>Lista de Provincias</a></li>
                        <li><a href="<c:url value="/${role}/tecnicos.htm"/>"><i class="ion-person-stalker"></i>Responsables de Muestra</a></li>
                        <li><a href="<c:url value="/${role}/salas.htm"/>"><i class="fa fa-medkit"></i>Salas</a></li>
                    </ul>
                </li>
            </sec:authorize>
            <sec:authorize access="hasAnyRole('Secretaria')">
                <li class="submenu <c:if test="${pagina=='pacientes'||pagina=='pruebas'||pagina=='ingresos'}">current</c:if>">
                        <a class="waves-effect waves-light" href="#piluku_premium">
                            <i class="fa fa-bars"></i>
                            <span class="text">Menú Secretaria</span>
                            <i class="chevron ti-angle-right"></i>
                        </a>
                        <ul class="list-unstyled" id="piluku_premium">
                            <li><a href="<c:url value="/${role}/pacientes.htm"/>"><i class="fa fa-wheelchair"></i>Lista de Pacientes</a></li>
                        <li><a href="<c:url value="/${role}/pruebas.htm"/>"><i class="ion-android-clipboard"></i>Tarjetas de Pruebas</a></li>
                        <li><a href="<c:url value="/${role}/ingresos.htm"/>"><i class="fa fa-ambulance"></i>Lista de Ingresos</a></li>
                    </ul>
                </li>
            </sec:authorize>
            <sec:authorize access="hasAnyRole('Secretaria')">
                <li class="submenu">
                    <a class="waves-effect waves-light" href="#forms_elements">
                        <i class="icon ti-book"></i>
                        <span class="text">Reportes Estadísticos</span>
                        <i class="chevron ti-angle-right"></i>
                    </a>
                    <ul class="list-unstyled">
                        <li><a href="<c:url value="/${role}/reportePaciente.htm"/>"><i class="fa fa-list-alt"></i>Reporte de Pacientes</a></li>
                        <li><a href="<c:url value="/${role}/reportePruebas.htm"/>"><i class="fa fa-list-ul"></i>Reporte de Pruebas</a></li>
                        <li><a href="<c:url value="/${role}/reportePaciente.htm"/>"><i class="fa fa-list-ol"></i>Reporte de Ingresos</a></li>
                    </ul>
                </li>
                <li class="submenu">
                    <a class="waves-effect waves-light" href="#charts">
                        <i class="icon ti-bar-chart-alt"></i>
                        <span class="text">Reportes Dinámicos</span>
                        <i class="chevron ti-angle-right"></i>
                    </a>
                    <ul class="list-unstyled" id="charts">
                        <li><a href="<c:url value="/${role}/estadisticaMensual.htm"/>"><i class="fa fa-bar-chart"></i>Estadística Mensual</a></li>
                        <li><a href="<c:url value="/${role}/patologiaCuello.htm"/>"><i class="fa fa-line-chart"></i>Patología Cuello</a></li>
                    </ul>
                </li>
            </sec:authorize>
            <li class="submenu">
                <a class="waves-effect waves-light" href="<c:url value="/${role}/perfil.htm"/>">
                    <i class="icon ti-user"></i>
                    <span class="text">Perfil</span>
                </a>
            </li>
            <li class="submenu">
                <a href="<c:url value="/salir.htm"/>" class="waves-effect waves-light logout_button"><i class="ion-power"></i>Cerrar Sesión</a>
            </li>
        </ul>
    </div>
</sec:authorize>
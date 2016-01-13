<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="f"%>
<%@taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<jsp:useBean class="java.util.Date" id="now"></jsp:useBean>
<sec:authentication property="principal" var="usuario"/>
    <div class="navbar" id="navbar">
        <div class="navbar-inner">
            <div class="container-fluid">
                <!-- BEGIN Brand -->
                <a class="brand" href="#">
                    <small>
                        <i class="icon-desktop"></i>
                        Sistema de Gestión de Información
                    </small>
                </a>
                <a data-target=".nav-collapse" data-toggle="collapse" class="btn-navbar collapsed" href="#">
                    <i class="icon-reorder"></i>
                </a>
                <ul class="nav flaty-nav pull-right">
                    <li class="hidden-phone">
                        <a href="#" title="Administración" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="icon-desktop"></i>
                        </a>

                        <!-- BEGIN Notifications Dropdown -->
                        <ul class="dropdown-navbar dropdown-menu animated fadeIn" data-wow-duration="200ms" role="menu">
                            <li class="nav-header">
                                <i class="icon-warning-sign"></i>
                                Administración
                            </li>

                            <li class="notify">
                                <a href="#">
                                    <i class="icon-comment orange"></i>
                                    <p>Usuarios</p>
                                    <span class="badge badge-warning">4</span>
                                </a>
                            </li>
                            <li class="notify">
                                <a href="#">
                                    <i class="icon-twitter blue"></i>
                                    <p>Trazas</p>
                                    <span class="badge badge-info">7</span>
                                </a>
                            </li>
                        </ul>
                        <!-- END Notifications Dropdown -->
                    </li>
                    <li class="hidden-phone">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="icon-edit"></i>
                        </a>

                        <!-- BEGIN Notifications Dropdown -->
                        <ul class="dropdown-navbar dropdown-menu animated fadeIn" data-wow-duration="200ms" role="menu">
                            <li class="nav-header">
                                <i class="icon-warning-sign"></i>
                                Gestión
                            </li>

                            <li class="notify">
                                <a href="#">
                                    <i class="icon-comment orange"></i>
                                    <p>New Comments</p>
                                    <span class="badge badge-warning">4</span>
                                </a>
                            </li>

                            <li class="notify">
                                <a href="#">
                                    <i class="icon-twitter blue"></i>
                                    <p>New Twitter followers</p>
                                    <span class="badge badge-info">7</span>
                                </a>
                            </li>

                            <li class="notify">
                                <a href="#">
                                    <img alt="Alex" src="<c:url value="/img/demo/avatar/avatar2.jpg"/>">
                                    <p>David would like to become moderator.</p>
                                </a>
                            </li>

                            <li class="notify">
                                <a href="#">
                                    <i class="icon-bug pink"></i>
                                    <p>New bug in program!</p>
                                </a>
                            </li>

                            <li class="notify">
                                <a href="#">
                                    <i class="icon-shopping-cart green"></i>
                                    <p>You have some new orders</p>
                                    <span class="badge badge-success">+10</span>
                                </a>
                            </li>

                            <li class="more">
                                <a href="#">See all notifications</a>
                            </li>
                        </ul>
                        <!-- END Notifications Dropdown -->
                    </li>
                    <li class="hidden-phone">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="icon-list"></i>
                        </a>

                        <!-- BEGIN Notifications Dropdown -->
                        <ul class="dropdown-navbar dropdown-menu animated fadeIn" data-wow-duration="200ms" role="menu">
                            <li class="nav-header">
                                <i class="icon-warning-sign"></i>
                                Reportes
                            </li>

                            <li class="notify">
                                <a href="#">
                                    <i class="icon-comment orange"></i>
                                    <p>New Comments</p>
                                    <span class="badge badge-warning">4</span>
                                </a>
                            </li>

                            <li class="notify">
                                <a href="#">
                                    <i class="icon-twitter blue"></i>
                                    <p>New Twitter followers</p>
                                    <span class="badge badge-info">7</span>
                                </a>
                            </li>

                            <li class="notify">
                                <a href="#">
                                    <img alt="Alex" src="<c:url value="/img/demo/avatar/avatar2.jpg"/>">
                                    <p>David would like to become moderator.</p>
                                </a>
                            </li>

                            <li class="notify">
                                <a href="#">
                                    <i class="icon-bug pink"></i>
                                    <p>New bug in program!</p>
                                </a>
                            </li>

                            <li class="notify">
                                <a href="#">
                                    <i class="icon-shopping-cart green"></i>
                                    <p>You have some new orders</p>
                                    <span class="badge badge-success">+10</span>
                                </a>
                            </li>

                            <li class="more">
                                <a href="#">See all notifications</a>
                            </li>
                        </ul>
                        <!-- END Notifications Dropdown -->
                    </li>
                    <li class="user-profile">
                        <a class="user-menu dropdown-toggle" href="#" data-toggle="dropdown">
                            <!--<img alt="Penny's Photo" src="<c:url value="/img/demo/avatar/user.png"/>" class="nav-user-photo">-->
                            <i class="fa fa-user nav-user-photo"></i>
                            <span id="user_info" class="hidden-phone" style="text-transform: capitalize;">
                                ${usuario.usuario}
                            </span>
                            <i class="icon-caret-down"></i>
                        </a>

                        <!-- BEGIN User Dropdown -->
                        
                        <ul id="user_menu" class="dropdown-navbar dropdown-menu animated fadeIn" data-wow-duration="200ms" role="menu">
                            <li class="nav-header">
                                <i class="icon-time"></i>
                                Sesión Iniciada Desde <f:formatDate value="${usuario.ultimoInicio}" pattern="dd/MM/yyyy h:m a"/>
                        </li>

                        <li>
                            <a href="#">
                                <i class="icon-cog"></i>
                                Configuración de Cuenta
                            </a>
                        </li>

                        <li>
                            <a href="perfil.htm">
                                <i class="icon-user"></i>
                                Editar Perfil
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <i class="icon-question"></i>
                                Ayuda
                            </a>
                        </li>

                        <li class="divider visible-phone"></li>

                        <li class="visible-phone">
                            <a href="#">
                                <i class="icon-tasks"></i>
                                Tasks
                                <span class="badge badge-warning">4</span>
                            </a>
                        </li>
                        <li class="visible-phone">
                            <a href="#">
                                <i class="icon-bell-alt"></i>
                                Notifications
                                <span class="badge badge-important">8</span>
                            </a>
                        </li>
                        <li class="visible-phone">
                            <a href="#">
                                <i class="icon-envelope"></i>
                                Messages
                                <span class="badge badge-success">5</span>
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="<c:url value="/salir.htm"/>">
                                <i class="icon-off"></i>
                                Cerrar Sesión
                            </a>
                        </li>
                    </ul>
                    <!-- BEGIN User Dropdown -->
                </li>
                <!-- END Button User -->
            </ul>
            <!-- END Navbar Buttons -->
        </div><!--/.container-fluid-->
    </div><!--/.navbar-inner-->
</div>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<header class="header">
    <!--nav bar helper-->
    <div class="navbar-helper">
        <div class="row-fluid">
            <!--panel site-name-->
            <div class="span8">
                <div class="panel-sitename">
                    <h2><a href="index.htm"><span class="color-teal">Sistema de Control </span>de Pacientes</a></h2>
                </div>
            </div>
            <!--/panel name-->

            <div class="span4">
                <!--panel button ext-->
                <div class="panel-ext">
                    <div class="btn-group">
                        <!--notification-->
                        <ul class="dropdown-menu dropdown-notification">
                            <li class="dropdown-header grd-white"><a href="#">View All Notifications</a></li>
                            <li class="new">
                                <a href="#">
                                    <div class="notification">John Doe commented on a post</div>
                                    <div class="media">
                                        <img class="media-object pull-left" data-src="recursos/js/holder.js/64x64" />
                                        <div class="media-body">
                                            <h4 class="media-heading">Lorem ipsum <small class="helper-font-small"> john doe</small></h4>
                                            <p>Raw denim you probably haven't heard of them jean shorts Austin.</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li class="new">
                                <a href="#">
                                    <div class="notification">Request new order</div>
                                    <div class="media">
                                        <img class="media-object pull-left" data-src="recursos/js/holder.js/64x64" />
                                        <div class="media-body">
                                            <h4 class="media-heading">Tortor dapibus</h4>
                                            <p>Vegan fanny pack odio cillum wes anderson 8-bit.</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li class="new">
                                <a href="#">
                                    <div class="notification">Request new order</div>
                                    <div class="media">
                                        <img class="media-object pull-left" data-src="recursos/js/holder.js/64x64" />
                                        <div class="media-body">
                                            <h4 class="media-heading">Lacinia non</h4>
                                            <p>Messenger bag gentrify pitchfork tattooed craft beer.</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="notification">John Doe commented on a post</div>
                                    <div class="media">
                                        <img class="media-object pull-left" data-src="recursos/js/holder.js/64x64" />
                                        <div class="media-body">
                                            <h4 class="media-heading">Lorem ipsum <small class="helper-font-small"> john doe</small></h4>
                                            <p>Raw denim you probably haven't heard of them jean shorts Austin.</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="notification">Request new order</div>
                                    <div class="media">
                                        <img class="media-object pull-left" data-src="recursos/js/holder.js/64x64" />
                                        <div class="media-body">
                                            <h4 class="media-heading">Tortor dapibus</h4>
                                            <p>Vegan fanny pack odio cillum wes anderson 8-bit.</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="notification">Request new order</div>
                                    <div class="media">
                                        <img class="media-object pull-left" data-src="recursos/js/holder.js/64x64" />
                                        <div class="media-body">
                                            <h4 class="media-heading">Lacinia non</h4>
                                            <p>Messenger bag gentrify pitchfork tattooed craft beer.</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <!-- <li class="dropdown-footer"><a href=""></a></li> -->
                        </ul><!--notification-->
                    </div>
                    <div class="btn-group">
                        <a class="btn btn-inverse btn-small dropdown-toggle" data-toggle="dropdown" href="#">
                            Menú Principal
                        </a>
                        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                            <li class="dropdown-submenu">
                                <a tabindex="-1" href="#">Administración</a>
                                <ul class="dropdown-menu">
                                    <li><a tabindex="-1" href="pricing.html">Usuarios</a></li>
                                    <li><a tabindex="-1" href="bonus-page/resume/index.html">Trazas</a></li>
                                    <li><a tabindex="-1" href="bonus-page/resume/index.html">Causas</a></li>
                                    <li><a tabindex="-1" href="bonus-page/resume/index.html">Especialidades</a></li>
                                    <li><a tabindex="-1" href="bonus-page/resume/index.html">Areas de Salud</a></li>
                                </ul>
                            </li>
                            <li class="divider"></li>
                            <li class="dropdown-submenu">
                                <a tabindex="-1" href="#">Gestión</a>
                                <ul class="dropdown-menu">
                                    <li><a tabindex="-1" href="pricing.html">Lista de Espera</a></li>
                                    <li><a tabindex="-1" href="bonus-page/resume/index.html">Operaciones</a></li>
                                    <li><a tabindex="-1" href="bonus-page/resume/index.html">Recursos</a></li>
                                    <li><a tabindex="-1" href="bonus-page/resume/index.html">Pacientes</a></li>
                                </ul>
                            </li>
                            <li class="divider"></li>
                            <li class="dropdown-submenu">
                                <a tabindex="-1" href="#">Reportes</a>
                                <ul class="dropdown-menu">
                                    <li><a tabindex="-1" href="403.html">Error 403</a></li>
                                    <li><a tabindex="-1" href="404.html">Error 404</a></li>
                                    <li><a tabindex="-1" href="405.html">Error 405</a></li>
                                    <li><a tabindex="-1" href="500.html">Error 500</a></li>
                                    <li><a tabindex="-1" href="503.html">Error 503</a></li>
                                    <li><a tabindex="-1" href="under-construction.html">Under Construction</a></li>
                                    <li><a tabindex="-1" href="coming-son.html">Coming Son</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="btn-group user-group">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            <img class="corner-all" align="middle" src="recursos/img/user-thumb.jpg" title="John Doe" alt="john doe" /> <!--this for display on PC device-->
                            <button class="btn btn-small btn-inverse">John Doe</button> <!--this for display on tablet and phone device-->
                        </a>
                        <ul class="dropdown-menu dropdown-user" role="menu" aria-labelledby="dLabel">
                            <li>
                                <div class="media">
                                    <div class="media-body description">
                                        <label>Nombre de Usuario</label><p><strong><sec:authentication property="principal.usuario"/></strong></p>
                                        <label>Nombre y Apellidos</label><p><strong><sec:authentication property="principal.nombreCompleto"/></strong></p>
                                    </div>
                                </div>
                            </li>
                            <li class="dropdown-footer">
                                <div>
                                    <a class="btn btn-small pull-right" href="salir.htm">Cerrar Sesión</a>
                                    <a class="btn btn-small" href="perfil.htm#">Ver Perfil</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div><!--panel button ext-->
            </div>
        </div>
    </div><!--/nav bar helper-->
</header>
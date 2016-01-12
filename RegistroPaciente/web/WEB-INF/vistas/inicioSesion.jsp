<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@taglib prefix="seg" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Iniciar Sesion</title>
        <link href="recursos/css/bootstrapLogin.css" rel="stylesheet" />
        <link href="recursos/css/bootstrap-responsive.css" rel="stylesheet" />
        <link href="recursos/css/stilearn.css" rel="stylesheet" />
        <link href="recursos/css/stilearn-responsive.css" rel="stylesheet" />
        <link href="recursos/css/stilearn-helper.css" rel="stylesheet" />
        <link href="recursos/css/stilearn-icon.css" rel="stylesheet" />
        <link href="recursos/css/font-awesome.css" rel="stylesheet" />
        <link href="recursos/css/animate.css" rel="stylesheet" />
        <link href="recursos/css/uniform.default.css" rel="stylesheet" />
        <link href="recursos/css/select2.css" rel="stylesheet" />
        <!--<link href="recursos/css/bootstrap-wysihtml5.css" rel="stylesheet" />-->
        <link rel="stylesheet" type="text/css" href="recursos/ext-theme-gray/ext-theme-gray-all.css">
        <script type="text/javascript" src="recursos/ext-all-dev.js"></script>
        <script src="recursos/js/jquery.js"></script>
        <script src="recursos/js/jquery-ui.min.js"></script>
        <script src="recursos/js/bootstrap.js"></script>
        <script src="recursos/js/uniform/jquery.uniform.js"></script>
        <script src="recursos/js/peity/jquery.peity.js"></script>
        <script src="recursos/js/select2/select2.js"></script>
        <script src="recursos/js/knob/jquery.knob.js"></script>
        <script src="recursos/js/wysihtml5/wysihtml5-0.3.0.js"></script>
        <script src="recursos/js/wysihtml5/bootstrap-wysihtml5.js"></script>
        <script src="recursos/js/calendar/fullcalendar.js"></script> 
        <!-- required stilearn template js, for full feature-->
        <script src="recursos/js/holder.js"></script>
        <script src="recursos/js/stilearn-base.js"></script>
        <script src="inicioSesion.js"></script>
        <script src="sha512.js"></script>
    </head>

    <body>
        <!-- section header -->
    <header class="header affix" data-spy="affix" data-offset-top="0">
        <!--nav bar helper-->
        <div class="navbar-helper">
            <div class="row-fluid">
                <!--panel site-name-->
                <div class="span8">
                    <div class="panel-sitename">
                        <h2><a href="index.html"><span class="color-teal">Sistema de Control </span>de Pacientes</a></h2>
                    </div>
                </div>
                <!--/panel name-->
            </div>
        </div><!--/nav bar helper-->
    </header>

    <!-- section content -->
    <section class="section">
        <div class="container">
            <div class="signin-form row-fluid">
                <!--Sign In-->
                <div class="span5 offset1" id="loginComponent">
                    <div class="box corner-all">
                        <div class="box-header grd-teal color-white corner-top">
                            <span>Inicio de Sesión:</span>
                        </div>
                        <div class="box-body bg-white">
                            <form id="sign-in" method="post" novalidate="novalidate">
                                <div class="control-group">
                                    <label class="control-label">Nombre de Usuario ${sessionScope.ultimoNombreUsuario}</label>
                                    <div class="controls">
                                        <input type="text" required value="${sessionScope.ultimoNombreUsuario}" class="input-block-level" data-validate="{required: true, messages:{required:'Por favor introduzca nombre de usuario'}}" name="login_username" id="login_username" autocomplete="off">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">Contraseña</label>
                                    <div class="controls">
                                        <input type="password" class="input-block-level text-error helper-font-small" data-validate="{required: true, messages:{required:'Por favor introduzca contraseña'}}" name="login_password" id="login_password" autocomplete="off"><label for="login_password" generated="true" class="text-error helper-font-small">Por favor introduzca contraseña</label>
                                    </div>
                                </div>
                                <c:if test="${param.error=='true'}">
                                    <div class="control-group">
                                        <label class="control-label" style="color: red;">${sessionScope.mensajeExcepcion}</label>
                                    </div>
                                </c:if>
                                <div class="form-actions">
                                    <input type="button" id="iniciar_sesion" class="btn btn-block btn-large btn-primary" value="Iniciar Sesión">
                                </div>
                            </form>
                        </div>
                    </div>
                </div><!--/Sign In-->
                <!--Sign Up-->
            </div><!-- /row -->
        </div><!-- /container -->

        <!-- modal recover -->
        <div id="modal-recover" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="modal-recoverLabel" aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h3 id="modal-recoverLabel">Reset password <small>Username Or Email Address</small></h3>
            </div>
            <div class="modal-body">
                <form id="form-recover" method="post" novalidate="novalidate">
                    <div class="control-group">
                        <div class="controls">
                            <input type="text" data-validate="{required: true, email:true, messages:{required:'Please enter field email', email:'Please enter a valid email address'}}" name="recover">
                            <p class="help-block helper-font-small">Enter your username or email address and we will send you a link to reset your password.</p>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
                <input type="submit" form="form-recover" class="btn btn-primary" value="Send reset link">
            </div>
        </div><!-- /modal recover-->
    </section>

    <!-- javascript
    ================================================== -->
    <script src="recursos/js/jquery.js"></script>
    <script src="recursos/js/bootstrap.js"></script>
    <script src="recursos/js/uniform/jquery.uniform.js"></script>

    <script src="recursos/js/validate/jquery.metadata.js"></script>
    <script src="recursos/js/validate/jquery.validate.js"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            // try your js

            // uniform
            $('[data-form=uniform]').uniform();

            // validate
            $('#sign-in').validate();
            $('#sign-up').validate();
            $('#form-recover').validate();
        })
    </script>


</body>
</html>

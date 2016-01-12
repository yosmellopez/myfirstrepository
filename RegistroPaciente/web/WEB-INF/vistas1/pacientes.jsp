<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="s" uri="http://www.springframework.org/tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Gestion de Usuarios</title>
        <c:import url="/bloques/assets.jsp"/>
        <script type="text/javascript" src="appPaciente.js"></script>
    </head>

    <body>
        <c:import url="/bloques/encabezado.jsp"/>
    <section class="section">
        <div class="row-fluid">
            <c:import url="/bloques/menuLateral.jsp"/>
            <div class="span11">
                <!-- content -->
                <div class="content">
                    <!-- content-header -->
                    <div class="content-header">
                        <h2><i class="icofont-home"></i> Pacientes <small>welcome to stilearn</small></h2>
                    </div><!-- /content-header -->

                    <!-- content-breadcrumb -->
                    <div class="content-breadcrumb">
                        <ul class="breadcrumb">
                            <li><a href="index.htm#"><i class="icofont-home"></i> Inicio</a> <span class="divider">&rsaquo;</span></li>
                            <li class="active">Lista de Operaciones</li>
                        </ul><!--/breadcrumb-->
                    </div><!-- /content-breadcrumb -->

                    <!-- content-body -->
                    <div class="content-body">
                        <div class="row-fluid">
                            <!-- tab resume update -->
                            <div class="span12">
                                <div class="box corner-all">
                                    <div class="box-header corner-top grd-white">
                                        <div class="header-control">
                                            <a data-box="collapse"><i class="icofont-caret-up"></i></a>
                                            <a data-box="close" data-hide="rotateOutDownRight">&times;</a>
                                        </div>
                                        <span><i class="icofont-user"></i> Listado de Operaciones</span>
                                    </div>
                                    <div class="box-body">
                                        <div id="centro" style="min-height: 500px"></div>
                                    </div>
                                </div>
                            </div>
                        </div><!-- tab stat -->
                    </div><!--/content-body -->
                </div><!-- /content -->
            </div><!-- /span content -->
        </div>
    </section>

    <footer>
        <a rel="to-top" href="#top"><i class="icofont-circle-arrow-up"></i></a>
    </footer>
</body>
</html>

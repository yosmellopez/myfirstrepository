<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 5.01 Transitional//EN"
    "http://www.w3.org/TR/html5/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Sistema de Gestión Citología | ${pagina}</title>
        <c:import url="/bloques/recursos.jsp"/>
        <script src="<c:url value="/${pagina}.js"/>"></script>
    </head>
    <body>
        <div class="wrapper ">
            <c:import url="/bloques/menuLateral.jsp"/>
            <div class="content" id="content">
                <c:import url="/bloques/centro.jsp"/>
                <div class="main-content">
                    <div class="row">
                        <div class="col-md-12 nopad-right">
                            <!-- panel -->
                            <div class="panel panel-piluku">
                                <div class="panel-heading" style="height: 20px;">
                                    <h3 class="text-white">
                                        Lista de Técnicos
                                        <span class="panel-options">
                                            <a href="#" class="panel-minimize">
                                                <i class="icon ti-angle-up"></i> 
                                            </a>
                                        </span>
                                    </h3>
                                </div>
                                <div class="panel-body">
                                    <div id="contenido"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
        <!-- wrapper -->
    </body>
</html>

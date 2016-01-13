<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 5.01 Transitional//EN"
    "http://www.w3.org/TR/html5/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Welcome to Spring Web MVC project</title>
        <c:import url="/bloque/recursos.jsp"/>
    </head>
    <body>
        <c:import url="/bloque/menu_arriba.jsp"/>
        <div id="main-container" class="container-fluid">
            <c:import url="/bloque/menu_izquierdo.jsp"/>
            <div id="main-content">
                <!-- BEGIN Page Title -->
                <div class="page-title">
                    <div>
                        <h1><i class="icon-home"></i> Inicio</h1>
                    </div>
                </div>
                <div id="breadcrumbs">
                    <ul class="breadcrumb">
                        <li class="active"><a href="inicio.htm"><i class="icon-home"></i> Inicio</a></li>
                    </ul>
                    <span id="centro" style="width: 100%;">
                        <div class="box box-blue">
                            <div class="box-title">
                                <h3><i class="icon-home"></i> Bienvenidos al Sistema de Gestión de Información para la Seleccion de Agentes de Seguridad y Protección</h3>
                                <div class="box-tool">
                                </div>
                            </div>
                            <div class="box-content">
                                <p style="text-align: justify;font-size: 14px;font-weight: bold;" class="lead">
                                    La selección de agentes de seguridad y protección es la captación del personal idóneo para realizar el servicio de vigilancia y cuidado de los bienes más preciados de una empresa. Ocupa un lugar particular y esencial, pues este proceso por su naturaleza sirve de termómetro para medir la calidad de los servicios.
                                </p>
                            </div>
                        </div>
                        <div class="box box-blue">
                            <div class="box-title">
                                <h3><i class="fa fa-question-circle"></i> Qué es la Empresa de Seguridad y protección del Consejo de la Administración Provincial</h3>
                                <div class="box-tool">
                                </div>
                            </div>
                            <div class="box-content">
                                <p style="text-align: justify;font-size: 14px;font-weight: bold;" class="lead imagen-inicio">
                                    La ESPCAP Las Tunas fue aprobada el día 4 de septiembre de 2006, mediante la Resolución 457/06 del Ministerio de Economía y Planificación (MEP) como Empresa de Seguridad y Protección. Cuenta con tres subdivisiones estructurales funcionales: Agencia Centro, Agencia Norte, Agencia Sur.Las cuales prestan los servicios de Seguridad y Protección a todas las instalaciones subordinadas al Consejo de la Administración Provincial del Poder Popular de Las Tunas y a terceros radicados en el territorio en ambas monedas.
                                    Además realiza estudios, asesoramientos y formulación de recomendaciones en materia de seguridad y protección dirigidas a prevenir posibles amenazas y la comisión de hechos delictivos. Brinda servicios de proyectos, medios de identificación, señalización, instalación, reparación, operación y mantenimiento de medios de seguridad. Realiza servicios de estudios, procesos selectivos, asesoramientos e instrucciones en materia de seguridad y protección dirigidos a elevar la profesionalidad. Ofrece servicios de protección con agentes de seguridad y protección, como traslado de valores. Brinda servicios de proyectos, instalación, reparación y mantenimiento de los medios de seguridad y protección. Para brindar estos servicios tiene la obligación de establecer previamente los itinerarios a utilizar debiéndose realizar coordinaciones con la jefatura del órgano de la Policía Nacional Revolucionaria (PNR), presentándolo posteriormente para su aprobación. Incluyendo además todo el personal que prestará este servicio, al órgano de Protección de la Jefatura Provincial del MININT de Las Tunas.3-	La selección de agentes de seguridad y protección es la captación del personal idóneo para realizar el servicio de vigilancia y cuidado de los bienes más preciados de una empresa. Ocupa un lugar particular y esencial, pues este proceso por su naturaleza sirve de termómetro para medir la calidad de los servicios.
                                </p>
                            </div>
                        </div>
                    </span>
                </div>
                <footer>
                    <p>2015 &copy; Universidad de las Tunas.</p>
                </footer>
                <a href="#" class="btn btn-circle btn-large" id="btn-scrollup" style="display: none;"><i class="icon-chevron-up"></i></a>
            </div>
        </div>
    </body>
</html>

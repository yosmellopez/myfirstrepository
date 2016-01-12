<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 5.01 Transitional//EN"
    "http://www.w3.org/TR/html5/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Sistema de Gestión Citología | ${pagina}</title>
        <c:import url="/bloques/recursos.jsp"/>
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
                                        Bienvenidos
                                        <span class="panel-options">
                                            <a href="#" class="panel-minimize">
                                                <i class="icon ti-angle-up"></i> 
                                            </a>
                                        </span>
                                    </h3>
                                </div>
                                <div class="panel-body">
                                    <article class="art-post art-article">
                                        <div class="art-postcontent art-postcontent-0 clearfix">
                                            <div class="art-content-layout">
                                                <div class="indent-1">
                                                    <h3>¿Qué es la citología?</h3> 
                                                    <p>La citología es una técnica que consiste en observar células a través del
                                                        microscopio para estudiar su morfología; es empleada
                                                        en numerosas especialidades médicas y quirúrgicas. No obstante, a lo largo de
                                                        este artículo la palabra citología se usará exclusivamente para definir la toma
                                                        de muestras procedentes del cuello uterino.</p> 
                                                </div>
                                            </div>
                                            <div class="indent-1 page-header">
                                                <h3>¿Todas las lesiones premalignas evolucionan hacia cáncer de cuello?</h3> 
                                                <p class="text">No, insistimos en aclarar que el médico no puede predecir si esa lesión derivará hacia un cáncer,
                                                    se mantendrá estable durante años o bien degenerará después de esa fase de
                                                    descanso; si bien hay que distinguir, pues dentro de las lesiones premalignas
                                                    existen distintos grados de gravedad: desde células prácticamente similares a
                                                    las normales hasta alteraciones cercanas a las cancerosas.</p>
                                                <p>Hay que tener presente que para la formación de un cáncer ha debido
                                                    pasar un periodo de transformación no despreciable, que puede ser de
                                                    años.</p> <p>En recientes investigaciones se demuestra una
                                                    vuelta de estas lesiones a la normalidad en torno a un 30-50%, y el progreso
                                                    hacia cáncer, en un porcentaje cercano al 30%, en función de los distintos
                                                    estudios.</p> 
                                            </div>
                                            <div class="indent-1">
                                                <h3>¿Cómo se realiza una citología?</h3>
                                                <p>La citología se realiza en combinación con una
                                                    exploración ginecológica. Con una pequeña espátula plana de madera o con un
                                                    pequeño cepillo se toma una muestra de las células superficiales del cuello
                                                    uterino, proceso que se consigue con tan sólo un pequeño raspado sobre la zona.
                                                    Las muestra se coloca en una pequeña lámina delgada de vidrio (denominado
                                                    portaobjetos) y se envía al laboratorio para su examen al
                                                    microscopio.</p> 
                                            </div>
                                        </div>
                                    </article>
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

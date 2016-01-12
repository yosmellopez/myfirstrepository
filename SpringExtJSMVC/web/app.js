Ext.application({
    name: 'CRUD', //Nombre de la aplicación (namespace global)
    autoCreateViewport: true, //Queremos que el layout principal de la página se cree automáticamente
    controllers: ['UsuarioControl', 'RolControl', 'CursoControl'] // Controladores a cargar
});
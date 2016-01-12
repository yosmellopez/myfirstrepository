/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clases;

public class TipoOperacionRecursoPK {

    private int idTipoOperacion;

    private int idRecurso;

    public TipoOperacionRecursoPK() {
    }

    public TipoOperacionRecursoPK(int idTipoOperacion, int idRecurso) {
        this.idTipoOperacion = idTipoOperacion;
        this.idRecurso = idRecurso;
    }

    public int getIdRecurso() {
        return idRecurso;
    }

    public void setIdRecurso(int idRecurso) {
        this.idRecurso = idRecurso;
    }

    public int getIdTipoOperacion() {
        return idTipoOperacion;
    }

    public void setIdTipoOperacion(int idTipoOperacion) {
        this.idTipoOperacion = idTipoOperacion;
    }
}

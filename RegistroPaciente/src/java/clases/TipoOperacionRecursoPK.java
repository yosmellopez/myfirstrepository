/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clases;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class TipoOperacionRecursoPK implements Serializable {

    @Basic(optional = false)
    @Column(name = "id_tipo_operacion", nullable = false)
    private int idTipoOperacion;

    @Basic(optional = false)
    @Column(name = "id_recurso", nullable = false)
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

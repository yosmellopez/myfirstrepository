package jpaDao;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.springframework.transaction.annotation.Transactional;

public abstract class EntitiesRepository<T, ID> {

    protected final Class clase;

    protected String orderBy;

    protected int cantidad;

    protected List<T> listaBusqueda;

    protected boolean ascendente;

    @PersistenceContext
    protected EntityManager em;

    public EntitiesRepository(Class classe) {
        this.clase = classe;
        ascendente = true;
    }

    @Transactional(readOnly = true)
    public List<T> listarTodos() {
        return listarTodosRegistros(true, -1, -1);
    }

    @Transactional(readOnly = true)
    public List<T> listarTodos(int inicio, int fin) {
        return listarTodosRegistros(false, inicio, fin);
    }

    @Transactional(readOnly = true)
    private List<T> listarTodosRegistros(boolean all, int inicio, int fin) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery();
        Root from = cq.from(clase);
        cq.select(from).orderBy(ascendente ? cb.asc(from.get(orderBy)) : cb.desc(from.get(orderBy)));
        Query q = em.createQuery(cq);
        cantidad = q.getResultList().size();
        if (!all) {
            q.setFirstResult(inicio);
            q.setMaxResults(fin);
        }
        return q.getResultList();
    }

    @Transactional(readOnly = true)
    public List<T> findWhereAND(Map<String, Object> h) {
        return findWhere(h, true);
    }

    @Transactional(readOnly = true)
    public List<T> findWhereOR(Map<String, Object> h) {
        return findWhere(h, false);
    }

    @Transactional(readOnly = true)
    private List<T> findWhere(Map<String, Object> h, boolean and) {
        String consulta = "SELECT o FROM " + clase.getName() + " o", where = "", orderby = "";
        boolean ponerWhere = true, contieneFecha = false, contieneRango = false, fecha = false, rango = false, isString = false, isLike = false, isMultiple = false;
        String valor1, claveRango = "", between = "", ultimoValor = "", like = "", multiple = "";
        Set<String> claves = h.keySet();
        HashMap<String, Date> hashMap = new HashMap<>();
        cantidad = bucarCantidad();
        Date date;
        int i = 0;
        LinkedList<String> lista = new LinkedList<>();
        for (String clave : claves) {
            if (clave.contains("orderby")) {
                orderby = "ORDER BY o." + h.get(clave);
            } else {
                like = "";
                ultimoValor = "o.";
                multiple = "";
                fecha = false;
                rango = false;
                isString = false;
                isLike = false;
                isMultiple = false;
                if (!contieneClave(clave, lista)) {
                    String valor = String.valueOf(h.get(clave));
                    if (clave.contains("multiple") && !valor.equals("")) {
                        isMultiple = true;
                        ArrayList<Integer> enteros = (ArrayList<Integer>) h.get(clave);
                        clave = clave.substring(8);
                        int m = 0;
                        multiple += "(";
                        for (Integer entero : enteros) {
                            multiple += (m++ != 0 ? " OR " : " ") + ultimoValor + clave + "=" + entero;
                        }
                        multiple += ")";
                    } else if (clave.contains("joinJ") && !valor.equals("")) {
                        String join = clave.substring(5);
                        String[] elementos = join.split("[.]");
                        for (int j = 0; j < elementos.length; j++) {
                            if (j != elementos.length - 1) {
                                consulta += (j == 0 ? " JOIN o." : " JOIN o" + j + ".") + elementos[j] + " o" + (j + 1);
                            } else {
                                ultimoValor = "o" + j + ".";
                                clave = elementos[j];
                            }
                        }
                    }
                    if (clave.startsWith("rango")) {
                        rango = true;
                        contieneRango = true;
                        claveRango = clave.contains("rangoI") ? clave.replaceFirst("I", "F") : clave.replaceFirst("F", "I");
                        lista.add(claveRango);
                        valor1 = String.valueOf(h.get(claveRango));
                        Date dateRango;
                        System.out.println(where);
                        if (valor.matches("[0-9]{2}/[0-9]{2}/[0-9]{4}")) {
                            try {
                                SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
                                date = dateFormat.parse(valor);
                                dateRango = dateFormat.parse(valor1);
                                between = " BETWEEN :" + (date.before(dateRango) ? clave : claveRango) + " AND :" + (!date.before(dateRango) ? clave : claveRango);
                                hashMap.put(claveRango, dateRango);
                                hashMap.put(clave, date);
                            } catch (ParseException ex) {
                                ex.hashCode();
                            }
                        } else {
                            between = " BETWEEN '" + (valor.compareTo(valor1) == -1 ? valor : valor1) + "' AND '" + (valor.compareTo(valor1) != -1 ? valor : valor1) + "'";
                        }
                    } else if (valor.matches("[0-9]{2}/[0-9]{2}/[0-9]{4}")) {
                        try {
                            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
                            date = dateFormat.parse(valor);
                            fecha = true;
                            contieneFecha = true;
                            hashMap.put(clave, date);
                        } catch (ParseException ex) {
                            Logger.getLogger(EntitiesRepository.class.getName()).log(Level.SEVERE, null, ex);
                        }
                    } else if (clave.contains("likeL") || !valor.matches("[0-9]*")) {
                        isString = true;
                        if (clave.contains("likeL")) {
                            like = clave.substring(5);
                            isLike = true;
                        }
                    }
                    if (!valor.isEmpty()) {
                        where += (ponerWhere ? " WHERE " : "") + (i != 0 ? (and ? " AND " : " OR ") : "") + (isMultiple ? multiple : ultimoValor + (isString ? (isLike ? like + " LIKE '%" + valor + "%'" : clave + "='" + valor + "'") : (rango ? clave.substring(6) : clave) + (rango ? between : fecha ? "=:" + clave : "='" + valor + "'")));
                        ponerWhere = false;
                        i++;
                    }
                }
            }
        }
        consulta += where + " " + (orderby.isEmpty() ? " ORDER BY o." + orderBy + " DESC" : orderby);
        Query query = em.createQuery(consulta);
        if (contieneFecha || contieneRango) {
            Set<String> keySet = hashMap.keySet();
            for (String string : keySet) {
                query.setParameter(string, hashMap.get(string));
            }
        }
        return listaBusqueda = query.getResultList();
    }

    private boolean contieneClave(String clave, LinkedList<String> claves) {
        if (claves.isEmpty()) {
            return false;
        }
        for (String string : claves) {
            if (clave.equals(string)) {
                return true;
            }
        }
        return false;
    }

    @Transactional()
    public void insertarEntidad(T t) {
        em.persist(t);
    }

    @Transactional
    public abstract T actualizarEntidad(ID id, T t);

    @Transactional
    public void refrescarEntidad(T t) {
        em.refresh(t);
    }

    @Transactional
    public void eliminarEntidad(ID id) {
        T t = (T) em.find(clase, id);
        em.remove(t);
    }

    @Transactional
    public void eliminarEntity(T entity) {
        em.remove(entity);
    }

    public int getCantidad() {
        return cantidad;
    }

    @Transactional
    public T find(ID id) {
        return (T) em.find(clase, id);
    }

    @Transactional(readOnly = true)
    public int bucarCantidad() {
        CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
        Root<T> rt = cq.from(clase);
        cq.select(em.getCriteriaBuilder().count(rt));
        Query q = em.createQuery(cq);
        return ((Long) q.getSingleResult()).intValue();
    }

    public List<T> getListaBusqueda() {
        return listaBusqueda;
    }

    public void setListaBusqueda(List<T> listaBusqueda) {
        this.listaBusqueda = listaBusqueda;
    }

}

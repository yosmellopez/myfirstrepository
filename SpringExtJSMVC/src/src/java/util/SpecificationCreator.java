/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Set;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

public class SpecificationCreator<T> implements Specification<T> {

    private HashMap<String, Object> hm;

    public SpecificationCreator(HashMap<String, Object> hashMap) {
        this.hm = hashMap;
    }

    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
//        query.select(cb.abs((Expression<N>) root));
        CriteriaQuery<Object> createQuery = cb.createQuery();
        createQuery.select(root);
        String consulta = "SELECT o FROM " + " o", where = "", orderby = "";
        boolean ponerWhere = true, contieneFecha = false, contieneRango = false, fecha = false, rango = false, isString = false, isLike = false, isMultiple = false;
        String valor1, claveRango = "", between = "", ultimoValor = "", like = "", multiple = "";
        Join<Object, Object> ultimoJoin = null;
        Set<String> claves = hm.keySet();
        HashMap<String, Date> hashMap = new HashMap<>();
        Date date;
        int i = 0;
        for (String clave : claves) {
            if (clave.contains("orderby")) {
                orderby = "ORDER BY o." + hashMap.get(clave);
                createQuery.orderBy(cb.asc(root.get(clave)));
            } else {
                like = "";
                ultimoValor = "o.";
                multiple = "";
                fecha = false;
                rango = false;
                isString = false;
                isLike = false;
                isMultiple = false;
                String valor = String.valueOf(hashMap.get(clave));
                if (!valor.isEmpty()) {
                    if (clave.contains("multipleM") && !valor.equals("")) {
                        isMultiple = true;
                        ArrayList<Integer> enteros = (ArrayList<Integer>) this.hm.get(clave);
                        clave = clave.substring(9);
                        for (Integer entero : enteros) {
                            cb.or(cb.equal(ultimoJoin.get(clave), entero));
                        }
                    } else if (clave.contains("joinJ") && !valor.equals("")) {
                        String join = clave.substring(5);
                        String[] elementos = join.split("[.]");
                        for (int j = 0; j < elementos.length - 1; j++) {
                            ultimoJoin = j == 0 ? root.join(join) : ultimoJoin.join(join);
                        }
                    }
                    if (clave.startsWith("rango")) {
                        rango = true;
                        contieneRango = true;
                        claveRango = clave.contains("rangoI") ? clave.replaceFirst("I", "F") : clave.replaceFirst("F", "I");
                        valor1 = String.valueOf(hashMap.get(claveRango));
                        Date dateRango;
                        System.out.println(where);
                        if (valor.matches("[0-9]{2}/[0-9]{2}/[0-9]{4}")) {
                            try {
                                SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
                                date = dateFormat.parse(valor);
                                dateRango = dateFormat.parse(valor1);
                                cb.between(root.get(clave), date.before(dateRango) ? date : dateRango, date.after(dateRango) ? date : dateRango);
//                                between = " BETWEEN :" + (date.before(dateRango) ? clave : claveRango) + " AND :" + (!date.before(dateRango) ? clave : claveRango);
//                                hashMap.put(claveRango, dateRango);
//                                hashMap.put(clave, date);
                            } catch (ParseException ex) {
                                ex.hashCode();
                            }
                        } else {
                            cb.between(root.get(clave), Integer.parseInt(valor.compareTo(valor1) == -1 ? valor : valor1), Integer.parseInt(valor.compareTo(valor1) != -1 ? valor : valor1));
                            //= " BETWEEN '" + (valor.compareTo(valor1) == -1 ? valor : valor1) + "' AND '" + (valor.compareTo(valor1) != -1 ? valor : valor1) + "'";
                        }
                    } else if (valor.matches("[0-9]{2}/[0-9]{2}/[0-9]{4}")) {
                        try {
                            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
                            date = dateFormat.parse(valor);
                            fecha = true;
                            contieneFecha = true;
                            cb.and(cb.equal(root.get(clave), date));
                            hashMap.put(clave, date);
                        } catch (ParseException ex) {
                        }
                    } else if (clave.contains("likeL") || !valor.matches("[0-9]*")) {
                        isString = true;
                        if (clave.contains("likeL")) {
                            like = clave.substring(5);
                            cb.and(cb.like(root.get(like), valor));
                        }
                    }
                }
//                if (!valor.isEmpty()) {
//                    where += (ponerWhere ? " WHERE " : "") + (i != 0 ? (true ? " AND " : " OR ") : "") + (isMultiple ? multiple : ultimoValor + (isString ? (isLike ? like + " LIKE '%" + valor + "%'" : clave + "='" + valor + "'") : (rango ? clave.substring(6) : clave) + (rango ? between : fecha ? "=:" + clave : "='" + valor + "'")));
//                    ponerWhere = false;
//                    i++;
//                }
            }
        }
        consulta += where + " " + (orderby.isEmpty() ? " ORDER BY o." + " DESC" : orderby);
//        if (contieneFecha || contieneRango) {
//            Set<String> keySet = hm.keySet();
//            for (String string : keySet) {
//                query.setParameter(string, hm.get(string));
//            }
//        }
        return createQuery.getRestriction();
    }


    public HashMap<String, Object> getHm() {
        return hm;
    }

    public void setHm(HashMap<String, Object> hm) {
        this.hm = hm;
    }
}

package com.app.persistence.hibernate;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.hibernate.Query;
import org.springframework.util.StringUtils;

import com.app.bo.Record;
import com.app.persistence.RecordDAO;

/**
 * Created by nikolai.metlitski on 4/18/2016.
 */
public class RecordDAOImpl extends AbstractHibernateDAO implements RecordDAO {
    @Override
    public Long create(Record entity) {
        Long id = (Long) getSession().save(entity);
        return id;
    }

    @Override
    public void update(Record entity) {
        getSession().update(entity);
    }

    @Override
    public boolean delete(Long id) {
        Record record = find(id);
        if (record != null) {
            getSession().delete(record);
            return true;
        }
        return false;
    }

    @Override
    public int delete(List<Long> ids, Long userId) {
        String hql = "delete from Record where id in :ids";

        if (userId != null) {
            hql += " and user.id = :userId";
        }

        Query query = getSession().createQuery(hql);
        query.setParameterList("ids", ids);

        if (userId != null) {
            query.setParameter("userId", userId);
        }

        return query.executeUpdate();
    }

    @Override
    public Record find(Long id) {
        return getSession().get(Record.class, id);
    }

    @Override
    public Record find(Long id, Long userId) {
        String hql = "from Record where id = :id and userId = :userId";
        Query query = getSession().createQuery(hql);
        query.setLong("id", id);
        query.setLong("userId", userId);
        return (Record) query.uniqueResult();
    }

    @Override
    public Long count(Long userId, Date dateFrom, Date dateTo, Date timeFrom, Date timeTo) {
        String hql = "select count(*) from Record";
        String where = getWhereClause(userId, dateFrom, dateTo, timeFrom, timeTo);
        if (StringUtils.hasLength(where)) {
            hql += " where " + where;
        }

        Query query = getSession().createQuery(hql);

        if (StringUtils.hasLength(where)) {
            setParams(query, userId, dateFrom, dateTo, timeFrom, timeTo);
        }

        return (Long) query.uniqueResult();
    }

    @Override
    public List<Record> find(Long userId, Date dateFrom, Date dateTo, Date timeFrom, Date timeTo, Integer start, Integer limit) {
        String hql = "from Record";
        String where = getWhereClause(userId, dateFrom, dateTo, timeFrom, timeTo);
        if (StringUtils.hasLength(where)) {
            hql += " where " + where;
        }

        Query query = getSession().createQuery(hql);

        if (StringUtils.hasLength(where)) {
            setParams(query, userId, dateFrom, dateTo, timeFrom, timeTo);
        }
        if (start != null) {
            query.setFirstResult(start);
        }
        if (limit != null) {
            query.setMaxResults(limit);
        }
        List<Record> list = query.list();

        if (list.size() > 0) {
            List<Long> ids = list.stream().map(r -> r.getId()).collect(Collectors.toList());

            Query auxQuery = getSession().getNamedQuery("records").setParameterList("ids", ids);
            List<Object[]> auxList = auxQuery.list();
            Map<Long, Object[]> auxMap = auxList.stream().collect(Collectors.toMap(o -> (Long) o[0], Function.identity()));

            list.stream().forEach(r -> {
                r.setDayTotal((Long) auxMap.get(r.getId())[1]);
                r.setUserLimit((Long) auxMap.get(r.getId())[2]);
            });
        }
        return list;
    }

    @Override
    public Long getUserId(Long id) {
        Query query = getSession().getNamedQuery("userId").setLong("id", id);
        Long userId = (Long) query.uniqueResult();
        return userId;
    }

    private String getWhereClause(Long userId, Date dateFrom, Date dateTo, Date timeFrom, Date timeTo) {
        List<String> criteria = new ArrayList<>();
        if (userId != null) {
            criteria.add("userId = :userId");
        }
        if (dateFrom != null) {
            criteria.add("date >= :dateFrom");
        }
        if (dateTo != null) {
            criteria.add("date < :dateTo");
        }
        if (timeFrom != null) {
            criteria.add("time >= :timeFrom");
        }
        if (timeTo != null) {
            criteria.add("time < :timeTo");
        }
        return criteria.stream().collect(Collectors.joining(" and "));
    }

    private void setParams(Query query, Long userId, Date dateFrom, Date dateTo, Date timeFrom, Date timeTo) {
        if (userId != null) {
            query.setLong("userId", userId);
        }
        if (dateFrom != null) {
            query.setDate("dateFrom", dateFrom);
        }
        if (dateTo != null) {
            query.setDate("dateTo", dateTo);
        }
        if (timeFrom != null) {
            query.setTimestamp("timeFrom", timeFrom);
        }
        if (timeTo != null) {
            query.setTimestamp("timeTo", timeTo);
        }
    }
}

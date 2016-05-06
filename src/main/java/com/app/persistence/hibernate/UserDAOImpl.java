package com.app.persistence.hibernate;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Restrictions;

import com.app.bo.User;
import com.app.persistence.UserDAO;

/**
 * Created by nikolai.metlitski on 4/18/2016.
 */
public class UserDAOImpl extends AbstractHibernateDAO implements UserDAO {

    @Override
    public Long create(User entity) {
        Long id = (Long) getSession().save(entity);
        return id;
    }

    @Override
    public void update(User entity) {
        getSession().update(entity);
    }

    @Override
    public boolean delete(Long id) {
        User user = find(id);
        if (user != null) {
            getSession().delete(user);
            return true;
        }
        return false;
    }

    @Override
    public int delete(List<Long> ids) {
        Criteria criteria = getSession().createCriteria(User.class).add(Restrictions.in("id", ids));
        List<User> users = criteria.list();
        users.stream().forEach(u -> getSession().delete(u));

        return users.size();
    }

    @Override
    public User find(Long id) {
        return getSession().get(User.class, id);
    }

    @Override
    public User find(String name) {
        Criteria criteria = getSession().createCriteria(User.class).add(Restrictions.eq("name", name));
        return (User) criteria.uniqueResult();
    }

    @Override
    public List<User> find(Integer start, Integer limit) {
        Query query = getSession().createQuery("from User");
        if (start != null) {
            query.setFirstResult(start);
        }
        if (limit != null) {
            query.setMaxResults(limit);
        }
        return query.list();
    }

    @Override
    public Long count() {
        Query query = getSession().createQuery("select count(*) from User");
        return (Long) query.uniqueResult();
    }
}

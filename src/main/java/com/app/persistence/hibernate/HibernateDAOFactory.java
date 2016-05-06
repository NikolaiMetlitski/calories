package com.app.persistence.hibernate;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.app.AppRuntimeException;
import com.app.persistence.DAOFactory;
import com.app.persistence.RecordDAO;
import com.app.persistence.UserDAO;

/**
 * Created by nikolai.metlitski on 4/18/2016.
 */
@Component("DAOFactory")
public class HibernateDAOFactory implements DAOFactory {

    @Autowired()
    @Qualifier("sessionFactory")
    private SessionFactory sessionFactory;

    @Value("${UserDAO.impl}")
    private String userDAOImpl;

    @Value("${RecordDAO.impl}")
    private String recordDAOImpl;

    private UserDAO userDAO;
    private RecordDAO recordDAO;

    public UserDAO getUserDAO() {
        if (userDAO != null) {
            return userDAO;
        }

        try {
            userDAO = (UserDAO) Class.forName(userDAOImpl).newInstance();
            ((AbstractHibernateDAO) userDAO).setSessionFactory(sessionFactory);
        } catch (ClassNotFoundException | InstantiationException | IllegalAccessException ex) {
            throw new AppRuntimeException("Cannot instantiate DAO class", ex);
        }

        return userDAO;
    }

    public RecordDAO getRecordDAO() {
        if (recordDAO != null) {
            return recordDAO;
        }

        try {
            recordDAO = (RecordDAO) Class.forName(recordDAOImpl).newInstance();
            ((AbstractHibernateDAO) recordDAO).setSessionFactory(sessionFactory);
        } catch (ClassNotFoundException | InstantiationException | IllegalAccessException ex) {
            throw new AppRuntimeException("Cannot instantiate DAO class", ex);
        }

        return recordDAO;
    }
}

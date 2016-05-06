package com.app.persistence;

/**
 * Created by nikolai.metlitski on 4/18/2016.
 */
public interface DAOFactory {
    RecordDAO getRecordDAO();

    UserDAO getUserDAO();
}

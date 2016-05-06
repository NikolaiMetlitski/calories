package com.app.persistence;

import java.util.List;

import com.app.bo.User;

/**
 * Created by nikolai.metlitski on 4/18/2016.
 */
public interface UserDAO {
    Long create(User entity);

    void update(User entity);

    boolean delete(Long id);

    int delete(List<Long> ids);

    User find(Long id);

    User find(String name);

    List<User> find(Integer start, Integer limit);

    Long count();
}

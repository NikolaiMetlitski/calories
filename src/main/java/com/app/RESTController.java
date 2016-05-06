package com.app;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.bo.Record;
import com.app.bo.User;
import com.app.persistence.DAOFactory;
import com.app.persistence.RecordDAO;
import com.app.persistence.UserDAO;

/**
 * Created by Admin on 4/16/2016.
 */
@RestController
public class RESTController {
    public static final String PATH = "path";
    @Autowired
    @Qualifier("DAOFactory")
    DAOFactory daoFactory;
    @Value("${CRUD.user.role}")
    private String crudUserRole;
    @Value("${USER.role}")
    private String userRole;
    @Value("${CRUD.record.role}")
    private String crudRecordRole;

    /**
     * Create user.
     *
     * @param userToSignUp
     * @return
     */
    @Transactional
    @RequestMapping(value = "/signup", method = RequestMethod.PUT)
    public ResponseEntity<?> signup(
            @RequestBody User userToSignUp) {

        User user = new User();
        user.setName(userToSignUp.getName());
        user.setPassword(userToSignUp.getPassword());
        user.setLimit(userToSignUp.getLimit());

        // Only simple user role is granted on sign up.
        user.setAuthorities(Arrays.asList(this.userRole));

        UserDAO userDAO = daoFactory.getUserDAO();
        userDAO.create(user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /**
     * Create user.
     *
     * @param userToCreate
     * @return
     */
    @Transactional
    @RequestMapping(value = "/user", method = RequestMethod.PUT)
    public ResponseEntity<?> createUser(
            @RequestBody User userToCreate) {

        userToCreate.setId(null);

        UserDAO userDAO = daoFactory.getUserDAO();
        Long id = userDAO.create(userToCreate);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    /**
     * Update user.
     *
     * @param data
     * @return
     */
    @Transactional
    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public ResponseEntity<?> updateUser(
            @RequestBody User data) {

        UserDAO userDAO = daoFactory.getUserDAO();

        // Only user with ${CRUD.user.role} can update other users.
        User user = Utils.getCurrentUser();
        if (!user.getAuthorities().contains(this.crudUserRole) && data.getId() != user.getId()) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }


        userDAO.update(data);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    /**
     * Retrieve users.
     *
     * @param start
     * @param limit
     * @return
     */
    @Transactional
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public ResponseEntity<?> getUsers(
            @RequestParam(value = "id", required = false) Long id,
            @RequestParam(value = "start", required = false) Integer start,
            @RequestParam(value = "limit", required = false) Integer limit) {

        UserDAO userDAO = daoFactory.getUserDAO();

        // Only user with ${CRUD.user.role} can see other users.
        User user = Utils.getCurrentUser();
        if (!user.getAuthorities().contains(this.crudUserRole)) {
            User self = userDAO.find(user.getId());
            return new ResponseEntity<>(Arrays.asList(self), HttpStatus.OK);
        }

        Long count;
        MultiValueMap headers = new HttpHeaders();
        if (id != null) {
            User found = userDAO.find(id);
            count = found != null ? 1L : 0L;
            headers.add("Count", count.toString());
            return new ResponseEntity<>(Arrays.asList(found), headers, HttpStatus.OK);
        } else {
            List<User> users = userDAO.find(start, limit);
            count = userDAO.count();
            headers.add("Count", count.toString());
            return new ResponseEntity<>(users, headers, HttpStatus.OK);
        }
    }

    /**
     * Delete user.
     *
     * @param ids
     * @return
     */
    @Transactional
    @RequestMapping(value = "/user", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUsers(
            @RequestBody List<Long> ids) {

        UserDAO userDAO = daoFactory.getUserDAO();

        // Only user with ${CRUD.user.role} can delete other users.
        User user = Utils.getCurrentUser();
        if (!user.getAuthorities().contains(this.crudUserRole)) {
            if (ids.size() == 1 && ids.contains(user.getId())) {
                boolean success = userDAO.delete(user.getId());
                return new ResponseEntity<>(success, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        }

        int deleted = userDAO.delete(ids);
        return new ResponseEntity<>(deleted, HttpStatus.OK);
    }

    /**
     * Create record.
     *
     * @param record
     * @return
     */
    @Transactional
    @RequestMapping(value = "/record", method = RequestMethod.PUT)
    public ResponseEntity<?> createRecord(
            @RequestBody Record record) {

        record.setId(null);

        // Only user with ${CRUD.record.role} can create records on behalf of other users.
        User user = Utils.getCurrentUser();
        if (!user.getAuthorities().contains(this.crudRecordRole)) {
            record.setUserId(user.getId());
        }

        RecordDAO recordDAO = daoFactory.getRecordDAO();
        Long id = recordDAO.create(record);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    /**
     * Update record.
     *
     * @param data
     * @return
     */
    @Transactional
    @RequestMapping(value = "/record", method = RequestMethod.POST)
    public ResponseEntity<?> updateRecord(
            @RequestBody Record data) {

        RecordDAO recordDAO = daoFactory.getRecordDAO();
        Long userId = recordDAO.getUserId(data.getId());

        // Only user with ${CRUD.record.role} can update other users' records.
        User user = Utils.getCurrentUser();
        if (!user.getAuthorities().contains(this.crudRecordRole) && userId != user.getId()) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }


        recordDAO.update(data);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    /**
     * Retrieve records.
     *
     * @param userId
     * @param dateFrom
     * @param dateTo
     * @param timeFrom
     * @param timeTo
     * @param start
     * @param limit
     * @return
     */
    @Transactional
    @RequestMapping(value = "/record", method = RequestMethod.GET)
    public ResponseEntity<?> getRecords(
            @RequestParam(value = "id", required = false) Long id,
            @RequestParam(value = "userId", required = false) Long userId,
            @RequestParam(value = "dateFrom", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateFrom,
            @RequestParam(value = "dateTo", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateTo,
            @RequestParam(value = "timeFrom", required = false) @DateTimeFormat(pattern = "hh:mm a") Date timeFrom,
            @RequestParam(value = "timeTo", required = false) @DateTimeFormat(pattern = "hh:mm a") Date timeTo,
            @RequestParam(value = "start", required = false) Integer start,
            @RequestParam(value = "limit", required = false) Integer limit) {

        RecordDAO recordDAO = daoFactory.getRecordDAO();

        // Only user with ${CRUD.record.role} can see other users' records.
        User user = Utils.getCurrentUser();
        if (!user.getAuthorities().contains(this.crudRecordRole)) {
            userId = user.getId();
        }

        Long count;
        MultiValueMap headers = new HttpHeaders();
        if (id != null) {
            Record record;
            if (userId != null) {
                record = recordDAO.find(id, userId);
            } else {
                record = recordDAO.find(id);
            }
            count = record != null ? 1L : 0L;
            headers.add("Count", count.toString());
            return new ResponseEntity<>(Arrays.asList(record), headers, HttpStatus.OK);
        } else {
            List<Record> records = recordDAO.find(userId, dateFrom, dateTo, timeFrom, timeTo, start, limit);
            count = recordDAO.count(userId, dateFrom, dateTo, timeFrom, timeTo);
            headers.add("Count", count.toString());
            return new ResponseEntity<>(records, headers, HttpStatus.OK);
        }
    }

    /**
     * Delete record.
     *
     * @param ids
     * @return
     */
    @Transactional
    @RequestMapping(value = "/record", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteRecords(
            @RequestBody List<Long> ids) {
        Long userId = null;

        // Only user with ${CRUD.record.role} can delete other users' records.
        User user = Utils.getCurrentUser();
        if (!user.getAuthorities().contains(this.crudRecordRole)) {
            userId = user.getId();
        }

        RecordDAO recordDAO = daoFactory.getRecordDAO();
        int deleted = recordDAO.delete(ids, userId);
        return new ResponseEntity<>(deleted, HttpStatus.OK);
    }
}

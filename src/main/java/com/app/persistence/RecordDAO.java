package com.app.persistence;

import java.util.Date;
import java.util.List;

import com.app.bo.Record;

/**
 * Created by nikolai.metlitski on 4/18/2016.
 */
public interface RecordDAO {
    Long create(Record entity);

    void update(Record entity);

    boolean delete(Long id);

    int delete(List<Long> ids, Long userId);

    Record find(Long id);

    Record find(Long id, Long userId);

    List<Record> find(Long userId, Date dateFrom, Date dateTo, Date timeFrom, Date timeTo, Integer start, Integer limit);

    Long count(Long userId, Date dateFrom, Date dateTo, Date timeFrom, Date timeTo);

    Long getUserId(Long id);
}

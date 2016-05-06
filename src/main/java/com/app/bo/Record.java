package com.app.bo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedNativeQueries;
import javax.persistence.NamedNativeQuery;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.SqlResultSetMappings;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.Version;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Created by nikolai.metlitski on 4/18/2016.
 */
@NamedNativeQueries({
        @NamedNativeQuery(name = "userId", query = "SELECT UserID FROM Record WHERE ID = :id", resultSetMapping = "userId"),
        @NamedNativeQuery(
                name = "records",
                query = "SELECT R.`ID` AS `id`, SUM(RD.`Value`) AS `dayTotal`, U.`Limit` AS `userLimit`\n" +
                        "FROM Record R\n" +
                        "JOIN Record RD ON DATE(R.`Date`) = DATE(RD.`Date`) AND R.`UserID` = RD.`UserID`\n" +
                        "JOIN `User` U ON U.`ID` = R.`UserID`\n" +
                        "WHERE R.`ID` IN :ids\n" +
                        "GROUP BY `id`\n" +
                        "ORDER BY `id`",
                resultSetMapping = "aux"
        )
})
@SqlResultSetMappings({
        @SqlResultSetMapping(name = "userId", columns = {
                @ColumnResult(name = "UserID", type = Long.class)
        }),
        @SqlResultSetMapping(name = "aux", columns = {
                @ColumnResult(name = "id", type = Long.class),
                @ColumnResult(name = "dayTotal", type = Long.class),
                @ColumnResult(name = "userLimit", type = Long.class)
        })
})
@Entity(name = "Record")
@Table(name = "`Record`")
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`ID`")
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "US/Central")
    @Column(name = "`Date`")
    private Date date;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "hh:mm a", timezone = "US/Central")
    @Column(name = "`Time`")
    private Date time;

    @Column(name = "`Description`")
    private String description;

    @Column(name = "`Value`")
    private Long value;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "`UserID`", insertable = false, updatable = false)
    private User user;

    @Column(name = "`UserID`")
    private Long userId;

    @Version
    @Column(name = "`Version`")
    private Integer version;

    @Transient
    private Long dayTotal;

    @Transient
    private Long userLimit;

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(date)
                .append(time)
                .append(description)
                .append(value)
                .append(userId)
                .toHashCode();
    }

    @Override
    public boolean equals(final Object obj) {
        if (obj instanceof Record) {
            final Record other = (Record) obj;
            return new EqualsBuilder()
                    .append(date, other.date)
                    .append(time, other.time)
                    .append(description, other.description)
                    .append(value, other.value)
                    .append(userId, other.userId)
                    .isEquals();
        } else {
            return false;
        }
    }

    public Long getDayTotal() {
        return dayTotal;
    }

    public void setDayTotal(Long dayTotal) {
        this.dayTotal = dayTotal;
    }

    public Long getUserLimit() {
        return userLimit;
    }

    public void setUserLimit(Long userLimit) {
        this.userLimit = userLimit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}

package com.zzbslayer.smartcar.DataModel.Entity;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name = "humidity", schema = "swms", catalog = "")
public class HumidityEntity {
    private int hid;
    private int flower;
    private Date hdate;
    private Time htime;
    private double humidity;

    @Id
    @Column(name = "hid", nullable = false)
    public int getHid() {
        return hid;
    }

    public void setHid(int hid) {
        this.hid = hid;
    }

    @Basic
    @Column(name = "flower", nullable = false)
    public int getFlower() {
        return flower;
    }

    public void setFlower(int flower) {
        this.flower = flower;
    }

    @Basic
    @Column(name = "hdate", nullable = false)
    public Date getHdate() {
        return hdate;
    }

    public void setHdate(Date hdate) {
        this.hdate = hdate;
    }

    @Basic
    @Column(name = "htime", nullable = false)
    public Time getHtime() {
        return htime;
    }

    public void setHtime(Time htime) {
        this.htime = htime;
    }

    @Basic
    @Column(name = "humidity", nullable = false, precision = 0)
    public double getHumidity() {
        return humidity;
    }

    public void setHumidity(double humidity) {
        this.humidity = humidity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        HumidityEntity that = (HumidityEntity) o;

        if (hid != that.hid) return false;
        if (flower != that.flower) return false;
        if (Double.compare(that.humidity, humidity) != 0) return false;
        if (hdate != null ? !hdate.equals(that.hdate) : that.hdate != null) return false;
        if (htime != null ? !htime.equals(that.htime) : that.htime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = hid;
        result = 31 * result + flower;
        result = 31 * result + (hdate != null ? hdate.hashCode() : 0);
        result = 31 * result + (htime != null ? htime.hashCode() : 0);
        temp = Double.doubleToLongBits(humidity);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
    }
}

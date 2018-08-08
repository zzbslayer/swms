package com.zzbslayer.smartcar.DataModel.Entity;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name = "temperature", schema = "smartcar", catalog = "")
public class TemperatureEntity {
    private int tid;
    private Date tdate;
    private Time ttime;
    private double temperature;

    @Id
    @Column(name = "tid", nullable = false)
    public int getTid() {
        return tid;
    }

    public void setTid(int tid) {
        this.tid = tid;
    }

    @Basic
    @Column(name = "tdate", nullable = false)
    public Date getTdate() {
        return tdate;
    }

    public void setTdate(Date tdate) {
        this.tdate = tdate;
    }

    @Basic
    @Column(name = "ttime", nullable = false)
    public Time getTtime() {
        return ttime;
    }

    public void setTtime(Time ttime) {
        this.ttime = ttime;
    }

    @Basic
    @Column(name = "temperature", nullable = false, precision = 0)
    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TemperatureEntity that = (TemperatureEntity) o;

        if (tid != that.tid) return false;
        if (Double.compare(that.temperature, temperature) != 0) return false;
        if (tdate != null ? !tdate.equals(that.tdate) : that.tdate != null) return false;
        if (ttime != null ? !ttime.equals(that.ttime) : that.ttime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = tid;
        result = 31 * result + (tdate != null ? tdate.hashCode() : 0);
        result = 31 * result + (ttime != null ? ttime.hashCode() : 0);
        temp = Double.doubleToLongBits(temperature);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
    }
}

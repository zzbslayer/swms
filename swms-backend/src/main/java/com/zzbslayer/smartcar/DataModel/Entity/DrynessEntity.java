package com.zzbslayer.smartcar.DataModel.Entity;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name = "dryness", schema = "smartcar", catalog = "")
public class DrynessEntity {
    private int did;
    private int flower;
    private Date ddate;
    private Time dtime;
    private double dryness;

    @Id
    @Column(name = "did", nullable = false)
    public int getDid() {
        return did;
    }

    public void setDid(int did) {
        this.did = did;
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
    @Column(name = "ddate", nullable = false)
    public Date getDdate() {
        return ddate;
    }

    public void setDdate(Date ddate) {
        this.ddate = ddate;
    }

    @Basic
    @Column(name = "dtime", nullable = false)
    public Time getDtime() {
        return dtime;
    }

    public void setDtime(Time dtime) {
        this.dtime = dtime;
    }

    @Basic
    @Column(name = "dryness", nullable = false, precision = 0)
    public double getDryness() {
        return dryness;
    }

    public void setDryness(double dryness) {
        this.dryness = dryness;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DrynessEntity that = (DrynessEntity) o;

        if (did != that.did) return false;
        if (flower != that.flower) return false;
        if (Double.compare(that.dryness, dryness) != 0) return false;
        if (ddate != null ? !ddate.equals(that.ddate) : that.ddate != null) return false;
        if (dtime != null ? !dtime.equals(that.dtime) : that.dtime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = did;
        result = 31 * result + flower;
        result = 31 * result + (ddate != null ? ddate.hashCode() : 0);
        result = 31 * result + (dtime != null ? dtime.hashCode() : 0);
        temp = Double.doubleToLongBits(dryness);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
    }
}

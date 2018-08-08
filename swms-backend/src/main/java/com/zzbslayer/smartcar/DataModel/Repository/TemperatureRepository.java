package com.zzbslayer.smartcar.DataModel.Repository;

import com.zzbslayer.smartcar.DataModel.Entity.TemperatureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface TemperatureRepository extends JpaRepository<TemperatureEntity, Integer> {
    List<TemperatureEntity> findByTdate(Date date);
}

package com.zzbslayer.smartcar.DataModel.Repository;

import com.zzbslayer.smartcar.DataModel.Entity.HumidityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface HumidityRepository extends JpaRepository<HumidityEntity, Integer>{
    List<HumidityEntity> findByHdate(Date date);
}

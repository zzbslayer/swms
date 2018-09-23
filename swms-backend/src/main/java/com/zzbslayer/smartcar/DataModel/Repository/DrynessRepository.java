package com.zzbslayer.smartcar.DataModel.Repository;

import com.zzbslayer.smartcar.DataModel.Entity.DrynessEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface DrynessRepository extends JpaRepository<DrynessEntity, Integer>{
    List<DrynessEntity> findByDdate(Date date);

    List<DrynessEntity> findByDdateAndFlower(Date date, Integer flower);
}

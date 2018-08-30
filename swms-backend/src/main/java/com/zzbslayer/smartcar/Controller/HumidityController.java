package com.zzbslayer.smartcar.Controller;

import com.zzbslayer.smartcar.DataModel.Entity.HumidityEntity;
import com.zzbslayer.smartcar.DataModel.Repository.HumidityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.Calendar;
import java.util.List;

@Controller
@RequestMapping(value="/api")
public class HumidityController {

    @Autowired
    HumidityRepository humidityRepository;

    @GetMapping(value="/humidity")
    @ResponseBody
    public List<HumidityEntity> getHumidity(@RequestParam("date")Date date, @RequestParam("flower")Integer flower){
        if (flower == 0)
            return  humidityRepository.findByHdate(date);
        return humidityRepository.findByHdateAndFlower(date,flower);
    }

    @PostMapping(value="/humidity/save")
    @ResponseBody
    public HumidityEntity save(@RequestParam("flower")Integer flower, @RequestParam("humidity")double humidity){
        java.sql.Date date = new java.sql.Date(Calendar.getInstance().getTime().getTime());
        java.sql.Time time = new java.sql.Time(Calendar.getInstance().getTime().getTime());
        HumidityEntity humidityEntity = new HumidityEntity();
        humidityEntity.setFlower(flower);
        humidityEntity.setHdate(date);
        humidityEntity.setHid(0);
        humidityEntity.setHtime(time);
        humidityEntity.setHumidity(humidity);
        return humidityRepository.save(humidityEntity);
    }
}

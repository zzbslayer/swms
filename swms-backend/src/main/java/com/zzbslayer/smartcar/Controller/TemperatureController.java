package com.zzbslayer.smartcar.Controller;

import com.zzbslayer.smartcar.DataModel.Entity.HumidityEntity;
import com.zzbslayer.smartcar.DataModel.Entity.TemperatureEntity;
import com.zzbslayer.smartcar.DataModel.Repository.TemperatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.Calendar;
import java.util.List;

@Controller
@RequestMapping(value="/api")
public class TemperatureController {
    @Autowired
    TemperatureRepository temperatureRepository;

    @GetMapping(value="/temperature")
    @ResponseBody
    public List<TemperatureEntity> getTemperature(@RequestParam("date")Date date){
        return temperatureRepository.findByTdate(date);
    }

    @PostMapping(value="/temperature/save")
    @ResponseBody
    public TemperatureEntity save(@RequestParam("temperature")double temperature){
        java.sql.Date date = new java.sql.Date(Calendar.getInstance().getTime().getTime());
        java.sql.Time time = new java.sql.Time(Calendar.getInstance().getTime().getTime());
        TemperatureEntity temperatureEntity = new TemperatureEntity();
        temperatureEntity.setTdate(date);
        temperatureEntity.setTtime(time);
        temperatureEntity.setTemperature(temperature);
        temperatureEntity.setTid(0);
        return temperatureRepository.save(temperatureEntity);
    }

}

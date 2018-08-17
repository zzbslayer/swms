package com.zzbslayer.smartcar.Controller;

import com.zzbslayer.smartcar.DataModel.Entity.TemperatureEntity;
import com.zzbslayer.smartcar.DataModel.Repository.TemperatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Date;
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


}

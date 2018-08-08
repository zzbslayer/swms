package com.zzbslayer.smartcar.Controller;

import com.zzbslayer.smartcar.DataModel.Entity.HumidityEntity;
import com.zzbslayer.smartcar.DataModel.Repository.HumidityRepository;
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
public class HumidityController {

    @Autowired
    HumidityRepository humidityRepository;

    @GetMapping(value="/humidity")
    @ResponseBody
    public List<HumidityEntity> getHumidity(@RequestParam("date")Date date){
        return humidityRepository.findByHdate(date);
    }

}

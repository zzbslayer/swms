package com.zzbslayer.smartcar.Controller;

import com.zzbslayer.smartcar.DataModel.Entity.DrynessEntity;
import com.zzbslayer.smartcar.DataModel.Repository.DrynessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.Calendar;
import java.util.List;

@Controller
@RequestMapping(value="/api")
public class DrynessController {

    @Autowired
    DrynessRepository drynessRepository;

    @GetMapping(value="/dryness")
    @ResponseBody
    public List<DrynessEntity> getDryness(@RequestParam("date")Date date, @RequestParam("flower")Integer flower){
        if (flower == 0)
            return  drynessRepository.findByDdate(date);
        return drynessRepository.findByDdateAndFlower(date,flower);
    }

    @PostMapping(value="/dryness/save")
    @ResponseBody
    public DrynessEntity save(@RequestParam("flower")Integer flower, @RequestParam("dryness")double dryness){
        java.sql.Date date = new java.sql.Date(Calendar.getInstance().getTime().getTime());
        java.sql.Time time = new java.sql.Time(Calendar.getInstance().getTime().getTime());
        DrynessEntity drynessEntity = new DrynessEntity();
        drynessEntity.setFlower(flower);
        drynessEntity.setDdate(date);
        drynessEntity.setDid(0);
        drynessEntity.setDtime(time);
        drynessEntity.setDryness(dryness);
        return drynessRepository.save(drynessEntity);
    }
}

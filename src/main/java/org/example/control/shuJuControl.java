package org.example.control;

import org.apache.ibatis.annotations.Mapper;
import org.example.Mapper.workMapper;
import org.example.domain.work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@RestController注解相当于@ResponseBody ＋ @Controller合在一起的作用。
@RestController
public class shuJuControl {
//    @Autowired
//    private org.example.Mapper.mapper mapper;
    @Autowired
    private workMapper workMapper;
    @ResponseBody
    @RequestMapping("/getData")
    public List<work> getShuJu(){
        List<work> shuJus = workMapper.selectList(null);
        return shuJus;
    }
    //条件查询(ID)
    @RequestMapping("/getDataById")
    public work findByIdWork(Integer id){
         return workMapper.findByIdWork(id);
    }
    //新增数据
    @RequestMapping("/insertData")
    public work insertWork(@RequestBody work work){
        workMapper.insert(work);
        System.out.println("新增数据成功");
        return work;
    }
    //删除数据
    @RequestMapping("/deletData")
    public void  deletWorkByID( Integer id){
        workMapper.deleteById(id);
        System.out.println("删除成功");
    }

    //修改数据
    @RequestMapping("/updata")
    public String updataWork( @RequestBody work work){
        workMapper.updateById(work);
        System.out.println(work);
        return "修改成功";
    }

    //
}

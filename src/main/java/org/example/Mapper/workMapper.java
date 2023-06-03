package org.example.Mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.example.domain.work;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Service
@Mapper
public interface workMapper extends BaseMapper<work> {
   @Select("select * from work where id = #{id}")
    work findByIdWork(int id);
}

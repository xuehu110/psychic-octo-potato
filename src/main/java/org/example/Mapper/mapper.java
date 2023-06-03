package org.example.Mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import org.example.domain.work;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Service
public interface mapper extends BaseMapper<work> {
}

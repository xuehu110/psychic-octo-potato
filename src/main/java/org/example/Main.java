package org.example;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication//加载启动类
@MapperScan("org.example.Mapper")//扫描Mapper层的位置
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class,args);
    }
}
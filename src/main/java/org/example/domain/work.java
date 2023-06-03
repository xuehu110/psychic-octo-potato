package org.example.domain;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
//下面两个表示无参数构造方法和有参数构造方法
@NoArgsConstructor
@AllArgsConstructor

public class work {

    @TableId(value = "id")
    private int id;
    private String name;
    @TableField(value = "renshu")
    private String RenShu;
    @TableField(value = "fenlei")
    private String FenLei;
    @TableField(value = "gangweishu")
    private String GangWeiShu;

}

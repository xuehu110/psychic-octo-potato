import com.baomidou.mybatisplus.annotation.TableField;
import org.example.Main;
import org.example.domain.work;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.net.URL;

//SpringBoot的测试环境
@SpringBootTest(classes = Main.class)
@RunWith(SpringRunner.class)
public class huiBoTest {
    //依赖注入Mapper层使用新增方法即可将数据导入数据库
    @Autowired(required = false)
    private org.example.Mapper.mapper mapper;

    @Test
    public void huiBoShuJuTest() throws IOException {
        String url = "https://www.huibo.com/cq/jobs/xiaoshouguwen/";
        Document dom = Jsoup.parse(new URL(url),5000);
        Element hoemCompanyBox = dom.getElementById("job_list_table");
        Elements hoemCompanyList = dom.getElementsByClass("postIntro");
        int id = 0;
//        String[] split= new String[];
        for (Element el:hoemCompanyList){
            id++;
            work gz = new work();
            String wc_name = el.getElementsByClass("name").eq(0).text();//导入名字
            String wc_unit = el.getElementsByClass("wc_unit").eq(0).text();//导入公司人数
            //对数据进行处理，-后面的数据不要
            wc_unit = wc_unit.split("-")[0];
            //对数据进行处理，“”内的内容不要
            wc_unit = wc_unit.replace("人以上","");

            String wr_num = el.getElementsByClass("wr_num").eq(0).text();//导入岗位数
            String wc_unit1 = el.getElementsByClass("wc_unit").eq(1).text();//导入分类

//            split = wc_unit.split("-");

            gz.setId(id);
            gz.setFenLei(wc_unit1);
            gz.setRenShu(wc_unit);
            gz.setGangWeiShu(wc_unit);
            gz.setName(wc_name);

            mapper.insert(gz);
        }
        System.out.println("导入数据成功");


    }

}
/**
 * 实训报告
 *
 * */
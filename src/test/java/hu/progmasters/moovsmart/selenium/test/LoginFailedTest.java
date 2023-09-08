package hu.progmasters.moovsmart.selenium.test;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class LoginFailedTest {

    WebDriver driver;

    @BeforeAll
    static void setupClass() {
        WebDriverManager.chromedriver().setup();
    }

    @BeforeEach
    void setupTest() {
        ChromeOptions options = new ChromeOptions();
//        options.addArguments("headless");
//        options.addArguments("disable-extensions");
//        options.addArguments("start-maximized");
//        options.addArguments("incognito");
        driver = new ChromeDriver(options);
    }

    @Test
    public void loginFailed() {
        driver.get("https://propertyforyou.progmasters.hu/");
        driver.manage().window().setSize(new Dimension(1684, 1015));
        driver.findElement(By.linkText("Login / Sign Up")).click();
        driver.findElement(By.id("email")).click();
        driver.findElement(By.id("email")).sendKeys("sdsd");
        driver.findElement(By.id("pass")).click();
        driver.findElement(By.id("pass")).sendKeys("adad");
        driver.findElement(By.id("firstname")).click();
        driver.findElement(By.id("firstname")).sendKeys("ad");
        driver.findElement(By.id("lastname")).click();
        driver.findElement(By.id("lastname")).sendKeys("ad");
//        driver.findElement(By.cssSelector(".btn")).click();
//        driver.findElement(By.cssSelector("html")).click();
//        driver.findElement(By.cssSelector(".form-group:nth-child(1)")).click();
//        driver.findElement(By.cssSelector(".form-group:nth-child(1) > .text-danger:nth-child(1)")).click();
//        driver.findElement(By.cssSelector("html")).click();
//        assertThat(driver.findElement(By.cssSelector("html")).getText(), is("Buy\\\\nRent\\\\nSell\\\\nDetails demo\\\\nRight\\\\nLogin / Sign Up\\\\nLogin\\\\nRegister\\\\nEmail address\\\\nThe given email is invalid!\\\\nPassword\\\\nPassword must contain an uppercase character, a lowercase character, a digit, and must consist of 6-20 characters!\\\\nFirst Name\\\\nLast Name\\\\nRegister\\\\n© 2023 Copyright: pfy.com"));
    }

    @AfterEach
    void teardown() {
        driver.quit();
    }
}


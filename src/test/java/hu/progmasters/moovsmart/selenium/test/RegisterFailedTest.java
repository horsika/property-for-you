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

import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

public class RegisterFailedTest {

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
    public void registerFailed() {
        driver.get("https://propertyforyou.progmasters.hu/");
        driver.manage().window().setSize(new Dimension(1280, 714));
        driver.findElement(By.linkText("Login / Sign Up")).click();
        driver.findElement(By.id("email")).click();
        driver.findElement(By.id("email")).sendKeys("eva.pinter@bellresearch.com");
        driver.findElement(By.id("firstname")).sendKeys("Eva");
        driver.findElement(By.id("lastname")).sendKeys("Pinter");
        driver.findElement(By.id("pass")).click();
        driver.findElement(By.cssSelector(".card-body")).click();
        driver.findElement(By.cssSelector(".card-footer")).click();
        driver.findElement(By.cssSelector(".card-body")).click();
//        assertThat(driver.findElement(By.cssSelector(".text-danger:nth-child(3)")).getText(), is("Please enter a valid password!"));
    }

    @AfterEach
    void teardown() {
        driver.quit();
    }
}


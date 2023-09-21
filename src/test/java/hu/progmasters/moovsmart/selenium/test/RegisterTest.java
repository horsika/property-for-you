package hu.progmasters.moovsmart.selenium.test;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

public class RegisterTest {

    WebDriver driver;

    /*
    @BeforeAll
    static void setupClass() {
        WebDriverManager.chromedriver().setup();
    }
     */

    @BeforeEach
    void setupTest() {
        System.setProperty("webdriver.chrome.driver", RegisterTest.class.getClassLoader().getResource("chromedriver.exe").getFile());
        ChromeOptions options = new ChromeOptions();
//        options.addArguments("headless");
//        options.addArguments("disable-extensions");
        options.addArguments("start-maximized");
//        options.addArguments("incognito");
        driver = new ChromeDriver(options);
    }

    @Test
    public void registerFailedEmailAlreadyInUse() {
        driver.get("https://propertyforyou.progmasters.hu/");
        driver.findElement(By.linkText("Login / Sign Up")).click();
        driver.findElement(By.id("email")).sendKeys("horsika97@gmail.com");
        driver.findElement(By.id("pass")).sendKeys("Puding97");
        driver.findElement(By.id("pass2")).sendKeys("Puding97");
        driver.findElement(By.id("firstname")).sendKeys("Orsi");
        driver.findElement(By.id("lastname")).sendKeys("Hegedus");
        driver.findElement(By.cssSelector(".btn")).click();

        try { // wait 5 sec for server to answer
            Thread.sleep(5_000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        assertThat(driver.findElement(By.cssSelector(".text-danger")).getText(), is("User with given email already exists!"));

    }

    @Test
    public void registerFailPasswordsDontMatch() {
        driver.get("https://propertyforyou.progmasters.hu/");
        driver.findElement(By.linkText("Login / Sign Up")).click();
        driver.findElement(By.id("email")).sendKeys("horsika97@gmail.com");
        driver.findElement(By.id("pass")).sendKeys("Puding97");
        driver.findElement(By.id("pass2")).sendKeys("puding");
        driver.findElement(By.id("firstname")).click(); // click away from pass2 to activate error msg
        assertThat(driver.findElement(By.cssSelector(".form-group:nth-child(3) > .text-danger:nth-child(3)")).getText(), is("The given passwords do not match!"));
    }

    @Test
    public void registerFailPasswordDoesntMatchRegex() {
        driver.get("https://propertyforyou.progmasters.hu/");
        driver.findElement(By.linkText("Login / Sign Up")).click();
        driver.findElement(By.id("email")).sendKeys("horsika97@gmail.com");
        driver.findElement(By.id("pass")).sendKeys("pw");
        driver.findElement(By.id("pass2")).click();
        assertThat(driver.findElement(By.cssSelector(".text-danger:nth-child(3)")).getText(), is("Please enter a valid password!"));
    }

    @Test
    public void registerSucceeded() {
        driver.get("https://propertyforyou.progmasters.hu/");
        driver.findElement(By.linkText("Login / Sign Up")).click();
        driver.findElement(By.id("email")).sendKeys("orsolyahegedus97@gmail.com");
        driver.findElement(By.id("pass")).sendKeys("Puding97");
        driver.findElement(By.id("pass2")).sendKeys("Puding97");
        driver.findElement(By.id("firstname")).sendKeys("Orsi");
        driver.findElement(By.id("lastname")).sendKeys("Hegedus");
        driver.findElement(By.cssSelector(".btn")).click();

        try { // wait 5 sec for server to answer
            Thread.sleep(5_000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        assertThat(driver.findElement(By.cssSelector(".text-info-emphasis")).getText(), is("We've sent an email to you. Please click the link inside to verify yourself. Then, you may log in."));
    }

    @AfterEach
    void teardown() {
        driver.quit();
    }
}


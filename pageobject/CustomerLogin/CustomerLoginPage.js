const { expect } = require('@playwright/test');

class CustomerLoginPage {

    constructor(page) {
        this.page=page;
        this.customerDropdown=page.locator('#userSelect');
        this.loginButton=page.getByRole('button',{name:'Login'});
        this.welcomeMessage=page.locator('strong').filter({ hasText:'Welcome'});
        this.accountNumber=page.locator('div.center strong').first();
    }

    async verifyCustomerLoginPageURL() 
    {
        await expect(this.page).toHaveURL('https://www.way2automation.com/angularjs-protractor/banking/#/customer');
        console.log("User navigate to Customer Login Page")
    }

    async verifyCustomerLoginPageElements() 
    {
        await expect(this.customerDropdown).toBeVisible();
    }

    async selectCustomer(customerName) 
    {
        await expect(this.customerDropdown).toBeVisible();
        await this.customerDropdown.selectOption({label:customerName});
        console.log("Customer selected from dropdown:",customerName);
    }

    async verifyLoginButton() 
    {
        await expect(this.loginButton).toBeVisible();
    }

    async clickLogin() 
    {
        await expect(this.loginButton).toBeVisible();
        await this.loginButton.click();
        console.log("Login Button clicked")
    }

    async verifyAccountPageURL() 
    {
        await expect(this.page).toHaveURL('https://www.way2automation.com/angularjs-protractor/banking/#/account');
        console.log("Customer Login Sucessfull");
    }

    async verifyCustomerName(customerName) 
    {
        await expect(this.page.getByText(`Welcome ${customerName} !!`)).toBeVisible();
         console.log(`Customer Name after login successful: ${customerName}`);
    }

    async verifyAccountNumber(accountNumber) 
    {
        await expect(this.page.getByText(`Account Number : ${accountNumber}`)).toBeVisible();
         console.log(`Customer Account Number after login successful: ${accountNumber}`);
    }
}

module.exports = { CustomerLoginPage };
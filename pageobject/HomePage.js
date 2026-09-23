const { expect } = require('@playwright/test');

class HomePage {

    constructor(page) {
        this.page=page;

        // Home screen elements
        this.sampleFormButton=page.getByRole('link',{ name:'Sample Form'});
        this.customerLoginButton=page.getByRole('button',{name:'Customer Login'});
        this.bankManagerLoginButton=page.getByRole('button',{name:'Bank Manager Login'});
        this.lifetimeMembershipButton=page.getByRole('link',{name:'Lifetime Membership'});
        this.homeButton=page.getByRole('button',{name:'Home'});
    }

    // Method 1:Go to URL
    async gotoUrl() 
    {
        await this.page.goto('https://www.way2automation.com/angularjs-protractor/banking/#/login');
    }

    // Method 2:Verify Home Screen URL
    async verifyHomeScreenURL() {

        await expect(this.page).toHaveURL('https://www.way2automation.com/angularjs-protractor/banking/#/login');
    }

    // Method 3:Verify all Home Screen elements are visible
    async verifyHomeScreenElements() 
    {
        await expect(this.sampleFormButton).toBeVisible();
        await expect(this.customerLoginButton).toBeVisible();
        await expect(this.bankManagerLoginButton).toBeVisible();
        await expect(this.lifetimeMembershipButton).toBeVisible();
        await expect(this.homeButton).toBeVisible();
    }

    // Navigate to Bank Manager Login
    async clickBankManagerLogin() 
    {
        await expect(this.bankManagerLoginButton).toBeVisible();
        await this.bankManagerLoginButton.click();
    }

// Navigate to Customer Login
    async clickCustomerLogin() 
    {
        await expect(this.customerLoginButton).toBeVisible();
        await this.customerLoginButton.click();
    }
}

module.exports = { HomePage };
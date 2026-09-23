const { expect } = require('@playwright/test');

class BankManagerDashboard {

    constructor(page) {
        this.page = page;
        this.addCustomerButton=page.getByRole('button',{name:'Add Customer'});
        this.openAccountButton=page.getByRole('button',{name:'Open Account'});
        this.customersButton=page.getByRole('button',{ name:'Customers'});
        this.homeButton=page.getByRole('button',{name:'Home'});
    }

    async verifyBankManagerScreenURL() {
        await expect(this.page).toHaveURL(
            'https://www.way2automation.com/angularjs-protractor/banking/#/manager'
        );
    }

    async verifyBankManagerScreenElements() {
        await expect(this.addCustomerButton).toBeVisible();
        await expect(this.openAccountButton).toBeVisible();
        await expect(this.customersButton).toBeVisible();
    }

    async clickHomeButton() {
        await expect(this.homeButton).toBeVisible();
        await this.homeButton.click();
        console.log("Home Button clicked");
    }

    async clickAddCustomer() {
        await expect(this.addCustomerButton).toBeVisible();
        await this.addCustomerButton.click();
        console.log("Add customer button clicked");
    }

    async clickOpenAccount() {
        await expect(this.openAccountButton).toBeVisible();
        await this.openAccountButton.click();
        console.log("Open Account button clicked");
    }

    async clickCustomers() {
        await expect(this.customersButton).toBeVisible();
        await this.customersButton.click();
        console.log("Form Add Customers button clicked");
    }
}

module.exports = { BankManagerDashboard };
const { expect } = require('@playwright/test');

class OpenAccountPage 
{
    constructor(page) 
    {
        this.page = page;
        this.customerDropdown=page.locator('#userSelect');
        this.currencyDropdown=page.locator('#currency');
        this.processButton=page.getByRole('button', { name:'Process'});
    }

    //method 1: Verify the Open Account field is visible
    async verifyOpenAccountPageElements() 
    {
        await expect(this.customerDropdown).toBeVisible();
        await expect(this.currencyDropdown).toBeVisible();
        await expect(this.processButton).toBeVisible();
    }

    //method 2: verify and choose the customer name from the customer dropdown
    async selectCustomer(customerName) 
    {
        await expect(this.customerDropdown).toBeVisible();
        await this.customerDropdown.selectOption({label:customerName});
        console.log("Customer Name selected to open accouunt from DropDown:",customerName);
    }

    //method 3: verify currencyfield and select the currency from dropdown
    async selectCurrency(currency) 
    {
        await expect(this.currencyDropdown).toBeVisible();
        await this.currencyDropdown.selectOption({label:currency});
        console.log("Currency selected from DropDown:",currency);
    }

    //method 4: create a method just to select the customer and the currency
    async selectCustomerAndCurrency(customerName, currency) 
    {
        await this.selectCustomer(customerName);
        await this.selectCurrency(currency);
    }

    //method 5: click process button and save the account number from the dialog window
    async clickProcess() 
    {
        await expect(this.processButton).toBeVisible();
        const dialogPromise = new Promise(resolve => 
            {
            this.page.once('dialog', async dialog => 
                {
                    const message = dialog.message();
                    console.log('Dialog message:', message);
                    const accountNumber = message.split('account Number :')[1].trim();
                    console.log('Created Account Number:',accountNumber);
                    await dialog.accept();
                    resolve(accountNumber);
                });
        });
        await this.processButton.click();
        return await dialogPromise;
    }
}

module.exports = { OpenAccountPage };
const { expect } = require('@playwright/test');

class AddCustomerPage {

    constructor(page) {
        this.page = page;
        // Add Customer page elements
        this.firstNameInput=page.getByPlaceholder('First Name');
        this.lastNameInput=page.getByPlaceholder('Last Name');
        this.postCodeInput=page.getByPlaceholder('Post Code');
        this.addCustomerButton=page.getByRole('button',{name:'Add Customer'}).nth(1);
    }

    // Method 1: Verify Add Customer page elements
    async verifyAddCustomerPageElements() 
    {
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.postCodeInput).toBeVisible();
        await expect(this.addCustomerButton).toBeVisible();
    }

    // Method 2: Fill First Name
    async enterFirstName(firstName) 
    {
        await expect(this.firstNameInput).toBeVisible();
        await this.firstNameInput.fill(firstName);
        console.log("Customer first name:",firstName);
    }

    // Method 3: Fill Last Name
    async enterLastName(lastName) 
    {
        await expect(this.lastNameInput).toBeVisible();
        await this.lastNameInput.fill(lastName);
        console.log("Customer last name:",lastName);
    }

    // Method 4: Fill Post Code
    async enterPostCode(postCode) 
    {
        await expect(this.postCodeInput).toBeVisible();
        await this.postCodeInput.fill(postCode);
        console.log("Customer postcode entered:",postCode);
    }

    // Method 5: Fill Customer Details
    async enterCustomerDetails(firstName,lastName,postCode) 
    {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterPostCode(postCode);
    }

    //Click AddCustomer button and store the generate id from the dialog window
    async clickAddCustomer() {
        await expect(this.addCustomerButton).toBeVisible();

        const dialogPromise = new Promise(resolve=> 
            {
            this.page.once('dialog',async dialog=> 
                {
                    const message = dialog.message();
                    console.log('Dialog message:',message);
                    const customerId = message.split('customer id :')[1].trim();
                    console.log('Customer ID:', customerId);
                    await dialog.accept();
                    resolve(customerId);
            });
        });
        await this.addCustomerButton.click();
        return await dialogPromise;
    }

}

module.exports = {AddCustomerPage};
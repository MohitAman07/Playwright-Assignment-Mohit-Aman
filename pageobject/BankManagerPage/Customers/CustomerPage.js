const { expect } = require('@playwright/test');

class CustomerPage {

    constructor(page) 
    {
        this.page=page;
        this.customerRows=page.locator('table tbody tr');
    }

    async verifyCustomerPageURL() 
    {
        await expect(this.page).toHaveURL('https://www.way2automation.com/angularjs-protractor/banking/#/manager/list');
        console.log("Navigate to Customers Dashboard");
    }

    async verifyCustomerList() 
    {
        await expect(this.customerRows.first()).toBeVisible();
    }

    async printAllCustomers() 
    {
        const rows = await this.customerRows.all();
        console.log('-----Customer List-----');
        for (let i=0;i<rows.length;i++) 
            {
                const customerData = await rows[i].locator('td').allTextContents();
                console.log(customerData);
            }
    }

    //method : to verify if the customer account is added in the customer list
    async verifyCustomerAdded(firstName,lastName,postCode,accountNumber) 
    {
        const customerName=`${firstName} ${lastName}`;
        const rows=await this.customerRows.all();
        for (let i=0;i<rows.length;i++) 
            {
            const customerData=await rows[i].locator('td').allTextContents();
            const firstNameFromTable=customerData[0].trim();
            const lastNameFromTable=customerData[1].trim();
            const postCodeFromTable=customerData[2].trim();
            const accountNumberFromTable=customerData[3].trim();

            if (firstNameFromTable===firstName && lastNameFromTable===lastName &&  postCodeFromTable===postCode &&  accountNumberFromTable === accountNumber) 
                {
                    console.log(`New customer verified: ${customerName} | Post Code: ${postCodeFromTable} | Account Number: ${accountNumberFromTable}`);
                    return;
                }
        }
        throw new Error(`Customer details not found: ${customerName}, ${postCode}, ${accountNumber}`);
    }
}

module.exports={CustomerPage};
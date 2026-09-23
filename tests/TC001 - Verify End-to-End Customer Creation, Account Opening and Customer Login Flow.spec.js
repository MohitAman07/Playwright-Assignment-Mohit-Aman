const { test }=require('@playwright/test');
const { HomePage }=require('../pageobject/HomePage.js');
const { BankManagerDashboard }=require('../pageobject/BankManagerPage/BankManagerDashboard.js');
const { AddCustomerPage }=require('../pageobject/BankManagerPage/AddCustomer/AddCustomerPage.js');
const { OpenAccountPage }=require('../pageobject/BankManagerPage/OpenAccount/OpenAccountPage.js');
const { CustomerPage }=require('../pageobject/BankManagerPage/Customers/CustomerPage.js');
const { CustomerLoginPage }=require('../pageobject/CustomerLogin/CustomerLoginPage.js');
const { ExcelUtil } = require('../utils/ExcelUtil.js');

test('TC001-Verify End-to-End Customer Creation,Account Opening and Customer Login Flow',async({page})=>{

    const excelUtil=new ExcelUtil('./test-data/TestData.xlsx');
    const testData=excelUtil.getTestData('CustomerData','TC001');

    for (const data of testData) {

    const homePage=new HomePage(page);
    const bankManagerDashboard=new BankManagerDashboard(page);
    const addCustomerPage=new AddCustomerPage(page);
    const openAccountPage=new OpenAccountPage(page);
    const customerPage=new CustomerPage(page);
    const customerLoginPage=new CustomerLoginPage(page);


    const firstName=data.FirstName;
    const lastName=data.LastName;
    const postCode=data.PostCode;
    const currency=data.Currency;
    const customerName=`${firstName} ${lastName}`;

    //Launch Banking Application
    await homePage.gotoUrl();

    //Verify Home Screen URL
    await homePage.verifyHomeScreenURL();

    //Verify Home Screen elements
    await homePage.verifyHomeScreenElements();

    // Navigate to Bank Manager Login
    await homePage.clickBankManagerLogin();

    // Verify Bank Manager Screen URL
    await bankManagerDashboard.verifyBankManagerScreenURL();

    // Verify Bank Manager Screen elements
    await bankManagerDashboard.verifyBankManagerScreenElements();

    // Navigate to Add Customer
    await bankManagerDashboard.clickAddCustomer();

    // Verify Add Customer page elements
    await addCustomerPage.verifyAddCustomerPageElements();

    // Enter Customer Details
    await addCustomerPage.enterCustomerDetails(firstName,lastName,postCode);

    const customerId=await addCustomerPage.clickAddCustomer();
    console.log('Customer ID:',customerId);

    await bankManagerDashboard.clickOpenAccount();

    await openAccountPage.verifyOpenAccountPageElements();

    // Select customer
    await openAccountPage.selectCustomer(customerName);

    // Select currency
    await openAccountPage.selectCurrency(currency);

    // Process account
    const accountNumber = await openAccountPage.clickProcess();

    console.log('Created Account Number:', accountNumber);

    await bankManagerDashboard.clickCustomers();

     // Verify Customers page URL
    await customerPage.verifyCustomerPageURL();

    // Verify Customer List
    await customerPage.verifyCustomerList();

    // Print all customers
    await customerPage.printAllCustomers();

    // Verify newly created customer details
    await customerPage.verifyCustomerAdded(firstName,lastName,postCode,accountNumber);

    await bankManagerDashboard.clickHomeButton();

    // Navigate to Customer Login
    await homePage.clickCustomerLogin();

    // Verify Customer Login page URL
    await customerLoginPage.verifyCustomerLoginPageURL();

    // Verify Customer Login page elements
    await customerLoginPage.verifyCustomerLoginPageElements();

    // Select created customer
    await customerLoginPage.selectCustomer(customerName);

    // Verify Login button
    await customerLoginPage.verifyLoginButton();

    // Login as created customer
    await customerLoginPage.clickLogin();

    // Verify Customer Account page URL
    await customerLoginPage.verifyAccountPageURL();

    // Verify customer name
    await customerLoginPage.verifyCustomerName(customerName);

    // Verify account number
    await customerLoginPage.verifyAccountNumber(accountNumber);

    }


});



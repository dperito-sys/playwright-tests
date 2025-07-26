// @ts-check
// import module from other directory
import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';

// console.log ('SUPERADMIN', process.env.SUPERADMIN);
// console.log('PASSWORD', process.env.PASSWORD);

test.beforeEach(async ({ page }) => {
    const superadmin = process.env.SUPERADMIN || '';
    const password = process.env.PASSWORD || '';
    
    await page.goto('https://staging-io-web.excelym.com/');
    //wait for page to have title
    await expect(page).toHaveTitle(/NetSuite/);
    await page.fill('#email', superadmin);
    await page.fill('#password', password);
    await page.getByRole('button', { name: 'Login' }).click();
    //wait for the integration nav bar displays
    await expect(page.locator('#TopNavBar > div.float-left > a')).toContainText('Excelym');
});

test.describe('Execute an Integration Manually', () => {
    test('Run Shopify Customers to NetSuite Customers manually', async ({ page }) => {
        await page.getByRole('link', { name: 'Integrations' }).click();
        await page.getByRole('textbox', { name: 'Search name' }).click();
        await page.getByRole('textbox', { name: 'Search name' }).fill('ShopifycustomertoNScustomer');
        await page.getByRole('link', { name: 'ShopifyCustomerToNSCustomer' }).click();
        await page.getByRole('button', { name: ' Execute Task' }).click();
        await page.getByRole('dialog').getByText('ShopifyCustomerToNSCustomer has been successfully added to job-queue.').click();

    });
});

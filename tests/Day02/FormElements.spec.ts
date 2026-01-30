import{test,expect} from '@playwright/test';

test.beforeEach(async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    })

test.describe("Form elements", async()=>{
    test.skip("text box and Radio Button" , async({page})=>{

        const nameField=page.getByPlaceholder("Enter Name");
        const genderRadioBtn=page.getByText("Male").nth(1);

        await nameField.fill("John");
        await expect(nameField).toHaveValue("John");

        await genderRadioBtn.check();
        await expect(genderRadioBtn).toBeChecked();

        })

        test.skip("CheckBox",async({page})=>{
            const day1=page.getByText("Sunday");
            const day2=page.getByText("Monday");
            const day3=page.getByText("Tuesday");

            await day1.check();
            await day2.check();
            await day3.check();
            await day3.isChecked();
            await expect(day2).toBeChecked();
        }  )

        test.skip('textbox2 and radio button2', async({page})=>{

            const day1=page.getByText("Sunday");
            const day2=page.getByText("Monday");
            const day3=page.getByText("Tuesday");

            const checkArray=[day1,day2,day3]

            for(const each of checkArray){
                await each.check();
                await expect(each).toBeChecked();
            }

        })


        test('DropDowns intro', async({page})=>{

            const dropDowns= page.getByText("Country:");

            await dropDowns.selectOption("Canada");
            //await dropDowns.selectOption("Ireland"); --failed
            await dropDowns.selectOption({index:7});
            await dropDowns.selectOption({value:"germany"});


            const options=page.locator('#country option');
            await expect(options).toHaveCount(10);
          
            //allTextContents() - return:promise -- "await"
            expect(await options.allTextContents()).not.toContain('Ireland');

            //Array: $$ bu işaret array yapıyor verilen locaterdaki elementleri.
            const optionsArray=page.$$('#country option');
              expect(await optionsArray).toHaveLength(10);

              //Loop:
              let status: boolean;
              status=false;
              for(const each of await optionsArray){
                let opt=await each.textContent();
                if(opt=='China'){
                    status=true;
                    break;
                }
              }

              expect(status).toBeFalsy();

        })

})
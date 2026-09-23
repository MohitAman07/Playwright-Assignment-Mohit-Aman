const XLSX = require('xlsx');

class ExcelUtil {

     constructor() {
        this.filePath = path.join(process.cwd(),'testdata','TestData.xlsx');
    }

    getTestData(sheetName,testCase) 
    {
        const workbook=XLSX.readFile(this.filePath);
        const worksheet=workbook.Sheets[sheetName];
        const data=XLSX.utils.sheet_to_json(worksheet);
        const testData=data.filter(row=>row.TestCase===testCase);
        if (testData.length===0) 
            {
                throw new Error(`Test data not found for Test Case: ${testCase}`);
            }
        return testData;
    }
}

module.exports = { ExcelUtil };
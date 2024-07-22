import {branchDetails} from "./db.js";
import BranchModel from "./BranchModel.js";

$(`#btnGenerate`).on(`click`, () => {

    setNetworkType();
    selectNetworkClass(branchDetails);





})

function selectNetworkClass(data) {
    const branchEmployeeCounts = {};

    data.forEach(item => {
        if (!branchEmployeeCounts[item.branch]) {
            branchEmployeeCounts[item.branch] = 0;
        }
        branchEmployeeCounts[item.branch] += item.employeeCount;
    });

    let maxEmployees = 0;
    let maxBranch = '';

    for (const [branch, count] of Object.entries(branchEmployeeCounts)) {
        if (count > maxEmployees) {
            maxEmployees = count;
            maxBranch = branch;
        }
    }

    if (maxEmployees < 200) {
        $(`#networkClass`).text(`Class C`);
    } else if (maxEmployees < 1000) {
        $(`#networkClass`).text(`Class B`);
    }
    
}

function setNetworkType(){
    var count = getBranchesCount(branchDetails);
    console.log(count)

    if (count === 1) {
        $(`#networkType`).text(`LAN (Local Area Network)`);
    } else {
        $(`#networkType`).text(`MAN (Metropolitan Area Network)`);
    }
}

function getBranchesCount(branches) {
    const uniqueLocations = new Set();

    branches.forEach(brnch => {
        uniqueLocations.add(brnch.branch);
    });

    return uniqueLocations.size;
}


$(`#btnAdd`).on(`click`, () => {
    const branch = document.getElementById('branch').value;
    const sector = document.getElementById('sector').value;
    const numOfCom = document.getElementById('noOfComputers').value;

    if (branch == "" || sector == "" || numOfCom == "") {
        alert("Please fill all the fields");
    } else {
        let branchDetail = new BranchModel(branch, sector, numOfCom);
        branchDetails.push(branchDetail);
        console.log(branchDetails);

        clearFields()
        loadBranchTable()
    }
});

function clearFields() {
    $('#branch').val("");
    $('#sector').val("");
    $('#noOfComputers').val("");
}

function loadBranchTable() {
    $('#tableBody').empty();

    branchDetails.map((branch,index) => {
        var branchName = branch.branch;
        var sectorName = branch.sector;
        var numOfComputers = branch.numOfCom;

        var record = `<tr>
        <td class="cus-id-val">${branchName}</td>
        <td class="cus-fname-val">${sectorName}</td>
        <td class="cus-address-val">${numOfComputers}</td>
    </tr>`;

        console.log(record)

        $('#configTable').append(record);
    });

}


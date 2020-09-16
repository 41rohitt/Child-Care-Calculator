$(document).ready(function () {
  $(".dropdown-trigger").dropdown();
  $(".tabs").tabs();
  $("select").formSelect();
});

//GLOBAL VARIABLES
var stateSelected,
  ratioSelected,
  infantClassrooms,
  toddlerClassrooms,
  pre3Classrooms,
  pre4Classrooms,
  classTotal,
  infantGroupSize,
  toddlerGroupSize,
  pre3GroupSize,
  pre4GroupSize,
  infantChildren,
  toddlerChildren,
  pre3Children,
  pre4Children,
  childTotal,
  salaryLevelCC,
  noOfAssistantTeachers,
  noOfProgramDirectors,
  noOfAssistantDirectors,
  noOfAdministrativeAssistants,
  noOfLeadTeachers,
  noOfSubstituteTeachers,
  salaryProgramDirectors,
  salaryAssistantDirectors,
  salaryAdministrativeAssistants,
  salaryLeadTeachers,
  salaryAssistantTeachers,
  salarySubsTeachers,
  wageProgramDirectors,
  wageAssistantDirectors,
  wageAdministrativeAssistants,
  wageLeadTeachers,
  wageAssistantTeachers,
  wageSubsTeachers,
  totalTeachers,
  sickDays,
  paidLeave,
  costPerFTEmployee,
  adminStaffTotalWage,
  teachingStaffTotalWage,
  staffTotalWage,
  totalTeachingStaff,
  subsCostForPaidLeave,
  subsCostForSickLeave,
  subsCostForLeaveTotal,
  subTotalWages,
  mandatoryBenefitsVal,
  mandatoryBenefitsSalary,
  totalStaff,
  additionalBenefits,
  personnelSubtotal,
  costPerClassroom,
  sanitationCost,
  eduProgram,
  occupancy,
  progAndAdmin,
  nonpersonnelSubtotal,
  totalPersonnel,
  reserveFundPercentage,
  reserveFund,
  totalExpense,
  wageFloaterFCC;

//Infant Cost Variables
var infant_adminPersonnel,
  infantRatio,
  infantTeachers,
  leadSalary,
  infant_classPersonnel,
  infant_floaters,
  benefitsPerChild,
  infant_subs,
  NP_ed_program,
  infant_NP_occupancy,
  NP_admin,
  infant_cleaning,
  op_reserve,
  infant_cost;

//FAMILY HOME VARIABLES
var salaryLevelFCC;

//CONSTANT VARIABLES
var dailyCoverage = 0.2;

//json variables
var dataC, dataF, dataS;

//Reading Child Care JSON file
$.getJSON("json/child_care_center.json", function (data) {
  dataC = data;
});

//Reading Family Care JSON file
$.getJSON("json/family_care_center.json", function (data) {
  dataF = data;
});

//Reading System Cost JSON file
$.getJSON("json/system_costs.json", function (data) {
  dataS = data;
});

//FUNCTION TO GET STATE
function getState() {
  stateSelected = $("select").val();
  console.log(stateSelected + " --Selected State");
}

//FUNCTION TO CHECK IF STATE IS SELECTED
function checkState() {
  if (stateSelected == undefined) {
    $("#stateAlert").show(500);
    return false;
  } else {
    $("#stateAlert").hide(500);
    return true;
  }
}

//FUNCTION TO GET RATIOS
function getRatio() {
  ratioSelected = $("input[name='ratios']:checked").val();
  if (ratioSelected == "precovid") {
    $("input[type='checkbox']").prop("checked", true);
    $("input[name='costOfFTEmployee']").val(
      accounting.formatMoney(dataC[stateSelected].health_insurance).slice(0,-3)
    );
    $("#costOfFTEmployeeFCC").val(accounting.formatMoney(dataF[stateSelected].health_insurance).slice(0,-3));

    $("input[name='deepCleaningCost']").val(0);
    $("input[name='sanitationCost']").val(0);
    $("input[name='deepCleaningCostFCC']").val(0);
    $("input[name='sanitationCostFCC']").val(0);
  }

  if (ratioSelected == "covid") {
    $("input[type='checkbox']").prop("checked", true);
    $("input[name='costOfFTEmployee']").val(accounting.formatMoney(
      dataC[stateSelected].health_insurance).slice(0,-3)
    );
    $("#costOfFTEmployeeFCC").val(accounting.formatMoney(dataF[stateSelected].health_insurance).slice(0,-3));
  }
  console.log(ratioSelected + " --> Ratio Selected!");
}

/**********CHILD CARE CENTER***********/

//FUNCTION TO POPULATE SIZE OF CENTER FIELDS

function populateSizeOfCenter() {
  //POPULATING BASE VALUES FOR CLASSROOMS
  if ($("input[name='infantClassrooms']").val() == "") {
    $("input[name='infantClassrooms']").val(1);
  }

  if ($("input[name='toddlerClassrooms']").val() == "") {
    $("input[name='toddlerClassrooms']").val(1);
  }

  if ($("input[name='pre3Classrooms']").val() == "") {
    $("input[name='pre3Classrooms']").val(1);
  }

  if ($("input[name='pre4Classrooms']").val() == "") {
    $("input[name='pre4Classrooms']").val(1);
  }

  if (ratioSelected == "covid") {
    //POPULATING RATIOS COLUMN
    $("input[name='infantRatio']").val(dataC[stateSelected].covid_infant_ratio);
    $("input[name='toddlerRatio']").val(
      dataC[stateSelected].covid_toddler_ratio
    );
    $("input[name='pre3Ratio']").val(dataC[stateSelected].covid_pre3_ratio);
    $("input[name='pre4Ratio']").val(dataC[stateSelected].covid_pre4_ratio);

    //POPULATING GROUPSIZE COLUMN
    $("input[name='infantGroupSize']").val(
      dataC[stateSelected].covid_infant_groupsize
    );
    $("input[name='toddlerGroupSize']").val(
      dataC[stateSelected].covid_toddler_groupsize
    );
    $("input[name='pre3GroupSize']").val(
      dataC[stateSelected].covid_pre3_groupsize
    );
    $("input[name='pre4GroupSize']").val(
      dataC[stateSelected].covid_pre4_groupsize
    );
  }

  if (ratioSelected == "precovid") {
    //POPULATING RATIOS COLUMN
    $("input[name='infantRatio']").val(
      dataC[stateSelected].pre_covid_infant_ratio
    );
    $("input[name='toddlerRatio']").val(
      dataC[stateSelected].pre_covid_toddler_ratio
    );
    $("input[name='pre3Ratio']").val(dataC[stateSelected].pre_covid_pre3_ratio);
    $("input[name='pre4Ratio']").val(dataC[stateSelected].pre_covid_pre4_ratio);

    //POPULATING GROUPSIZE COLUMN
    $("input[name='infantGroupSize']").val(
      dataC[stateSelected].pre_covid_infant_groupsize
    );
    $("input[name='toddlerGroupSize']").val(
      dataC[stateSelected].pre_covid_toddler_groupsize
    );
    $("input[name='pre3GroupSize']").val(
      dataC[stateSelected].pre_covid_pre3_groupsize
    );
    $("input[name='pre4GroupSize']").val(
      dataC[stateSelected].pre_covid_pre4_groupsize
    );
  }

  calcTotalChildren();
}

//FUNCTION TO CALCULATE TEACHERS
function calcTeachersCC() {
  var infantTeacher = Math.ceil(
    parseInt($("input[name='infantChildren']").val()) /
      parseInt($("input[name='infantRatio']").val())
  );
  var toddlerTeacher = Math.ceil(
    parseInt($("input[name='toddlerChildren']").val()) /
      parseInt($("input[name='toddlerRatio']").val())
  );
  var pre3Teacher = Math.ceil(
    parseInt($("input[name='pre3Children']").val()) /
      parseInt($("input[name='pre3Ratio']").val())
  );
  var pre4Teacher = Math.ceil(
    parseInt($("input[name='pre4Children']").val()) /
      parseInt($("input[name='pre4Ratio']").val())
  );

  var totalTeach = infantTeacher + toddlerTeacher + pre3Teacher + pre4Teacher;

  $("#noOfLeadTeachers").val(classTotal);
  $("#noOfAssistantTeachers").val(totalTeach - classTotal);
  $("#noOfSubstituteTeachers").val((totalTeach * dailyCoverage).toFixed(1));
}

//FUNCTION TO CALCULATE TOTAL NO OF CHILDREN
function calcTotalChildren() {
  infantClassrooms = parseInt($("input[name='infantClassrooms']").val());
  toddlerClassrooms = parseInt($("input[name='toddlerClassrooms']").val());
  pre3Classrooms = parseInt($("input[name='pre3Classrooms']").val());
  pre4Classrooms = parseInt($("input[name='pre4Classrooms']").val());

  infantGroupSize = parseInt($("input[name='infantGroupSize']").val());
  toddlerGroupSize = parseInt($("input[name='toddlerGroupSize']").val());
  pre3GroupSize = parseInt($("input[name='pre3GroupSize']").val());
  pre4GroupSize = parseInt($("input[name='pre4GroupSize']").val());

  classTotal =
    infantClassrooms + toddlerClassrooms + pre3Classrooms + pre4Classrooms;

  $("#classTotal").html(classTotal);

  //POPULATING TOTAL CHILDREN COLUMN
  infantChildren = infantClassrooms * infantGroupSize;
  $("input[name='infantChildren']").val(infantChildren);

  toddlerChildren = toddlerClassrooms * toddlerGroupSize;
  $("input[name='toddlerChildren']").val(toddlerChildren);

  pre3Children = pre3Classrooms * pre3GroupSize;
  $("input[name='pre3Children']").val(pre3Children);

  pre4Children = pre4Classrooms * pre4GroupSize;
  $("input[name='pre4Children']").val(pre4Children);

  childTotal = infantChildren + toddlerChildren + pre3Children + pre4Children;
  $("#childTotal").html(childTotal);
}

//FUNCTION TO GET SALARY LEVEL OF THE STAFF
function getSalaryLevelCC() {
  salaryLevelCC = $("input[name='salary']:checked").val();

  //POPULATING BASE VALUES FOR STAFF FIELD
  if ($("#noOfProgramDirectors").val() == "") {
    $("#noOfProgramDirectors").val(1);
  }
  if ($("#noOfAssistantDirectors").val() == "") {
    $("#noOfAssistantDirectors").val(1);
  }
  if ($("#noOfAdministrativeAssistants").val() == "") {
    $("#noOfAdministrativeAssistants").val(1);
  }
  calcTeachersCC();
  populateStaff();
  populateBenefits();
  calcTotalPersonnelCost();
  calcTotalNonPersonnelCost();

  calcTotalExpense();

  //Cost per child calculations
  calcInfantsCost();
  calcToddlersCost();
  calcPre3Cost();
  calcPre4Cost();
}

//FUNCTION TO CALCULATE TOTAL EXPENSE
function calcTotalExpense() {
  //TOTAL COST OF PERSONNEL & NON PERSONNEL

  totalPersonnel = personnelSubtotal + nonpersonnelSubtotal;

  //reserve fund
  reserveFundPercentage = 0.05;
  reserveFund = reserveFundPercentage * totalPersonnel;

  //Total expense
  totalExpense = totalPersonnel + reserveFund;
}

//FUNCTION TO CHECK CHILD RATIO
function checkChildRatio(name) {
  ratio = parseInt($("input[name='" + name + "Ratio']").val());
  groupsize = parseInt($("input[name='" + name + "GroupSize']").val());

  if (ratio > groupsize) {
    $("#" + name).css("display", "block");
  } else {
    $("#" + name).css("display", "none");
  }
}

//FUNCTION TO POPULATE STAFF
function populateStaff() {
  noOfProgramDirectors = parseInt($("#noOfProgramDirectors").val());
  noOfAssistantDirectors = parseInt($("#noOfAssistantDirectors").val());
  noOfAdministrativeAssistants = parseInt(
    $("#noOfAdministrativeAssistants").val()
  );
  noOfLeadTeachers = parseInt($("#noOfLeadTeachers").val());
  noOfAssistantTeachers = parseInt($("#noOfAssistantTeachers").val());

  if (salaryLevelCC == "bls") {
    //Program Director
    salaryProgramDirectors =
      noOfProgramDirectors * dataC[stateSelected].bls_director_salary;
    $("#salaryProgramDirectors").val(
      accounting
        .formatMoney(dataC[stateSelected].bls_director_salary)
        .slice(0, -3)
    );
    wageProgramDirectors = dataC[stateSelected].bls_director_salary / 2080;
    $("#wageProgramDirectors").val(
      accounting.formatMoney(wageProgramDirectors)
    );

    //Assistant Director
    salaryAssistantDirectors =
      noOfAssistantDirectors *
      dataC[stateSelected].bls_assistant_director_salary;
    $("#salaryAssistantDirectors").val(
      accounting
        .formatMoney(dataC[stateSelected].bls_assistant_director_salary)
        .slice(0, -3)
    );
    wageAssistantDirectors =
      dataC[stateSelected].bls_assistant_director_salary / 2080;
    $("#wageAssistantDirectors").val(
      accounting.formatMoney(wageAssistantDirectors)
    );

    //Administrative Assistant
    salaryAdministrativeAssistants =
      noOfAdministrativeAssistants *
      dataC[stateSelected].bls_administrative_assistant_salary;
    $("#salaryAdministrativeAssistants").val(
      accounting
        .formatMoney(dataC[stateSelected].bls_administrative_assistant_salary)
        .slice(0, -3)
    );
    wageAdministrativeAssistants =
      dataC[stateSelected].bls_administrative_assistant_salary / 2080;
    $("#wageAdministrativeAssistants").val(
      accounting.formatMoney(wageAdministrativeAssistants)
    );

    //Lead Teacher
    salaryLeadTeachers =
      noOfLeadTeachers * dataC[stateSelected].bls_lead_teacher_salary;
    $("#salaryLeadTeachers").val(
      accounting
        .formatMoney(dataC[stateSelected].bls_lead_teacher_salary)
        .slice(0, -3)
    );
    wageLeadTeachers = dataC[stateSelected].bls_lead_teacher_salary / 2080;
    $("#wageLeadTeachers").val(accounting.formatMoney(wageLeadTeachers));

    //Assistant Teacher
    salaryAssistantTeachers =
      noOfAssistantTeachers * dataC[stateSelected].bls_assistant_teacher_salary;
    $("#salaryAssistantTeachers").val(
      accounting
        .formatMoney(dataC[stateSelected].bls_assistant_teacher_salary)
        .slice(0, -3)
    );
    wageAssistantTeachers =
      dataC[stateSelected].bls_assistant_teacher_salary / 2080;
    $("#wageAssistantTeachers").val(
      accounting.formatMoney(wageAssistantTeachers)
    );

    //Substitute Teacher
    totalTeachers = noOfLeadTeachers + noOfAssistantTeachers;

    //TO calc total no of floaters
    noOfSubstituteTeachers = parseFloat($("#noOfSubstituteTeachers").val());

    salarySubsTeachers =
      noOfSubstituteTeachers * dataC[stateSelected].bls_floater_salary;
    $("#salarySubsTeachers").val(
      accounting
        .formatMoney(dataC[stateSelected].bls_floater_salary)
        .slice(0, -3)
    );

    wageSubsTeachers = dataC[stateSelected].bls_floater_salary / 2080;
    $("#wageSubsTeachers").val(accounting.formatMoney(wageSubsTeachers));
  }

  if (salaryLevelCC == "kg") {
    //Program Director
    salaryProgramDirectors =
      noOfProgramDirectors * dataC[stateSelected].Kg_director_salary;
    $("#salaryProgramDirectors").val(
      accounting
        .formatMoney(dataC[stateSelected].Kg_director_salary)
        .slice(0, -3)
    );
    wageProgramDirectors = dataC[stateSelected].Kg_director_salary / 2080;
    $("#wageProgramDirectors").val(
      accounting.formatMoney(wageProgramDirectors)
    );

    //Assistant Director
    salaryAssistantDirectors =
      noOfAssistantDirectors *
      dataC[stateSelected].Kg_assistant_director_salary;
    $("#salaryAssistantDirectors").val(
      accounting
        .formatMoney(dataC[stateSelected].Kg_assistant_director_salary)
        .slice(0, -3)
    );
    wageAssistantDirectors =
      dataC[stateSelected].Kg_assistant_director_salary / 2080;
    $("#wageAssistantDirectors").val(
      accounting.formatMoney(wageAssistantDirectors)
    );

    //Administrative Assistant
    salaryAdministrativeAssistants =
      noOfAdministrativeAssistants *
      dataC[stateSelected].Kg_administrative_assistant_salary;
    $("#salaryAdministrativeAssistants").val(
      accounting
        .formatMoney(dataC[stateSelected].Kg_administrative_assistant_salary)
        .slice(0, -3)
    );
    wageAdministrativeAssistants =
      dataC[stateSelected].Kg_administrative_assistant_salary / 2080;
    $("#wageAdministrativeAssistants").val(
      accounting.formatMoney(wageAdministrativeAssistants)
    );

    //Lead Teacher
    salaryLeadTeachers =
      noOfLeadTeachers * dataC[stateSelected].Kg_lead_teacher_salary;
    $("#salaryLeadTeachers").val(
      accounting
        .formatMoney(dataC[stateSelected].Kg_lead_teacher_salary)
        .slice(0, -3)
    );
    wageLeadTeachers = dataC[stateSelected].Kg_lead_teacher_salary / 2080;
    $("#wageLeadTeachers").val(accounting.formatMoney(wageLeadTeachers));

    //Assistant Teacher
    salaryAssistantTeachers =
      noOfAssistantTeachers * dataC[stateSelected].Kg_assistant_teacher_salary;
    $("#salaryAssistantTeachers").val(
      accounting
        .formatMoney(dataC[stateSelected].Kg_assistant_teacher_salary)
        .slice(0, -3)
    );
    wageAssistantTeachers =
      dataC[stateSelected].Kg_assistant_teacher_salary / 2080;
    $("#wageAssistantTeachers").val(
      accounting.formatMoney(wageAssistantTeachers)
    );

    //Substitute Teacher
    totalTeachers = noOfLeadTeachers + noOfAssistantTeachers;

    //TO calc total no of floaters
    noOfSubstituteTeachers = parseFloat($("#noOfSubstituteTeachers").val());

    salarySubsTeachers =
      noOfSubstituteTeachers * dataC[stateSelected].Kg_floater_salary;
    $("#salarySubsTeachers").val(
      accounting
        .formatMoney(dataC[stateSelected].Kg_floater_salary)
        .slice(0, -3)
    );

    wageSubsTeachers = dataC[stateSelected].Kg_floater_salary / 2080;
    $("#wageSubsTeachers").val(accounting.formatMoney(wageSubsTeachers));
  }
}

//FUNCTION TO CONVERT SALARY TO WAGE
function salaryConverter(id) {
  if ($("#salary" + id).val() != "") {
    var salary = accounting.unformat($("#salary" + id).val());
    var wage = salary / 2080;
    $("#wage" + id).val(accounting.formatMoney(wage));
  }
}

//FUNCTION TO CONVERT WAGE TO SALARY
function wageConverter(id) {
  if ($("#wage" + id).val() != "") {
    var wage = accounting.unformat($("#wage" + id).val());
    var salary = wage * 2080;
    $("#salary" + id).val(accounting.formatMoney(salary).slice(0, -3));
  }
}

//FUNCTION TO ADD CUSTOM FIELD TO CHILD CARE CENTER
var customStaffCountCC = -1;
function addRow(divName) {
  var newRow = document.createElement("tr");
  $("#removeBtn").css("display", "block");

  customStaffCountCC = customStaffCountCC + 1;

  var str = "CustomStaff" + customStaffCountCC;

  newRow.innerHTML = `<td><div class='input-field'><input type='text' placeholder='Staff Name' id='customStaffName${customStaffCountCC}'style='background-color:transparent!important;max-width:100%;text-align:left;' onchange='addCustomStaff(this)'></div></td><td><div class='input-field'><input type='text'    id='noOfCustomStaff${customStaffCountCC}' value='0' onchange='addCustomStaff(this);'></div></td><td><div class='input-field'><input type='text' class='salaryCustomStaff' id='salaryCustomStaff${customStaffCountCC}' value='0' onchange='addCustomStaff(this);formatField(this);'></div></td><td><div class='input-field'><input type='text' class='wageCustomStaff' id='wageCustomStaff${customStaffCountCC}' value='0' onchange='addCustomStaff(this);formatField(this);'></div></td>`;

  document.getElementById(divName).appendChild(newRow);
}

//FUNCTION TO ADD CUSTOM FIELD TO FAMILY CARE CENTER
var customStaffCountFCC = -1;
function addRowFCC(divName) {
  var newRow = document.createElement("tr");

  $("#removeBtn2").css("display", "block");

  customStaffCountFCC = customStaffCountFCC + 1;

  var str = "CustomStaff" + customStaffCountFCC;

  newRow.innerHTML = `<td><div class='input-field'><input type='text' placeholder='Staff Name' id='customStaffNameFCC${customStaffCountFCC}'style='background-color:transparent!important;max-width:100%;text-align:left;' onchange='addCustomStaffFCC(this)'></div></td><td><div class='input-field'><input type='text'    id='noOfCustomStaffFCC${customStaffCountFCC}' value='0' onchange='addCustomStaffFCC(this);'></div></td><td><div class='input-field'><input type='text' class='salaryCustomStaff' id='salaryCustomStaffFCC${customStaffCountFCC}' value='0' onchange='addCustomStaffFCC(this);formatField(this);'></div></td><td><div class='input-field'><input type='text' class='wageCustomStaff' id='wageCustomStaffFCC${customStaffCountFCC}' value='0' onchange='addCustomStaffFCC(this);formatField(this);'></div></td>`;

  document.getElementById(divName).appendChild(newRow);
}

//FUNCTION TO REMOVE CUSTOM FIELD FROM CHILD CARE CENTER

function removeRow(divName) {
  customStaffCountCC = customStaffCountCC - 1;

  customStaffArr.pop();
  calcTotalPersonnelCost();
  calcTotalNonPersonnelCost();
  calcInfantsCost();
  calcToddlersCost();
  calcPre3Cost();
  calcPre4Cost();
  if (customStaffCountCC == -1) {
    $("#removeBtn").css("display", "none");
  }
  $("#" + divName + " tr")
    .last()
    .remove();
}

//FUNCTION TO REMOVE CUSTOM FIELD FROM FAMILY CARE CENTER

function removeRowFCC(divName) {
  customStaffCountFCC = customStaffCountFCC - 1;

  var popItem = customStaffArrFCC.pop();

  if (popItem != undefined) {
    totalFTEmployeeFCC = totalFTEmployeeFCC - popItem.customStaffNoFCC;
  }

  calcTotalWagesAndBenefitsFCC();
  calcInfantFCC();
  calcToddlerFCC();
  calcPre3FCC();
  calcPre4FCC();
  if (customStaffCountFCC == -1) {
    $("#removeBtn2").css("display", "none");
  }
  $("#" + divName + " tr")
    .last()
    .remove();
}

var customStaffArr = [];

//FUNCTION TO ADD CUSTOM STAFF TO CHILD CARE
function addCustomStaff(obj) {
  var name, number, salary, wage;
  var count = obj.id[obj.id.length - 1];

  if (obj.id == "salaryCustomStaff" + count) {
    salaryConverter("CustomStaff" + count);
  }

  if (obj.id == "wageCustomStaff" + count) {
    wageConverter("CustomStaff" + count);
  }

  if (
    $("#customStaffName" + count).val() != "" &&
    $("#noOfCustomStaff" + count).val() != 0 &&
    $("#salaryCustomStaff" + count).val() != 0 &&
    $("#wageCustomStaff" + count).val() != 0
  ) {
    name = $("#customStaffName" + count).val();
    number = parseInt($("#noOfCustomStaff" + count).val());
    salary = accounting.unformat($("#salaryCustomStaff" + count).val());
    wage = accounting.unformat($("#wageCustomStaff" + count).val());

    let staff = {
      customStaffName: name,
      customStaffNo: number,
      customStaffSalary: salary,
      customStaffWage: wage,
    };
    customStaffArr[count] = staff;
    // salaryConverter('CustomStaff'+count);
    // wageConverter('CustomStaff'+count);
    calcTotalPersonnelCost();
    calcTotalNonPersonnelCost();
    calcInfantsCost();
    calcToddlersCost();
    calcPre3Cost();
    calcPre4Cost();
  } else {
    return;
  }
}

var customStaffArrFCC = [];

//FUNCTION TO ADD CUSTOM STAFF TO FAMILY CARE
function addCustomStaffFCC(obj) {
  var name, number, salary, wage;
  var count = obj.id[obj.id.length - 1];

  if (obj.id == "salaryCustomStaffFCC" + count) {
    salaryConverter("CustomStaffFCC" + count);
  }

  if (obj.id == "wageCustomStaffFCC" + count) {
    wageConverter("CustomStaffFCC" + count);
  }

  if (
    $("#customStaffNameFCC" + count).val() != "" &&
    $("#noOfCustomStaffFCC" + count).val() != 0 &&
    $("#salaryCustomStaffFCC" + count).val() != 0 &&
    $("#wageCustomStaffFCC" + count).val() != 0
  ) {
    name = $("#customStaffNameFCC" + count).val();
    number = parseInt($("#noOfCustomStaffFCC" + count).val());
    salary = accounting.unformat($("#salaryCustomStaffFCC" + count).val());
    wage = accounting.unformat($("#wageCustomStaffFCC" + count).val());

    let staff = {
      customStaffNameFCC: name,
      customStaffNoFCC: number,
      customStaffSalaryFCC: salary,
      customStaffWageFCC: wage,
    };
    customStaffArrFCC[count] = staff;

    calcTotalWagesAndBenefitsFCC();
    calcInfantFCC();
    calcToddlerFCC();
    calcPre3FCC();
    calcPre4FCC();
  } else {
    return;
  }
}
//FUNCTION TO POPULATE BENEFITS

function populateBenefits() {
  //SICK DAYS

  sickDays = dataC[stateSelected].sick_days;
  $("#sickdays").val(sickDays);

  //PAID LEAVE

  paidLeave = dataC[stateSelected].paid_leave;
  $("#paidLeave").val(paidLeave);

  //COST PER FT EMPLOYEE
  if ($("input[type='checkbox']").prop("checked") == true) {
    costPerFTEmployee = dataC[stateSelected].health_insurance;
    $("input[name='costOfFTEmployee']").val(accounting.formatMoney(costPerFTEmployee).slice(0,-3));
  }

  //Additional expenses
  if (ratioSelected == "covid") {
    $("input[name='deepCleaningCost']").val(4);
  }

  if ($("#costPerCleaning").val() == "") {
    $("#costPerCleaning").val(
      dataC[stateSelected].covid_sanitation_cost_per_cleaning
    );
  }

  //CONST cost per classroom
  costPerClassroom =
    dataC[stateSelected].covid_sanitation_cost_per_classroom_per_month;

  if (ratioSelected == "covid") {
    sanitationCost = costPerClassroom * classTotal;
    $("#sanitationCost").val(accounting.formatMoney(sanitationCost).slice(0,-3));
  }

  if ($("#miscCost").val() != "") {
    miscCost = parseInt($("#miscCost").val());
  } else {
    $("#miscCost").val(0);
  }
}

//FUNCTION TO CHECK FOR CHECKBOX
function checkHealth() {
  if ($("input[type='checkbox']").prop("checked") == false) {
    $("input[name='costOfFTEmployee']").val(0);
  } else {
    $("input[name='costOfFTEmployee']").val(
      accounting.formatMoney(dataC[stateSelected].health_insurance)
    );
  }

  if ($("#checkboxFCC").prop("checked") == false) {
    $("#costOfFTEmployeeFCC").val(0);
  } else {
    $("#costOfFTEmployeeFCC").val(accounting.formatMoney(dataF[stateSelected].health_insurance).slice(0,-3));
  }
}

//FUNCTION TO FORMAT SYSTEM COST FIELD
function formatFieldSC(obj){

  var numb = accounting.formatMoney(obj.value).slice(1,-3);
  var id = obj.id;

  
  $("#" + id).val(numb);
  


}

//FUNCTION TO FORMAT NUMBER FIELD
function formatField(obj) {
  var numb = accounting.formatMoney(obj.value);
  var id = obj.id;

  if (id.slice(0, 4) == "wage") {
    $("#" + id).val(numb);
  } else {
    $("#" + id).val(numb.slice(0, -3));
  }
}

//FUNCTION TO CALC TOTAL PERSONNEL COST
function calcTotalPersonnelCost() {
  //total admin staff wage

  costPerFTEmployee = parseInt(accounting.unformat($("input[name='costOfFTEmployee']").val()));
  sickDays = parseInt($("#sickdays").val());
  paidLeave = parseInt($("#paidLeave").val());

  salaryProgramDirectors =
    accounting.unformat($("#salaryProgramDirectors").val()) *
    parseInt($("#noOfProgramDirectors").val());

  salaryAssistantDirectors =
    accounting.unformat($("#salaryAssistantDirectors").val()) *
    parseInt($("#noOfAssistantDirectors").val());

  salaryAdministrativeAssistants =
    accounting.unformat($("#salaryAdministrativeAssistants").val()) *
    parseInt($("#noOfAdministrativeAssistants").val());

  var arrCustom = customStaffArr;

  var totalCustomSalary = 0;
  var totalCustomStaff = 0;

  for (let i = 0; i < arrCustom.length; i++) {
    totalCustomSalary =
      totalCustomSalary +
      arrCustom[i].customStaffNo * arrCustom[i].customStaffSalary;

    totalCustomStaff = totalCustomStaff + arrCustom[i].customStaffNo;
  }

  adminStaffTotalNo =
    parseInt($("#noOfProgramDirectors").val()) +
    parseInt($("#noOfAssistantDirectors").val()) +
    parseInt($("#noOfAdministrativeAssistants").val()) +
    totalCustomStaff;

  adminStaffTotalWage =
    salaryProgramDirectors +
    salaryAssistantDirectors +
    salaryAdministrativeAssistants +
    totalCustomSalary;

  salaryLeadTeachers =
    accounting.unformat($("#salaryLeadTeachers").val()) *
    parseInt($("#noOfLeadTeachers").val());

  salaryAssistantTeachers =
    accounting.unformat($("#salaryAssistantTeachers").val()) *
    parseInt($("#noOfAssistantTeachers").val());

  salarySubsTeachers =
    accounting.unformat($("#salarySubsTeachers").val()) *
    parseFloat($("#noOfSubstituteTeachers").val());

  unitSalarySubsTeachers = accounting.unformat($("#salarySubsTeachers").val());

  //total teaching staff wage
  teachingStaffTotalWage =
    salaryLeadTeachers + salaryAssistantTeachers + salarySubsTeachers;

  //total staff wage
  staffTotalWage = adminStaffTotalWage + teachingStaffTotalWage;

  //total no of teaching staff
  totalTeachingStaff = totalTeachers + noOfSubstituteTeachers;
  staffTotalNo = adminStaffTotalNo + totalTeachingStaff;

  subsCostForPaidLeave =
    staffTotalNo * paidLeave * 8 * (unitSalarySubsTeachers / 2080);

  //sub cost for sick leave
  subsCostForSickLeave =
    staffTotalNo * sickDays * 8 * (unitSalarySubsTeachers / 2080);

  //total subs cost
  subsCostForLeaveTotal = subsCostForSickLeave + subsCostForPaidLeave;

  //total staff wage
  subTotalWages = staffTotalWage + subsCostForLeaveTotal;

  //CONST Mandatory benefits value
  mandatoryBenefitsVal = 0.1065;
  mandatoryBenefitsSalary = mandatoryBenefitsVal * subTotalWages;

  //Total staff
  totalStaff = totalTeachingStaff + adminStaffTotalNo;

  additionalBenefits = totalStaff * costPerFTEmployee;

  //Subtotal Personnel
  personnelSubtotal =
    subTotalWages + mandatoryBenefitsSalary + additionalBenefits;
}

//FUNCTION TO CALCULATE TOTAL NONPERSONNEL COST
function calcTotalNonPersonnelCost() {
  //Total additional cleaning

  sanitationCost = parseInt(accounting.unformat($("#sanitationCost").val()));

  totalAdditionalCleaning =
    (parseInt($("input[name='deepCleaningCost']").val()) *
      parseInt($("#costPerCleaning").val()) +
      sanitationCost) *
    12;

  //CONST Nonpersonnel expenses

  eduProgram =
    dataC[stateSelected].NP_Education_program_for_children_and_staff *
    childTotal;

  occupancy = dataC[stateSelected].NP_Occupancy * classTotal;

  progAndAdmin =
    dataC[stateSelected].NP_Program_management_and_administration * childTotal;

  //Total Nonpersonnel Cost
  nonpersonnelSubtotal =
    totalAdditionalCleaning + eduProgram + occupancy + progAndAdmin;
}

//FUNCTION TO CALCULATE INFANT COST PER CHILD
function calcInfantsCost() {
  //infants cost
  infant_adminPersonnel = (adminStaffTotalWage / childTotal).toFixed(2);

  infantChildren = parseInt($("input[name='infantChildren']").val());
  infantRatio = parseInt($("input[name='infantRatio']").val());

  infantTeachers = Math.ceil(infantChildren / infantRatio);

  leadSalary = salaryLeadTeachers / noOfLeadTeachers;

  if (noOfAssistantTeachers != 0) {
    assistantTeacherSalary = salaryAssistantTeachers / noOfAssistantTeachers;
  } else {
    assistantTeacherSalary = 0;
  }

  infant_classPersonnel =
    (leadSalary + (infantTeachers - 1) * assistantTeacherSalary) /
    infantChildren;

  infant_floaters = salarySubsTeachers / classTotal / infantChildren;

  benefitsPerChild =
    (mandatoryBenefitsSalary + additionalBenefits) / childTotal;

  infant_subs = subsCostForLeaveTotal / classTotal / infantChildren;

  NP_ed_program = eduProgram / childTotal;

  infant_NP_occupancy = occupancy / classTotal / infantChildren;

  NP_admin = progAndAdmin / childTotal;

  infant_cleaning = totalAdditionalCleaning / classTotal / infantChildren;

  miscCost = parseInt($("#miscCost").val()) * 12;

  if (miscCost != 0) {
    miscCost = miscCost / childTotal;
  }

  op_reserve = reserveFund / childTotal;

  infant_cost =
    parseFloat(infant_adminPersonnel) +
    parseFloat(infant_classPersonnel) +
    parseFloat(infant_floaters) +
    parseFloat(benefitsPerChild) +
    parseFloat(infant_subs) +
    parseFloat(NP_ed_program) +
    parseFloat(infant_NP_occupancy) +
    parseFloat(NP_admin) +
    parseFloat(infant_cleaning) +
    parseFloat(miscCost) +
    parseFloat(op_reserve);

  var infantMonthlyCost = infant_cost / 12;
  var infantWeeklyCost = infant_cost / 52;
  $("#infantAnnualCost").html(
    accounting.formatMoney(Math.round(infant_cost)).slice(0, -3)
  );
  $("#infantMonthlyCost").html(
    accounting.formatMoney(Math.round(infantMonthlyCost)).slice(0, -3)
  );
  $("#infantWeeklyCost").html(
    accounting.formatMoney(Math.round(infantWeeklyCost)).slice(0, -3)
  );
}

//FUNCTION TO CALCULATE INFANT COST PER CHILD
function calcToddlersCost() {
  //toddlers cost
  toddler_adminPersonnel = (adminStaffTotalWage / childTotal).toFixed(2);

  toddlerChildren = parseInt($("input[name='toddlerChildren']").val());
  toddlerRatio = parseInt($("input[name='toddlerRatio']").val());

  toddlerTeachers = Math.ceil(toddlerChildren / toddlerRatio);

  toddler_classPersonnel = (
    (leadSalary + (toddlerTeachers - 1) * assistantTeacherSalary) /
    toddlerChildren
  ).toFixed(2);

  toddler_floaters = (
    salarySubsTeachers /
    classTotal /
    toddlerChildren
  ).toFixed(2);

  benefitsPerChild = (
    (mandatoryBenefitsSalary + additionalBenefits) /
    childTotal
  ).toFixed(2);

  toddler_subs = (subsCostForLeaveTotal / classTotal / toddlerChildren).toFixed(
    2
  );

  NP_ed_program = eduProgram / childTotal;

  toddler_NP_occupancy = occupancy / classTotal / toddlerChildren;

  NP_admin = progAndAdmin / childTotal;

  toddler_cleaning = totalAdditionalCleaning / classTotal / toddlerChildren;

  miscCost = parseInt($("#miscCost").val()) * 12;

  if (miscCost != 0) {
    miscCost = miscCost / childTotal;
  }

  op_reserve = reserveFund / childTotal;

  toddler_cost =
    parseFloat(toddler_adminPersonnel) +
    parseFloat(toddler_classPersonnel) +
    parseFloat(toddler_floaters) +
    parseFloat(benefitsPerChild) +
    parseFloat(toddler_subs) +
    parseFloat(NP_ed_program) +
    parseFloat(toddler_NP_occupancy) +
    parseFloat(NP_admin) +
    parseFloat(toddler_cleaning) +
    parseFloat(miscCost) +
    parseFloat(op_reserve);

  var toddlerMonthlyCost = toddler_cost / 12;
  var toddlerWeeklyCost = toddler_cost / 52;
  $("#toddlerAnnualCost").html(
    accounting.formatMoney(Math.round(toddler_cost)).slice(0, -3)
  );
  $("#toddlerMonthlyCost").html(
    accounting.formatMoney(Math.round(toddlerMonthlyCost)).slice(0, -3)
  );
  $("#toddlerWeeklyCost").html(
    accounting.formatMoney(Math.round(toddlerWeeklyCost)).slice(0, -3)
  );
}

//FUNCTION TO CALCULATE PRE-SCHOOL 3 COST PER CHILD
function calcPre3Cost() {
  //pre3 cost
  pre3_adminPersonnel = (adminStaffTotalWage / childTotal).toFixed(2);

  pre3Children = parseInt($("input[name='pre3Children']").val());
  pre3Ratio = parseInt($("input[name='pre3Ratio']").val());

  pre3Teachers = Math.ceil(pre3Children / pre3Ratio);

  pre3_classPersonnel = (
    (leadSalary + (pre3Teachers - 1) * assistantTeacherSalary) /
    pre3Children
  ).toFixed(2);

  pre3_floaters = (salarySubsTeachers / classTotal / pre3Children).toFixed(2);

  benefitsPerChild = (
    (mandatoryBenefitsSalary + additionalBenefits) /
    childTotal
  ).toFixed(2);

  pre3_subs = (subsCostForLeaveTotal / classTotal / pre3Children).toFixed(2);

  NP_ed_program = eduProgram / childTotal;

  pre3_NP_occupancy = occupancy / classTotal / pre3Children;

  NP_admin = progAndAdmin / childTotal;

  pre3_cleaning = totalAdditionalCleaning / classTotal / pre3Children;

  miscCost = parseInt($("#miscCost").val()) * 12;

  if (miscCost != 0) {
    miscCost = miscCost / childTotal;
  }

  op_reserve = reserveFund / childTotal;

  pre3_cost =
    parseFloat(pre3_adminPersonnel) +
    parseFloat(pre3_classPersonnel) +
    parseFloat(pre3_floaters) +
    parseFloat(benefitsPerChild) +
    parseFloat(pre3_subs) +
    parseFloat(NP_ed_program) +
    parseFloat(pre3_NP_occupancy) +
    parseFloat(NP_admin) +
    parseFloat(pre3_cleaning) +
    parseFloat(miscCost) +
    parseFloat(op_reserve);

  var pre3MonthlyCost = pre3_cost / 12;
  var pre3WeeklyCost = pre3_cost / 52;
  $("#pre3AnnualCost").html(
    accounting.formatMoney(Math.round(pre3_cost)).slice(0, -3)
  );
  $("#pre3MonthlyCost").html(
    accounting.formatMoney(Math.round(pre3MonthlyCost)).slice(0, -3)
  );
  $("#pre3WeeklyCost").html(
    accounting.formatMoney(Math.round(pre3WeeklyCost)).slice(0, -3)
  );
}

//FUNCTION TO CALCULATE PRE SCHOOL 4 COST PER CHILD
function calcPre4Cost() {
  //pre4 cost
  pre4_adminPersonnel = (adminStaffTotalWage / childTotal).toFixed(2);

  pre4Children = parseInt($("input[name='pre4Children']").val());
  pre4Ratio = parseInt($("input[name='pre4Ratio']").val());

  pre4Teachers = Math.ceil(pre4Children / pre4Ratio);

  pre4_classPersonnel = (
    (leadSalary + (pre4Teachers - 1) * assistantTeacherSalary) /
    pre4Children
  ).toFixed(2);

  pre4_floaters = (salarySubsTeachers / classTotal / pre4Children).toFixed(2);

  benefitsPerChild = (
    (mandatoryBenefitsSalary + additionalBenefits) /
    childTotal
  ).toFixed(2);

  pre4_subs = (subsCostForLeaveTotal / classTotal / pre4Children).toFixed(2);

  NP_ed_program = eduProgram / childTotal;

  pre4_NP_occupancy = occupancy / classTotal / pre4Children;

  NP_admin = progAndAdmin / childTotal;

  pre4_cleaning = totalAdditionalCleaning / classTotal / pre4Children;

  miscCost = parseInt($("#miscCost").val()) * 12;

  if (miscCost != 0) {
    miscCost = miscCost / childTotal;
  }

  op_reserve = reserveFund / childTotal;

  pre4_cost =
    parseFloat(pre4_adminPersonnel) +
    parseFloat(pre4_classPersonnel) +
    parseFloat(pre4_floaters) +
    parseFloat(benefitsPerChild) +
    parseFloat(pre4_subs) +
    parseFloat(NP_ed_program) +
    parseFloat(pre4_NP_occupancy) +
    parseFloat(NP_admin) +
    parseFloat(pre4_cleaning) +
    parseFloat(miscCost) +
    parseFloat(op_reserve);

  var pre4MonthlyCost = pre4_cost / 12;
  var pre4WeeklyCost = pre4_cost / 52;
  $("#pre4AnnualCost").html(
    accounting.formatMoney(Math.round(pre4_cost)).slice(0, -3)
  );
  $("#pre4MonthlyCost").html(
    accounting.formatMoney(Math.round(pre4MonthlyCost)).slice(0, -3)
  );
  $("#pre4WeeklyCost").html(
    accounting.formatMoney(Math.round(pre4WeeklyCost)).slice(0, -3)
  );
}

/**********FAMILY CHILD CARE HOMES**********/

function getSalaryLevelFCC() {
  salaryLevelFCC = $("input[name='salaryFCC']:checked").val();
}

//FUNCTION TO POPULATE FAMILY CARE FIELDS
function populateFCC() {
  if ($("#noOfInfant").val() == "") {
    $("#noOfInfant").val(2);
  }

  if ($("#noOfToddler").val() == "") {
    $("#noOfToddler").val(1);
  }

  if ($("#noOfPre3").val() == "") {
    $("#noOfPre3").val(1);
  }

  if ($("#noOfPre4").val() == "") {
    $("#noOfPre4").val(2);
  }

  if ($("#noOfProvider").val() == "") {
    $("#noOfProvider").val(1);
  }

  calcChildTotalFCC();

  calcAssistantTeacherFCC();

  getSalaryLevelFCC();

  populateStaffFCC();
  calcEmployeeFCC();

  if ($("input[name='sickdaysFCC']").val() == "") {
    sickDaysFCC = dataF[stateSelected].sick_days;
    $("input[name='sickdaysFCC']").val(sickDaysFCC);
  }

  if ($("input[name='paidLeaveFCC']").val() == "") {
    paidLeaveFCC = dataF[stateSelected].paid_leave;
    $("input[name='paidLeaveFCC']").val(paidLeaveFCC);
  }

  if ($("#checkboxFCC").prop("checked") == true) {
    $("#costOfFTEmployeeFCC").val(accounting.formatMoney(dataF[stateSelected].health_insurance).slice(0,-3));
  }

  if (ratioSelected == "covid") {
    $("input[name='deepCleaningCostFCC']").val(4);
  }

  if ($("input[name='costPerCleaningFCC']").val() == "") {
    $("input[name='costPerCleaningFCC']").val(
      dataF[stateSelected].covid_sanitation_cost_per_cleaning
    );
  }

  if (ratioSelected == "covid") {
    $("input[name='sanitationCostFCC']").val(
      accounting.formatMoney(dataF[stateSelected].covid_sanitation_cost_per_month).slice(0,-3)
    );
  }

  if ($("input[name='miscCostFCC']").val() == "") {
    $("input[name='miscCostFCC']").val(0);
  }

  calcTotalWagesAndBenefitsFCC();
  calcInfantFCC();
  calcToddlerFCC();
  calcPre3FCC();
  calcPre4FCC();
}

//FUNCTION TO CALCULATE TOTAL NO OF EMPLOYEEs
function calcEmployeeFCC() {
  totalFTEmployeeFCC =
    parseInt($("#noOfProvider").val()) +
    parseInt($("#noOfAssistantTeachersFCC").val());

  $(".totalFTEmployee").html(totalFTEmployeeFCC);
}

//FUNCITON TO CALCULATE TOTAL NO OF CHILDREN
function calcChildTotalFCC() {
  childTotalFCC =
    parseInt($("#noOfInfant").val()) +
    parseInt($("#noOfToddler").val()) +
    parseInt($("#noOfPre3").val()) +
    parseInt($("#noOfPre4").val());

  $(".childTotalFCC").html(childTotalFCC);
}

//FUNCTION TO CALCULATE ASSISTANT TEACHER
function calcAssistantTeacherFCC() {
  if (ratioSelected == "precovid") {
    $("#noOfAssistantTeachersFCC").val(0);
  }

  if (ratioSelected == "covid") {
    $("#noOfAssistantTeachersFCC").val(1);
  }

  var assistantCount = parseInt($("#noOfAssistantTeachersFCC").val());

  if ($("#noOfInfant").val() > 2) {
    assistantCount = assistantCount + 1;
  }

  if (childTotalFCC > 6 && $("#noOfInfant").val() <= 2) {
    assistantCount = assistantCount + 1;
  }

  $("#noOfAssistantTeachersFCC").val(assistantCount);
}

//FUNCTION TO POPULATE STAFF
function populateStaffFCC() {
  if (salaryLevelFCC == "BLS") {
    salaryOfProvider =
      parseInt($("#noOfProvider").val()) *
      dataF[stateSelected].bls_lead_teacher_salary;

    $("#salaryOfProvider").val(
      accounting
        .formatMoney(dataF[stateSelected].bls_lead_teacher_salary)
        .slice(0, -3)
    );

    wageOfProvider = dataF[stateSelected].bls_lead_teacher_salary / 2080;
    $("#wageOfProvider").val(accounting.formatMoney(wageOfProvider));

    if (parseInt($("#noOfAssistantTeachersFCC").val()) != 0) {
      salaryOfAssistantTeachersFCC =
        parseInt($("#noOfAssistantTeachersFCC").val()) *
        dataF[stateSelected].bls_assistant_teacher_salary;

      $("#salaryOfAssistantTeachersFCC").val(
        accounting
          .formatMoney(dataF[stateSelected].bls_assistant_teacher_salary)
          .slice(0, -3)
      );

      wageOfAssistantTeachersFCC =
        dataF[stateSelected].bls_assistant_teacher_salary / 2080;
      $("#wageOfAssistantTeachersFCC").val(
        accounting.formatMoney(wageOfAssistantTeachersFCC)
      );
    }else{

      $("#salaryOfAssistantTeachersFCC").val(
        accounting
          .formatMoney(dataF[stateSelected].bls_assistant_teacher_salary)
          .slice(0, -3)
      );

      $("#wageOfAssistantTeachersFCC").val(
        accounting.formatMoney(dataF[stateSelected].bls_assistant_teacher_salary/2080)
      );

    }

    wageFloaterFCC = dataC[stateSelected].bls_floater_salary / 2080;
  }

  if (salaryLevelFCC == "Kindergarten") {
    salaryOfProvider =
      parseInt($("#noOfProvider").val()) *
      dataF[stateSelected].kg_lead_teacher_salary;

    $("#salaryOfProvider").val(
      accounting.formatMoney(salaryOfProvider).slice(0, -3)
    );

    wageOfProvider = salaryOfProvider / 2080;
    $("#wageOfProvider").val(accounting.formatMoney(wageOfProvider));

    if (parseInt($("#noOfAssistantTeachersFCC").val()) != 0) {
      salaryOfAssistantTeachersFCC =
        parseInt($("#noOfAssistantTeachersFCC").val()) *
        dataF[stateSelected].kg_assistant_teacher_salary;

      $("#salaryOfAssistantTeachersFCC").val(
        accounting.formatMoney(salaryOfAssistantTeachersFCC).slice(0, -3)
      );

      wageOfAssistantTeachersFCC = salaryOfAssistantTeachersFCC / 2080;
      $("#wageOfAssistantTeachersFCC").val(
        accounting.formatMoney(wageOfAssistantTeachersFCC)
      );
    }else{

      $("#salaryOfAssistantTeachersFCC").val(
        accounting.formatMoney(dataF[stateSelected].kg_assistant_teacher_salary).slice(0, -3)
      );

      
      $("#wageOfAssistantTeachersFCC").val(
        accounting.formatMoney(dataF[stateSelected].kg_assistant_teacher_salary/2080)
      );


    }

    wageFloaterFCC = dataC[stateSelected].Kg_floater_salary / 2080;
  }
}

//FUNCTION TO CALCULATE WAGES AND BENEFITS TOTAL
function calcTotalWagesAndBenefitsFCC() {
  providerSalary =
    parseInt($("#noOfProvider").val()) *
    accounting.unformat($("#salaryOfProvider").val());

  assistantSalary =
    parseInt($("#noOfAssistantTeachersFCC").val()) *
    accounting.unformat($("#salaryOfAssistantTeachersFCC").val());

  var arrCustomFCC = customStaffArrFCC;

  var totalCustomSalaryFCC = 0;
  var totalCustomStaffFCC = 0;

  for (let i = 0; i < arrCustomFCC.length; i++) {
    totalCustomSalaryFCC =
      totalCustomSalaryFCC +
      arrCustomFCC[i].customStaffNoFCC * arrCustomFCC[i].customStaffSalaryFCC;

    totalCustomStaffFCC =
      totalCustomStaffFCC + arrCustomFCC[i].customStaffNoFCC;
  }

  totalWagesFCC = providerSalary + assistantSalary + totalCustomSalaryFCC;
  totalFTEmployeeFCC = totalFTEmployeeFCC + totalCustomStaffFCC;

  mandatoryBenefitsFCC =
    mandatoryBenefitsVal * (totalWagesFCC - providerSalary);

  if (parseInt($("#noOfAssistantTeachersFCC").val()) != 0) {
    assistantTeacherUnitCostFCC =
      assistantSalary / parseInt($("#noOfAssistantTeachersFCC").val());

    sickDaysCostFCC =
      parseInt($("input[name='sickdaysFCC']").val()) *
      (assistantTeacherUnitCostFCC / 2080) *
      10;

    paidLeaveCostFCC =
      parseInt($("input[name='paidLeaveFCC']").val()) * wageFloaterFCC * 10;

    totalSickDaysCostFCC = sickDaysCostFCC * totalFTEmployeeFCC;
    totalPaidLeaveCostFCC = paidLeaveCostFCC * totalFTEmployeeFCC;
  } else {
    sickDaysCostFCC = 0;
    paidLeaveCostFCC =
      parseInt($("input[name='paidLeaveFCC']").val()) * wageFloaterFCC * 10;
    totalSickDaysCostFCC = sickDaysCostFCC * totalFTEmployeeFCC;
    totalPaidLeaveCostFCC = paidLeaveCostFCC * totalFTEmployeeFCC;
  }

  healthInsuranceFCC = parseInt(accounting.unformat($("#costOfFTEmployeeFCC").val()));

  totalHealthFCC = healthInsuranceFCC * totalFTEmployeeFCC;

  discretionaryBenefits =
    totalSickDaysCostFCC + totalPaidLeaveCostFCC + totalHealthFCC;

  totalWagesAndBenefitsFCC =
    parseInt(totalWagesFCC) +
    parseInt(mandatoryBenefitsFCC) +
    parseInt(discretionaryBenefits);

  //CONST VALUES
  np_adminFCC = 3725;
  np_programFCC = 7250;
  np_occupancyFCC = 3731;

  costPerClassroom = parseInt(accounting.unformat($("input[name='sanitationCostFCC']").val()));
  //Additional Cleaning Cost
  totalCleaningCostFCC =
    parseInt(costPerClassroom) +
    parseInt($("input[name='deepCleaningCostFCC']").val()) *
      parseInt($("input[name='costPerCleaningFCC']").val());

  miscCostFCC = parseInt($("input[name='miscCostFCC']").val());

  totalOtherExpensesFCC =
    parseInt(np_adminFCC) +
    parseInt(np_programFCC) +
    parseInt(np_occupancyFCC) +
    parseInt(totalCleaningCostFCC) +
    parseInt(miscCostFCC);

  totalExpensesFCC =
    parseInt(totalWagesAndBenefitsFCC) + parseInt(totalOtherExpensesFCC);

  costPerChildFCC = parseInt(totalExpensesFCC) / parseInt(childTotalFCC);
}

//FUNCTION TO CALCULATE INFANT COST
function calcInfantFCC() {
  totalInfantCostFCC = Math.round(costPerChildFCC);

  $("#infantAnnualCostFCC").html(accounting.formatMoney(totalInfantCostFCC).slice(0,-3));
  $("#infantMonthlyCostFCC").html(
    accounting.formatMoney(totalInfantCostFCC / 12).slice(0,-3)
  );
  $("#infantWeeklyCostFCC").html(
    accounting.formatMoney(totalInfantCostFCC / 52).slice(0,-3)
  );
}

//FUNCTION TO CALCULATE TODDLER COST
function calcToddlerFCC() {
  totalToddlerCostFCC = Math.round(costPerChildFCC);

  $("#toddlerAnnualCostFCC").html(accounting.formatMoney(totalToddlerCostFCC).slice(0,-3));
  $("#toddlerMonthlyCostFCC").html(
    accounting.formatMoney(totalToddlerCostFCC / 12).slice(0,-3)
  );
  $("#toddlerWeeklyCostFCC").html(
    accounting.formatMoney(totalToddlerCostFCC / 52).slice(0,-3)
  );
}

//FUNCTION TO CALCULATE PRE3 COST
function calcPre3FCC() {
  totalPre3CostFCC = Math.round(costPerChildFCC);

  $("#pre3AnnualCostFCC").html(accounting.formatMoney(totalPre3CostFCC).slice(0,-3));
  $("#pre3MonthlyCostFCC").html(accounting.formatMoney(totalPre3CostFCC / 12).slice(0,-3));
  $("#pre3WeeklyCostFCC").html(accounting.formatMoney(totalPre3CostFCC / 52).slice(0,-3));
}

//FUNCTION TO CALCULATE PRE4 COST
function calcPre4FCC() {
  totalPre4CostFCC = Math.round(costPerChildFCC);

  $("#pre4AnnualCostFCC").html(accounting.formatMoney(totalPre4CostFCC).slice(0,-3));
  $("#pre4MonthlyCostFCC").html(accounting.formatMoney(totalPre4CostFCC / 12).slice(0,-3));
  $("#pre4WeeklyCostFCC").html(accounting.formatMoney(totalPre4CostFCC / 52).slice(0,-3));
}

/**********SYSTEM COSTS**********/

//FUNCTION TO POPULATE SYSTEM FIELDS
function populateSC() {
  $("#childCareFacilities").val(accounting.formatMoney(dataS[stateSelected].centers_programs).slice(1,-3));

  $("#childCareSlots").val(accounting.formatMoney(dataS[stateSelected].centers_slots).slice(1,-3));

  $("#familyHomeFacilities").val(accounting.formatMoney(dataS[stateSelected].FCC_programs).slice(1,-3));

  $("#familyHomeSlots").val(accounting.formatMoney(dataS[stateSelected].FCC_slots).slice(1,-3));

  $("input[name='fixedCost']").val(20);

  $("input[name='operatingCost']").val(40);

  calcFixedCost();
  calcOpCost();
}

//FUNCTION TO CALC FIXED COST
function calcFixedCost() {
  //CONST VAL

  fixedCostCTC = 48474;
  fixedCostFCC = 6772;

  fixedCostPercentage = (
    parseInt($("input[name='fixedCost']").val()) / 100
  ).toFixed(2);

  total_ctc_fixedCost =
    fixedCostPercentage *
    parseInt(accounting.unformat($("#childCareFacilities").val())) *
    (fixedCostCTC / 12);

  total_fcc_fixedCost =
    fixedCostPercentage *
    parseInt(accounting.unformat($("#familyHomeFacilities").val())) *
    (fixedCostFCC / 12);

  totalFixedCost = total_ctc_fixedCost + total_fcc_fixedCost;

  $("#totalFixedCosts").html(accounting.formatMoney(totalFixedCost).slice(0,-3));
  $("#totalChildCareFixedCost").html(
    accounting.formatMoney(total_ctc_fixedCost).slice(0,-3)
  );
  $("#totalFamilyHomeFixedCost").html(
    accounting.formatMoney(total_fcc_fixedCost).slice(0,-3)
  );
}

//INFANT DIV
var myElementInfant = document.getElementById("infantMonthlyCost");
if (window.addEventListener) {
  // Normal browsers
  myElementInfant.addEventListener("DOMSubtreeModified", contentChanged, false);
} else if (window.attachEvent) {
  // IE
  myElementInfant.attachEvent("DOMSubtreeModified", contentChanged);
}

function contentChanged() {
  // this function will run each time the content of the DIV changes
  calcOpCost();
}

//TODDLER DIV
var myElementToddler = document.getElementById("toddlerMonthlyCost");
if (window.addEventListener) {
  // Normal browsers
  myElementToddler.addEventListener(
    "DOMSubtreeModified",
    contentChanged,
    false
  );
} else if (window.attachEvent) {
  // IE
  myElementToddler.attachEvent("DOMSubtreeModified", contentChanged);
}

function contentChanged() {
  // this function will run each time the content of the DIV changes
  calcOpCost();
}

//PRE3 DIV
var myElementPre3 = document.getElementById("pre3MonthlyCost");
if (window.addEventListener) {
  // Normal browsers
  myElementPre3.addEventListener("DOMSubtreeModified", contentChanged, false);
} else if (window.attachEvent) {
  // IE
  myElementPre3.attachEvent("DOMSubtreeModified", contentChanged);
}

function contentChanged() {
  // this function will run each time the content of the DIV changes
  calcOpCost();
}

//PRE4 DIV
var myElementPre4 = document.getElementById("pre4MonthlyCost");
if (window.addEventListener) {
  // Normal browsers
  myElementPre4.addEventListener("DOMSubtreeModified", contentChanged, false);
} else if (window.attachEvent) {
  // IE
  myElementPre4.attachEvent("DOMSubtreeModified", contentChanged);
}

function contentChanged() {
  // this function will run each time the content of the DIV changes
  calcOpCost();
}

//FCC MONTHLY DIV
var myElementFCC = document.getElementById("infantMonthlyCostFCC");
if (window.addEventListener) {
  // Normal browsers
  myElementFCC.addEventListener("DOMSubtreeModified", contentChanged, false);
} else if (window.attachEvent) {
  // IE
  myElementFCC.attachEvent("DOMSubtreeModified", contentChanged);
}

function contentChanged() {
  // this function will run each time the content of the DIV changes
  calcOpCost();
}

//FUNCTION TO CALC OPERATING COST
function calcOpCost() {
  //infantMonthly = $("#infantMonthlyCost").html().substring(1);
  infantMonthly = accounting.unformat($("#infantMonthlyCost").html());
  toddlerMonthly = accounting.unformat($("#toddlerMonthlyCost").html());
  pre3Monthly = accounting.unformat($("#pre3MonthlyCost").html());
  pre4Monthly = accounting.unformat($("#pre4MonthlyCost").html());

  avgCostPerChild =
    (infantMonthly + toddlerMonthly + pre3Monthly + pre4Monthly) / 4;

  
  opCostPercentage = (
    parseInt($("input[name='operatingCost']").val()) / 100
  ).toFixed(2);

  total_ctc_opCost =
    parseInt(accounting.unformat($("#childCareSlots").val())) * opCostPercentage * avgCostPerChild;

  
  costPerChildFCCMonthly = accounting.unformat(
    $("#infantMonthlyCostFCC").html()
  );

  
  total_fcc_opCost =
    parseInt(accounting.unformat($("#familyHomeSlots").val())) *
    opCostPercentage *
    costPerChildFCCMonthly;

  
  totalOpCost = parseInt(total_ctc_opCost) + parseInt(total_fcc_opCost);

  
  $("#totalOperatingCosts").html(accounting.formatMoney(totalOpCost).slice(0,-3));
  $("#totalChildCareOperatingCost").html(
    accounting.formatMoney(total_ctc_opCost).slice(0,-3)
  );
  $("#totalFamilyHomeOperatingCost").html(
    accounting.formatMoney(total_fcc_opCost).slice(0,-3)
  );
}

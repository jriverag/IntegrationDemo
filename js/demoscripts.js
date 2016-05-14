function MenuSelect(selection)
{
    document.getElementById("about").style.visibility = "hidden";
    document.getElementById("add").style.visibility = "hidden";
    document.getElementById("change").style.visibility = "hidden";
    document.getElementById("delete").style.visibility = "hidden";
    document.getElementById("list").style.visibility = "hidden";
    document.getElementById("history").style.visibility = "hidden";
    document.getElementById("orders").style.visibility = "hidden";
    document.getElementById("storelist").style.visibility = "hidden";
    document.getElementById("employeelist").style.visibility = "hidden";
    document.getElementById("addemployee").style.visibility = "hidden";
    document.getElementById("changeemployee").style.visibility = "hidden";
    document.getElementById("deleteemployee").style.visibility = "hidden";
    
    //var selection = document.getElementById("menuitems").value;
    
    switch (selection)
    {
        case "Home":
            
            break;
        case "About":
            document.getElementById("about").style.visibility = "visible";
            break;
        case "Add a Store":
            document.getElementById("add").style.visibility = "visible";
            break;
        case "Add an Employee":
            document.getElementById("addemployee").style.visibility = "visible";
            break;
        case "Change an Employee Name":
            document.getElementById("changeemployee").style.visibility = "visible";
            break;
        case "Delete an Employee":
            document.getElementById("deleteemployee").style.visibility = "visible";
            break;
        case "Update Store Information":
            document.getElementById("change").style.visibility = "visible";
            break;
        case "Delete a Store":
            document.getElementById("delete").style.visibility = "visible";
            break;
        case "List Authors":
            document.getElementById("list").style.visibility = "visible";
            break;
        case "Author Publications":
            document.getElementById("history").style.visibility = "visible";
            break;
        case "Store Orders":
            document.getElementById("orders").style.visibility = "visible";
            break;
        case "Store List":
            document.getElementById("storelist").style.visibility = "visible";
            break;
        case "Employee List":
            document.getElementById("employeelist").style.visibility = "visible";
            break;
        default:
            alert("Please select a different menu option");
            
    }
}

function ListCustomers()
{
    var xmlhttp = new XMLHttpRequest();
    var url = "http://student.business.uab.edu/WebAppService/service1.svc/getAllAuthors";
             
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var output = JSON.parse(xmlhttp.responseText);
        GenerateOutput(output);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
            
    function GenerateOutput(result)
    {
        var display = "<table><tr><th>First Name</th><th>Last Name</th><th>Author ID</th></tr>";
        var count = 0;
        var rowid = "oddrow";
        for(count = 0; count < result.GetAllAuthorsResult.length; count ++)
        {
            if (count%2 == 0)
            {
                rowid = "evenrow";
            }
            else
            {
                rowid = "oddrow";
            }
            display += "<tr id=" + rowid + "><td>" + result.GetAllAuthorsResult[count].AuthorFName + "</td><td>" + result.GetAllAuthorsResult[count].AuthorLName + "</td><td>" + result.GetAllAuthorsResult[count].AuthorID + "</td></tr>";
        }
        display += "</table>";
        document.getElementById("listcustomers").innerHTML = display;
        }
}

function ListEmployees()
{
    var xmlhttp = new XMLHttpRequest();
    var url = "http://student.business.uab.edu/WebAppService/service1.svc/getAllemployees";
             
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var output = JSON.parse(xmlhttp.responseText);
        GenerateOutput(output);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
            
    function GenerateOutput(result)
    {
        var display = "<table><tr><th>Employee ID</th><th>Employee First Name</th><th>Employee Middle Initial</th><th>Employee Last Name</th></tr>";
        var count = 0;
        var rowid = "oddrow";
        for(count = 0; count < result.GetAllEmployeesResult.length; count ++)
        {
            if (count%2 == 0)
            {
                rowid = "evenrow";
            }
            else
            {
                rowid = "oddrow";
            }
            display += "<tr id=" + rowid + "><td>" + result.GetAllEmployeesResult[count].EmpID + "</td><td>" + result.GetAllEmployeesResult[count].EmpFName + "</td><td>" + result.GetAllEmployeesResult[count].EmpMI + "</td><td>" + result.GetAllEmployeesResult[count].EmpLName + "</td></tr>";
        }
        display += "</table>";
        document.getElementById("listemployees").innerHTML = display;
        }
}

function ListStores()
{
    var xmlhttp = new XMLHttpRequest();
    var url = "http://student.business.uab.edu/WebAppService/service1.svc/getAllStores";
             
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var output = JSON.parse(xmlhttp.responseText);
        GenerateOutput(output);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
            
    function GenerateOutput(result)
    {
        var display = "<table><tr><th>Store ID</th><th>Store Name</th><th>Store City</th></tr>";
        var count = 0;
        var rowid = "oddrow";
        var storename = "";
        for(count = 0; count < result.GetAllStoresResult.length; count ++)
        {
            if (count%2 == 0)
            {
                rowid = "evenrow";
            }
            else
            {
                rowid = "oddrow";
            }
            storename = '<a id="clickable" onclick="Orders(' + "'" + result.GetAllStoresResult[count].StoreName + "'); return false;" + '"' + ">";
            storename += result.GetAllStoresResult[count].StoreName;
            storename += '</a>';
            display += "<tr id=" + rowid + "><td>" + result.GetAllStoresResult[count].StoreID + "</td><td>" + storename + "</td><td>" + result.GetAllStoresResult[count].StoreCity + "</td></tr>";
        }
        display += "</table>";
        document.getElementById("liststores").innerHTML = display;
        }
}
        
function CreateStore()
{
    var objajax = new XMLHttpRequest();
    var url = "http://student.business.uab.edu/webappservice/service1.svc/CreateStore";
    //customer data from web page
    var customerid = document.getElementById("custid").value;
    var customername = document.getElementById("custname").value;
    var customercity = document.getElementById("custcity").value;
    var objdisplay = document.getElementById("result");
    //Create parameter string
    var newcustomer = '{"StoreID":"' + customerid + '","StoreName":"' + customername + '","StoreCity":"' + customercity + '"}';
    
    //Checking for AJAX operation return
    objajax.onreadystatechange = function()
    {
        if (objajax.readyState == 4 && objajax.status == 200)
        {
            var result = JSON.parse(objajax.responseText);
            var outcome = result.WasSuccessful
            var error = result.Exception;
            OperationResult(outcome, error, objdisplay);
        }
    }
    //Start AJAX operation
    objajax.open("POST", url, true);
    objajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objajax.send(newcustomer);
}

function OperationResult(success, exception, displayObject)
{
    switch (success)
    {
        case 1:
            displayObject.innerHTML = "The operation was successful!";
            break;
        case 0:
            displayObject.innerHTML = "The operation was not successful:<br>" + exception;
            break;
        case -2:
            displayObject.innerHTML = "The operation was not successful because the data string supplied could not be deserialized into the service object.";
            break;
        case -3:
            displayObject.innerHTML = "The operation was not successful because a record with the supplied Order ID could not be found";
            break;
        default:
            alert("The operation code returned is not identifiable.");
    }
}

function DeleteStore()
       {
            var xmlhttp = new XMLHttpRequest();
            var url = "http://student.business.uab.edu/webappservice/service1.svc/deleteStore/";
            url += document.getElementById("deleteid").value;
            var objdisplay = document.getElementById("deleteresult");
                        
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var output = JSON.parse(xmlhttp.responseText);
                    var outcome = output.DeleteStoreResult.WasSuccessful
                    var error = output.DeleteStoreResult.Exception;
                    OperationResult(outcome, error, objdisplay);
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }
        
function History()
            {
            var xmlhttp = new XMLHttpRequest();
            var url = "http://student.business.uab.edu/WebAppService/service1.svc/getAuthorPubs/";
            url += document.getElementById("historyid").value;
                        
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var output = JSON.parse(xmlhttp.responseText);
                    GenerateOutput(output);
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
            
            function GenerateOutput(result)
            {
            var display = "<table><tr><th>First Name</th><th>Last Name</th><th>Publication Name</th><th>Publication Date</th></tr>";
            var count = 0;
            for(count = 0; count < result.length; count ++)
            {
                if (count%2 == 0)
                {
                    rowid = "evenrow";
                }
                else
                {
                    rowid = "oddrow";
                }
                display += "<tr id=" + rowid + "><td>" + result[count].FName + "</td><td>" + result[count].LName + "</td><td>" + result[count].PubName + "</td><td>" + result[count].PubDate + "</td></tr>";
            }
            display += "</table>";
            document.getElementById("custhist").innerHTML = display;
            }
        }
        
function Orders(storename)
    {
        MenuSelect("Store Orders");
        var xmlhttp = new XMLHttpRequest();
            var url = "http://student.business.uab.edu/WebAppService/service1.svc/getStoreSalesTotal/";
            var blankposition = storename.search(" ");
            storename = storename.substr(1,blankposition);
            url += storename; //document.getElementById("orderid").value;
                        
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var output = JSON.parse(xmlhttp.responseText);
                    GenerateOutput(output);
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
            
            function GenerateOutput(result)
            {
            var display = "<table><tr><th>Book Name</th><<th>Total Ordered</th></tr>";
            var count = 0;
            for(count = 0; count < result.length; count ++)
            {
                if (count%2 == 0)
                {
                    rowid = "evenrow";
                }
                else
                {
                    rowid = "oddrow";
                }
                display += "<tr id=" + rowid + "><td>" + result[count].BookName + "</td><td>" + result[count].SaleNumber + "</td></tr>";
            }
            display += "</table>";
            document.getElementById("orderlist").innerHTML = display;
            }
    }
    
function StoreUpdate()
    {
        var xmlhttp = new XMLHttpRequest();
        var objdisplay = document.getElementById("changeresult");
        xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var result = JSON.parse(xmlhttp.responseText);
                    var outcome = result.WasSuccessful
                    var error = result.Exception;
                    OperationResult(outcome, error, objdisplay);
                }
        }    
        var url = "http://student.business.uab.edu/webappservice/service1.svc/updateStore";
        var orderid = Number(document.getElementById("orderID").value);
        var shipname = document.getElementById("shipName").value;
        var shipcity = document.getElementById("shipCity").value;
                
        var parameters = '{"StoreID":' + orderid + ',"StoreName":"' + shipname + '","StoreCity":"' + shipcity + '"}';
                
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(parameters);
    }
    
function CreateEmployee()
{
    var objajax = new XMLHttpRequest();
    var url = "http://student.business.uab.edu/webappservice/service1.svc/addEmployee";
    //customer data from web page
    var empid = document.getElementById("empid").value;
    var empfname = document.getElementById("empfname").value;
    var empminit = document.getElementById("empminit").value;
    var emplname = document.getElementById("emplname").value;
    var objdisplay = document.getElementById("empresult");
    //Create parameter string
    var newcustomer = '{"EmpID":"' + empid + '","EmpFName":"' + empfname + '", "EmpMI":"' + empminit +'","EmpLName":"' + emplname + '"}';
    
    //Checking for AJAX operation return
    objajax.onreadystatechange = function()
    {
        if (objajax.readyState == 4 && objajax.status == 200)
        {
            var result = JSON.parse(objajax.responseText);
            var outcome = result.WasSuccessful
            var error = result.Exception;
            OperationResult(outcome, error, objdisplay);
        }
    }
    //Start AJAX operation
    objajax.open("POST", url, true);
    objajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objajax.send(newcustomer);
}

function EmployeeUpdate()
    {
        var xmlhttp = new XMLHttpRequest();
        var objdisplay = document.getElementById("empchangeresult");
        xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var result = JSON.parse(xmlhttp.responseText);
                    var outcome = result.WasSuccessful
                    var error = result.Exception;
                    OperationResult(outcome, error, objdisplay);
                }
        }    
        var url = "http://student.business.uab.edu/webappservice/service1.svc/updateEmployee";
        var empid = document.getElementById("empID").value;
        var empfname = document.getElementById("empFName").value;
        var empminit = document.getElementById("empmi").value;
        var emplname = document.getElementById("empLName").value;
                
        var parameters = '{"EmpID":"' + empid + '","EmpFName":"' + empfname + '","EmpMI":"' + empminit + '","EmpLName":"' + emplname + '"}';
                
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(parameters);
    }
    
function DeleteEmployee()
       {
            var xmlhttp = new XMLHttpRequest();
            var url = "http://student.business.uab.edu/webappservice/service1.svc/deleteEmployee/";
            url += document.getElementById("deleteempid").value;
            var objdisplay = document.getElementById("deleteemployeeresult");
                        
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var output = JSON.parse(xmlhttp.responseText);
                    var outcome = output.DeleteEmployeeResult.WasSuccessful
                    var error = output.DeleteEmployeeResult.Exception;
                    OperationResult(outcome, error, objdisplay);
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }

function OrderList(item)
{
    MenuSelect("Store Orders");
}

function Display(item)
{
    alert("The item was clicked: " + item);
}
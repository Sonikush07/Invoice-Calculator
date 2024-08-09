function btnAdd() {
    var tbody = document.getElementById('Tbody');
    var row = document.getElementById('Trow').cloneNode(true);
    row.classList.remove('d-none');
    row.removeAttribute('id');
    tbody.appendChild(row);
    updateRowNumbers();
}

function btnDel(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateRowNumbers();
    Calc();
}

function Calc(input) {
    var row = input.parentNode.parentNode;
    var qty = row.querySelector('input[name="qty"]').value;
    var rate = row.querySelector('input[name="rate"]').value;
    var amt = row.querySelector('input[name="amt"]');
    amt.value = qty * rate;
    GetTotal();
}

function GetTotal() {
    var tbody = document.getElementById('Tbody');
    var rows = tbody.getElementsByTagName('tr');
    var total = 0;
    for (var i = 0; i < rows.length; i++) {
        var amt = rows[i].querySelector('input[name="amt"]').value;
        total += parseFloat(amt) || 0;
    }
    document.getElementById('FTotal').value = total;

    var sgst = parseFloat(document.getElementById('FSGST').value) || 0;
    var cgst = parseFloat(document.getElementById('FCGST').value) || 0;
    document.getElementById('FNet').value = total + sgst + cgst;
}

function GetSave() {
    var tbody = document.getElementById('Tbody');
    var rows = tbody.getElementsByTagName('tr');
    var savedTableBody = document.getElementById('savedTbody');

    savedTableBody.innerHTML = '';

    for (var i = 0; i < rows.length; i++) {
        var save = rows[i].getElementsByTagName('td');
        if (save.length > 0) {
            var newRow = document.createElement('tr');
            var newSave;

            newSave = document.createElement('td');
            newSave.textContent = i + 0;
            newRow.appendChild(newSave);

            for (var j = 0; j < save.length - 1; j++) {
                newSave = document.createElement('td');
                var input = save[j].getElementsByTagName('input')[0];
                newSave.textContent = input.value;
                newRow.appendChild(newSave);
            }
            savedTableBody.appendChild(newRow);
        }
    }

    var sgst = document.createElement('tr');
    sgst.innerHTML = `<td colspan="4" class="text-end">SGST</td><td class="text-end">${document.getElementById('FSGST').value}</td>`;
    savedTableBody.appendChild(sgst);

    var cgst = document.createElement('tr');
    cgst.innerHTML = `<td colspan="4" class="text-end">CGST</td><td class="text-end">${document.getElementById('FCGST').value}</td>`;
    savedTableBody.appendChild(cgst);

    var netAmount = document.createElement('tr');
    netAmount.innerHTML = `<td colspan="4" class="text-end">Net Amount</td><td class="text-end">${document.getElementById('FNet').value}</td>`;
    savedTableBody.appendChild(netAmount);

    document.getElementById('initialTable').classList.add('d-none');
    document.getElementById('savedTable').classList.remove('d-none');
}

function updateRowNumbers() {
    var tbody = document.getElementById('Tbody');
    var rows = tbody.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        var rowNumber = rows[i].querySelector('th[scope="row"]');
        if (rowNumber) {
            rowNumber.textContent = i + 0;
        }
    }
}
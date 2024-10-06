$(document).ready(function () {


    $.ajax({
        url: "http://ajax1.lmsoft.cz/procedure.php?cmd=getPeopleList",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("coffee:kafe"));
        },
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, user) {
                $('#users').append(`<option value="${user.ID}">${user.name}</option>`);
            });
        },
        error: function () {
            alert("Nepodařilo se načíst seznam uživatelů.");
        }
    });


    $.ajax({
        url: "http://ajax1.lmsoft.cz/procedure.php?cmd=getTypesList",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("coffee:kafe"));
        },
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, type) {
                $('#typesSliders').append(`
                    <div class="sliderDiv">
                        <label for="slider${index}">${type.typ}</label>
                        <input type="number" id="slider${index}" class="slider" min="0" max="999" value="0" data-type-id="${type.ID}">
                    </div>
                `);
            });
        },
        error: function () {
            alert("Nepodařilo se načíst seznam typů kávy.");
        }
    });


    $('#coffeeForm').on('submit', function (event) {
        event.preventDefault();
        
        let userId = $('#users').val();
        let drinks = [];


        $('.slider').each(function () {
            let drinkTypeId = $(this).data('type-id');
            let amount = $(this).val();

            if (amount > 0) {
                drinks.push({
                    typeId: drinkTypeId,
                    amount: parseInt(amount)
                });
            }
        });


        if (userId === null || drinks.length === 0) {
            alert('Vyberte uživatele a zadejte počet vypitých káv.');
            return;
        }

        $.ajax({
            url: "http://ajax1.lmsoft.cz/procedure.php?cmd=saveDrinks",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa("coffee:kafe"));
            },
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                userId: userId,
                drinks: drinks
            }),
            success: function () {
                alert('Úspěšně uloženo!');
            },
            error: function () {
                alert('Nepodařilo se uložit.');
            }
        });
    });


    $('#mounthButton').on('click', function () {
        let selectedMonth = $('#month').val();

        $.ajax({
            url: `http://ajax1.lmsoft.cz/procedure.php?cmd=getSummaryOfDrinks&month=${selectedMonth}`,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa("coffee:kafe"));
            },
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                let table = `<table>
                    <tr>
                        <th>Typ kávy</th>
                        <th>Uživatel</th>
                        <th>Počet</th>
                    </tr>`;

                $.each(data, function (index, drink) {
                    table += `<tr>
                        <td>${drink[0]}</td>
                        <td>${drink[2]}</td>
                        <td>${drink[1]}</td>
                    </tr>`;
                });

                table += `</table>`;
                $('#summary').html(table);
            },
            error: function () {
                alert('Nepodařilo se načíst statistiky.');
            }
        });
    });
});

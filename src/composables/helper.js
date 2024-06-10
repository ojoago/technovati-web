// src/composables/useStringFormatter.js
// import { ref } from 'vue';

export function useHelper() {
    const formatUpperCase = (str) => str.toUpperCase();
    const formatLowerCase = (str) => str.toLowerCase();
    const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const reverseString = (str) => str.split('').reverse().join('');
    const numberFormat = (number, point = 2) =>{
        return number.toFixed(point).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }

    const cardAble = () => {
        // switch from table to card 

        if (window.innerWidth < 760) {
            // let tableId = $('.cardTable').attr('id');
            // if ($(".cardTable").hasClass("card-able")) {
            //     $(".colHeader").remove();
            // } else {
            //     var labels = [];
            //     $(".cardTable thead th").each(function() {
            //         labels.push($(this).text());
            //     });
            //     $(".cardTable tbody tr").each(function() {
            //         $(this)
            //             .find("td")
            //             .each(function(column) {
            //                 $("<span class='colHeader'>" + labels[column] + ":</span>").prependTo(
            //                     $(this)
            //                 );
            //             });
            //     });
            // }
            // $(".cardTable").removeClass('table-striped');
            // $(".cardTable").toggleClass("card-able");
            // $('tfoot').hide();

            var table = document.getElementById('myTable');
            var cardContainer = document.getElementById('cardContainer');

            // Loop through the rows of the table
            for (var i = 1; i < table.rows.length; i++) {
            var card = document.createElement('div');
            card.className = 'card';

            // Loop through the cells of the row
            for (var j = 0; j < table.rows[i].cells.length; j++) {
            var p = document.createElement('p');
            p.textContent = table.rows[i].cells[j].textContent;
            card.appendChild(p);
            }

            cardContainer.appendChild(card);
            }
            alert('card will shine')
        }
        
    }

  return {
    formatUpperCase,
    formatLowerCase,
    capitalizeFirstLetter,
    reverseString,
    numberFormat,
    cardAble
  };
}

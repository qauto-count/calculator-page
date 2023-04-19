
let objData = {
    country:{
        USA: {},
        CANADA: {}
    },
    destination: {}
};
objData.country.USA = USA;
objData.country.CANADA = CANADA;
objData.destination = destination;


window.addEventListener('DOMContentLoaded', function() {
    function calcDatatasite() {
        let wrapper_button_country = document.getElementById('country'),
                button_country = wrapper_button_country.getElementsByTagName('div'),

            wrapper_calcalculator_1 = document.getElementById('calculator_1'),
                select_auction_name = document.getElementById('auction'),
                select_location_name = document.getElementById('location'),
                select_destination_name = document.getElementById('destination'),
                    
            wrapper_calcalculator_2 = document.getElementById('calculator_2'),
            wrapper_result_table = document.getElementById('result-table');


        let active_auction = '',
            active_region_name = '',
            active_country = '',

            arr_remove_auction_name = '',
            arr_auction_option = [],

            arr_remove_location_name = '',
            arr_location_option = [],
            arr_name_location = [],
            arr_cost_location = [],
            
            arr_remove_destination_name = '',
            arr_destination_option = [];

            wrapper_calcalculator_2.style.display = 'none';
            wrapper_result_table.style.display = 'none';

        /////при клікові присвоюємо кнопці вибору країни класс status_on 
        wrapper_button_country.addEventListener('click', function(event) {
            let target = event.target;

            //Видалення статичних опцій
            arr_remove_location_name = select_location_name.querySelectorAll('option');
            for(let i = 0; i < arr_remove_location_name.length; i++) {
                arr_remove_location_name[i].remove();
            }

            arr_remove_auction_name = select_auction_name.querySelectorAll('option');
            for(let i = 0; i < arr_remove_auction_name.length; i++) {
                arr_remove_auction_name[i].remove();
            }

            arr_remove_destination_name = select_destination_name.querySelectorAll('option');
            for(let i = 0; i < arr_remove_destination_name.length; i++) {
                arr_remove_destination_name[i].remove();
            }
            //

            for(let i = 0; i < button_country.length; i++) {
                button_country[i].classList.remove('status_on');
                if (target == button_country[i]) {
                    button_country[i].classList.add('status_on');
                    if(button_country[i].textContent == Object.keys(objData.country)[i]) {
                        let i_obj_num = i,
                            name_obj_country = Object.keys(objData.country)[i_obj_num];
                        for(let i = 0; i < Object.keys(objData.country[name_obj_country].auction).length; i++) {
                            arr_auction_option[i] =  document.createElement('option');
                            arr_auction_option[i].setAttribute('value', i);
                            arr_auction_option[i].textContent = Object.keys(objData.country[name_obj_country].auction)[i];
                            select_auction_name.appendChild(arr_auction_option[i]);
                        }
                        //заповнення локацій по вибраному аукціону (одноразова подія, потрбує події change в подальшому)
                        active_auction = select_auction_name.getElementsByTagName('option')[0].textContent;
                        for(let i_loc = 0; i_loc < Object.keys(objData.country[name_obj_country].auction[active_auction].location).length; i_loc++) {
                            active_region_name = Object.keys(objData.country[name_obj_country].auction[active_auction].location)[i_loc];
                            for(let i = 0; i < Object.keys(objData.country[name_obj_country].auction[active_auction].location[active_region_name]).length; i++) {
                                arr_name_location.push(objData.country[name_obj_country].auction[active_auction].location[active_region_name]['value_'+i][0]);
                                arr_cost_location.push(objData.country[name_obj_country].auction[active_auction].location[active_region_name]['value_'+i][1]);
                            }
                        }
                        for(let i = 0; i < arr_name_location.length; i++) {
                            arr_location_option[i] =  document.createElement('option');
                            arr_location_option[i].setAttribute('value', arr_cost_location[i]);
                            arr_location_option[i].textContent = arr_name_location[i];
                            select_location_name.appendChild(arr_location_option[i]);
                        }
                        arr_name_location = [];
                        arr_cost_location = [];
                        //
                        //Заповнення пункту призначення
                        for(let i =0; i < objData.destination.destination_name.length; i++) {
                            arr_destination_option[i] =  document.createElement('option');
                            arr_destination_option[i].setAttribute('value', i);
                            arr_destination_option[i].textContent = objData.destination.destination_name[i];
                            select_destination_name.appendChild(arr_destination_option[i]);
                        }
                        //
                    }
                }
            }
        });
        /////

        ////// Подія change 
        wrapper_calcalculator_1.addEventListener('change', function(event) {
            let target = event.target;
            if(target == select_auction_name) {
                //визначення активної країни (регіону)
                for(let i =0; i < button_country.length; i++) {
                    if(button_country[i].classList.contains('status_on')) {
                        active_country = button_country[i].textContent;
                    }
                }
                //
                //визначення активного аукціону активної країни (регіону)
                active_auction = select_auction_name.getElementsByTagName('option')[select_auction_name.value].textContent;
                //
                //видалення усього переліку локацій
                arr_remove_location_name = select_location_name.querySelectorAll('option');
                for(let i = 0; i < arr_remove_location_name.length; i++) {
                    arr_remove_location_name[i].remove();
                }
                //
                //додавання актуального переліку локацій
                for(let i_loc = 0; i_loc < Object.keys(objData.country[active_country].auction[active_auction].location).length; i_loc++) {
                    active_region_name = Object.keys(objData.country[active_country].auction[active_auction].location)[i_loc];
                    for(let i = 0; i < Object.keys(objData.country[active_country].auction[active_auction].location[active_region_name]).length; i++) {
                        arr_name_location.push(objData.country[active_country].auction[active_auction].location[active_region_name]['value_'+i][0]);
                        arr_cost_location.push(objData.country[active_country].auction[active_auction].location[active_region_name]['value_'+i][1]);
                    }
                }
                for(let i = 0; i < arr_name_location.length; i++) {
                    arr_location_option[i] =  document.createElement('option');
                    arr_location_option[i].setAttribute('value', arr_cost_location[i]);
                    arr_location_option[i].textContent = arr_name_location[i];
                    select_location_name.appendChild(arr_location_option[i]);
                }
                arr_name_location = [];
                arr_cost_location = [];
                //

            }
            //console.log(active_auction);
        });



        //////



    }
    calcDatatasite();
});




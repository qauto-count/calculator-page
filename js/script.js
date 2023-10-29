
let objData = {
    country:{
        USA: {},
        CANADA: {},
        EUROPE: {}
    },
    destination: {},
    services: {},
    auction_tax: {},
    other_data: {}
};
objData.country.USA = USA;
objData.country.CANADA = CANADA;
objData.country.EUROPE = EUROPE;
objData.destination = destination;
objData.services = services;
objData.auction_tax = auction_tax;
objData.other_data = other_data;


window.addEventListener('DOMContentLoaded', function() {
    function calcDatatasite() {
        let wrapper_button_country = document.getElementById('country'),
                button_country = wrapper_button_country.getElementsByTagName('div'),

            wrapper_calcalculator_1 = document.getElementById('calculator_1'),
                select_level = document.getElementById('level'),

                select_auction_name = document.getElementById('auction'),
                location_input = document.getElementById('location_input'),
                select_location_name = document.getElementById('location'),
                select_destination_name = document.getElementById('destination'),
                ////////////////////////////v1
                select_euro_aucnion_name = document.getElementById('euro_auction'),
                ////////////////////////////
            wrapper_calcalculator_2 = document.getElementById('calculator_2'),
            wrapper_result_table = document.getElementById('result-table'),
                arr_currency_symbol = wrapper_result_table.getElementsByClassName('currency_symbol'),
                name_delivery_direction = wrapper_result_table.getElementsByClassName('delivery_direction')[0],
            button_calculated_1 = document.getElementById('calculated_1'),
            button_calculated_2 = document.getElementById('calculated_2'),
            /////////////////////////////////v1
            visible_block_destination = document.getElementById('visible_1'),
            visible_block_euro_auction = document.getElementById('visible_2'),
            visible_block_complex = document.getElementById('visible_3');

            /////////////////////////////////

        let active_country = '',
            active_level = '',

            active_auction = '',
            active_region_name = '',
            

            arr_remove_auction_name = '',
            arr_auction_option = [],

            arr_remove_location_name = '',
            arr_location_option = [],
            arr_name_location = [],
            arr_cost_location = [],
            arr_region_location = [],
            
            arr_remove_destination_name = '',
            arr_remove_euro_auction_name = '',
            arr_destination_option = [],
            /////////////v1
            arr_euro_auction_option = [],
            /////////////
            //23.10.2023
            mark_up_choosen_auto = '',
            //
            total_value = 0,
 
 //////////////////////////////////////////////////////////////////////////////////v1 07.07.2023 додавання варіацій із W1 та loop2           
            var_w_1 = 'w_1',
            var_loop_2 = 'loop_2',
            active_location_var = '',
            currency_symbol = '';
//////////////////////////////////////////////////////////////////////////////////            

            wrapper_calcalculator_2.style.display = 'none';
            wrapper_result_table.style.display = 'none';

        /////при клікові присвоюємо кнопці вибору країни класс status_on 
        wrapper_button_country.addEventListener('click', function(event) {
            let target = event.target;
            for(let i = 0; i < button_country.length; i++) {
                button_country[i].classList.remove('status_on');
                if (target == button_country[i]) {
                    location_input.value = '';
                    //додавання символу валюти
                    if(button_country[i].textContent == 'EUROPE') {
                        currency_symbol = '€';
                        //23.10.2023 зміна назви місця з якого проводиться доставка
                        name_delivery_direction.textContent = 'Вартість доставки з Європи';
                        //
                    } else {
                        currency_symbol = '$';
                        //23.10.2023 зміна назви місця з якого проводиться доставка
                        name_delivery_direction.textContent = 'Вартість доставки в Європу';
                        //
                    }
                    for(let i =0; i < arr_currency_symbol.length; i++) {
                        arr_currency_symbol[i].textContent = currency_symbol;
                    }
                    
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

                    arr_remove_euro_auction_name = select_euro_aucnion_name.querySelectorAll('option');
                    for(let i = 0; i < arr_remove_euro_auction_name.length; i++) {
                        arr_remove_euro_auction_name[i].remove();
                    }
                    //


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
                                arr_region_location.push(active_region_name);
                            }
                        }
   
                        arr_location_option = [];
                        for(let i = 0; i < arr_name_location.length; i++) {
                            arr_location_option[i] =  document.createElement('option');
                            arr_location_option[i].setAttribute('value', arr_name_location[i]);
                            arr_location_option[i].setAttribute('data_value', arr_cost_location[i]);
                            arr_location_option[i].setAttribute('data_value_i', i);
                            arr_location_option[i].setAttribute('name', arr_region_location[i]);
                            select_location_name.appendChild(arr_location_option[i]);
                        } 
                        arr_location_option = []; 
                        arr_name_location = [];
                        arr_cost_location = [];
                        arr_region_location = [];
////////////////////////////////////////////////////v1 
                        if(target.classList.contains('status_on') && target.textContent == 'EUROPE') {
                            visible_block_destination.style.display = 'none';
                            visible_block_complex.style.display = 'none';
                        } else {
                            visible_block_destination.style.display = 'block';
                            visible_block_complex.style.display = 'table-row';
                        }    

                        if(target.classList.contains('status_on') && target.textContent == 'EUROPE' && select_auction_name.getElementsByTagName('option')[select_auction_name.value].textContent == 'Auto1') {
                            visible_block_euro_auction.style.display = 'block';
                        } else {
                            visible_block_euro_auction.style.display = 'none';
                        }
////////////////////////////////////////////////////v1   document.getElementById('broker').closest('tr').style.display = 'table-row';

                        //Заповнення пункту призначення
                        for(let i =0; i < objData.destination.destination_name.length; i++) {
                            arr_destination_option[i] =  document.createElement('option');
                            arr_destination_option[i].setAttribute('value', i);
                            arr_destination_option[i].textContent = objData.destination.destination_name[i];
                            select_destination_name.appendChild(arr_destination_option[i]);
                        }
////////////////////////////////////////////////////v1Заповнення аукціону для європи auto1
                        for(let i =0; i < Object.keys(objData.auction_tax.lot_data_auto1).length; i++) {
                            arr_euro_auction_option[i] =  document.createElement('option');
                            arr_euro_auction_option[i].setAttribute('value', i);
                            arr_euro_auction_option[i].textContent = objData.auction_tax.lot_data_auto1['data_'+i][0];
                            select_euro_aucnion_name.appendChild(arr_euro_auction_option[i]);
                        }
//////////////////////////////////////////////////////
                    }
                }
            }
        });
        /////

        ////// Подія change 
        wrapper_calcalculator_1.addEventListener('change', function(event) {
            let target = event.target;
            if(target == select_auction_name) {
                location_input.value = '';
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
                        arr_region_location.push(active_region_name);
                    }
                }
                for(let i = 0; i < arr_name_location.length; i++) {
                    arr_location_option[i] =  document.createElement('option');
                    arr_location_option[i].setAttribute('value', arr_name_location[i]);
                    arr_location_option[i].setAttribute('data_value', arr_cost_location[i]);
                    arr_location_option[i].setAttribute('data_value_i', i);
                    arr_location_option[i].setAttribute('name', arr_region_location[i]);
                    select_location_name.appendChild(arr_location_option[i]);
                }
                
                arr_name_location = [];
                arr_cost_location = [];
                arr_region_location = [];
                //
//////////////////////////////////////////////////////////////////////////////v1                    
                if(active_country == 'EUROPE' && select_auction_name.getElementsByTagName('option')[select_auction_name.value].textContent == 'Auto1') {
                    visible_block_euro_auction.style.display = 'block';
                } else {
                    visible_block_euro_auction.style.display = 'none';
                }
/////////////////////////////////////////////////////////////////////////////  
            }
        });
        //////

        ///////Подія 'click' на кнопку обрахунку
        wrapper_calcalculator_1.addEventListener('click', function(event) {
            let target = event.target;
            if(target == button_calculated_1 || target == button_calculated_2) {
                let accses_calculated = false,
                    arr_calculated_data = [0, 0];
                for(let i = 0; i < button_country.length; i++) {
                    if(button_country[i].classList.contains('status_on')) {
                        accses_calculated = true;
                    }
                }
                if (accses_calculated && location_input.value == '') {
                    alert('виберіть відповідну ЛОКАЦІЮ');
                    
                } else if(accses_calculated && location_input.value != '') {
                    //визначення потрібних елементів
                    //визначення активної країни (регіону)

                    for(let i =0; i < button_country.length; i++) {
                        if(button_country[i].classList.contains('status_on')) {
                            active_country = button_country[i].textContent;
                        }
                    }
                  
                    arr_location_option = select_location_name.getElementsByTagName('option');
                    
                    for(let i =0; i < arr_location_option.length; i++) {
                        if(location_input.value == arr_location_option[i].value) {
                            active_region_name = arr_location_option[i].getAttribute('name');
                            arr_calculated_data[0] = Number(arr_location_option[i].getAttribute('data_value'));
                                              
                        }
                    }
                    let index_arr_location_name = '';
                    for(let i = 0; i < objData.destination['location_name_'+active_country].length; i++) {
                        if(objData.destination['location_name_'+active_country][i] == active_region_name) {
                            index_arr_location_name = i;
                        }
                    }
//////////////////////////////////////////////////////////////////////////////////v1 07.07.2023 додавання варіацій із W1 та loop2

                    if(/\*\*/.test(location_input.value)) {
                        active_location_var = var_loop_2;
                    } else {
                        active_location_var = var_w_1;
                }
 ////////////////////////////////////////////                                                   ///////////////////v1
                    arr_calculated_data[1] = Number(objData.destination.country[active_country][active_location_var]['level_'+select_level.value]['destination_cost_'+select_destination_name.value][index_arr_location_name]);
                    //25.10.2023 додавання загальної націнки для моря
                    arr_calculated_data[1] = arr_calculated_data[1] + objData.destination.country[active_country][active_location_var]['level_'+select_level.value].mark_up_total_data;
                    //
                    
                    wrapper_calcalculator_2.style.display = 'flex';
                    wrapper_result_table.style.display = 'flex';
//////////////////////////////////////////////////////////////////////////////////v1 add EUROPE data    
                    active_auction = select_auction_name.getElementsByTagName('option')[select_auction_name.value].textContent;
                    //23.102023 додавання деталізованої назви напрямку доставки
                    name_delivery_direction.textContent = objData.country[active_country].auction[active_auction].delivery_direction;

                    let data_calc_1 = 0;
                    if(active_country == 'EUROPE') {
                        let var_location_europe = 0;
                        for(let i =0; i < arr_location_option.length; i++) {
                            if(location_input.value == arr_location_option[i].value) {
                                var_location_europe = objData.country[active_country].auction[active_auction].location[active_region_name]['value_'+i][(Number(select_level.value)+1)];
                            }
                        }
                        arr_location_option = [];
                        arr_calculated_data[0] = arr_calculated_data[0] + var_location_europe;
                        data_calc_1 = arr_calculated_data[0] + arr_calculated_data[1];
                    } else {
                        data_calc_1 = arr_calculated_data[0] + arr_calculated_data[1];
                    }
//////////////////////////////////////////////////////////////////////////////////

                    //23.10.2023, 25.10.2023 choose_auto
                    let select_choose_auto = document.getElementById('choose_auto').value;
                    if(select_choose_auto == '1') {
                    mark_up_choosen_auto = objData.services.country[active_country]['level_'+select_level.value].mark_up_crossover;
                    data_calc_1 = data_calc_1 + mark_up_choosen_auto;
                    arr_calculated_data[0] = arr_calculated_data[0] +mark_up_choosen_auto;
                    }
                    mark_up_choosen_auto = 0;

                    // 

                    document.getElementById('result-route').textContent = active_region_name;
                    document.getElementById('result').textContent = data_calc_1;
                                                                            ///////////////v1
                    arr_calculated_data[2] = Number(objData.services.country[active_country]['level_'+select_level.value].services_cost);
                    document.getElementById('dealer_price').textContent = arr_calculated_data[2];
                    
                                                                            //////////////v1
                    arr_calculated_data[3] = Number(objData.services.country[active_country]['level_'+select_level.value].complex_0[select_destination_name.value]);
                    document.getElementById('complex_price').textContent = arr_calculated_data[3];
                    
                    //лот і аукціонний збір
                    let lot_price_input = Number(document.getElementById('lot_price_input').value);
                    let auction_tax_value = 0;
                    arr_calculated_data[4] = lot_price_input + auction_tax_value;


                    
//////////////////////////////////////////////////////////////////////////////////v1 07.07.2023 
                    //25.10.2023 виправлення розрахунку з додаванням нових 2-х значень
                    function calcTaxValue (tax_name) {
                        let auction_tax_value = 0;
                        for(let i = 0; i < Object.keys(objData.auction_tax[tax_name]).length; i++) {
                            if(objData.auction_tax[tax_name]['data_' + i].marg_min <= lot_price_input && lot_price_input <= objData.auction_tax[tax_name]['data_' + i].marg_max) {
                                auction_tax_value = objData.auction_tax[tax_name]['data_' + i].cost;
                                return auction_tax_value;
                            } else if (lot_price_input == 0 || lot_price_input == '0' || lot_price_input == '') {
                                auction_tax_value = 0;
                            }
                        }
                    }
                    //
                    let use_auctin_tax = '',
                        land_auction_tax_value = '';
                    use_auctin_tax = 'lot_data';
                    if(active_auction == 'Auto1' && active_country == 'EUROPE') {
                        use_auctin_tax = 'lot_data_auto1';
                            for(let i = 0; i < Object.keys(objData.auction_tax[use_auctin_tax]).length; i++) {
                                if(i == select_euro_aucnion_name.value) {
                                    if(lot_price_input > 0) {
                                        land_auction_tax_value = objData.auction_tax[use_auctin_tax]['data_' + i][1];
                                    } else if (lot_price_input == 0 || lot_price_input == '0' || lot_price_input == '') {
                                        land_auction_tax_value = 0;
                                    }
                                }
                            }
                        if(select_level.value == '4') {
                            auction_tax_value = lot_price_input*6/100 + calcTaxValue('lot_data_online') + calcTaxValue('lot_data_gate_free') + objData.auction_tax.change_data[active_auction] + land_auction_tax_value;
                        } else {
                            if(lot_price_input > 0) {
                                auction_tax_value = land_auction_tax_value;
                            } else if (lot_price_input == 0 || lot_price_input == '0' || lot_price_input == '') {
                                auction_tax_value = 0;
                            }
                        }
                    } else if(active_country == 'EUROPE' && active_auction == 'Alcopa' || active_auction == 'BCA' || active_auction == 'Adesa') {
                        if(select_level.value == '4') {
                            auction_tax_value = lot_price_input*6/100 + calcTaxValue('lot_data_online') + calcTaxValue('lot_data_gate_free') + objData.auction_tax.change_data[active_auction];
                        } else {
                            auction_tax_value = 0;
                        }
                    } else if (active_country == 'EUROPE' && active_auction == 'Mobile_de' || active_auction == 'Autoplius_It' || active_auction == 'Otomoto_pl'|| active_auction == 'Norway') {
                        auction_tax_value = 0;
                    } else {
                        if(active_auction == 'Copart_de' && active_country == 'EUROPE') {
                            use_auctin_tax = 'lot_data_Copart_de';
                            if(select_level.value == '4') {
                                auction_tax_value = lot_price_input*6/100 + calcTaxValue('lot_data_online') + calcTaxValue('lot_data_gate_free') + objData.auction_tax.change_data[active_auction];
                                use_auctin_tax = 'lot_data_auto1';
                            }
                        }
                        if(lot_price_input >= 19350 && active_auction == 'Copart_de') {
                            auction_tax_value = lot_price_input*3/100;
                        } else {
                            if(lot_price_input >= 15000) {
                                auction_tax_value = lot_price_input*6/100 + calcTaxValue('lot_data_online') + calcTaxValue('lot_data_gate_free') + objData.auction_tax.change_data[active_auction];
                            } else {
                                for(let i = 0; i < Object.keys(objData.auction_tax[use_auctin_tax]).length; i++) {
                                    if(objData.auction_tax[use_auctin_tax]['data_' + i].marg_min <= lot_price_input && lot_price_input <= objData.auction_tax[use_auctin_tax]['data_' + i].marg_max) {
                                        if(lot_price_input > 0) {
                                            auction_tax_value = objData.auction_tax[use_auctin_tax]['data_' + i].cost + objData.auction_tax.change_data[active_auction];
                                            
                                        } else if (lot_price_input == 0 || lot_price_input == '0' || lot_price_input == '') {
                                            auction_tax_value = 0;
                                        }
                                    }
                                }
                            }
                            
                        }
                    }
//////////////////////////////////////////////////////////////////////////////////                     
                    arr_calculated_data[4] = lot_price_input + auction_tax_value;
                    document.getElementById('full_price').textContent = arr_calculated_data[4];
                    //
                    //сертифікат і мрео
                    //визначення value поточного рівня
                    active_level = select_level.value;
                    //
                    if(active_level == 4) {
                        arr_calculated_data[5] = objData.other_data.certificate;
                        arr_calculated_data[6] = objData.other_data.mreo;
                        document.getElementById('certificate').closest('tr').style.display = 'table-row';
                            document.getElementById('certificate').textContent = arr_calculated_data[5];
                        document.getElementById('mreo').closest('tr').style.display = 'table-row';
                            document.getElementById('mreo').textContent = arr_calculated_data[6];
                        
                    } else {
                        document.getElementById('certificate').closest('tr').style.display = 'none';
                        document.getElementById('mreo').closest('tr').style.display = 'none';
                        arr_calculated_data[5] = 0;
                        arr_calculated_data[6] = 0;
                    }
//////////////////////////////////////////////////////////////////////////////////v1 07.07.2023 new data: hazard, financial_guarantee, canada_tax, export_doc, broker
                    //hazard
                    let select_motor_value = document.getElementById('motor').value;
                    if(select_motor_value == '2' || select_motor_value == '3') {
                        arr_calculated_data[7] = Number(objData.services.country[active_country]['level_'+select_level.value].hazard);
                        document.getElementById('hazard').closest('tr').style.display = 'table-row';
                        document.getElementById('hazard').textContent = arr_calculated_data[7];
                    } else {
                        document.getElementById('hazard').closest('tr').style.display = 'none';
                        arr_calculated_data[7] = 0;
                    }
                    //financial_guarantee                    
                    if(select_motor_value == '2') {
                        arr_calculated_data[8] = Number(objData.services.country[active_country]['level_'+select_level.value].financial_guarantee);
                        document.getElementById('financial_guarantee').closest('tr').style.display = 'table-row';
                        document.getElementById('financial_guarantee').textContent = arr_calculated_data[8];
                    } else {
                        document.getElementById('financial_guarantee').closest('tr').style.display = 'none';
                        arr_calculated_data[8] = 0;
                    }
                    //canada_tax
                    let canada_tax = 'canada_tax_opt';
                    if(select_level.value == '4') {
                        canada_tax = 'canada_tax_roz';
                    }
                    if(active_country == 'CANADA') {
                        arr_calculated_data[9] = Number(((arr_calculated_data[4]*objData.other_data[canada_tax][0]/100)*objData.other_data[canada_tax][1]/100).toFixed(2));
                        document.getElementById('canada_tax').closest('tr').style.display = 'table-row';
                        document.getElementById('canada_tax').textContent = arr_calculated_data[9];
                    } else {
                        document.getElementById('canada_tax').closest('tr').style.display = 'none';
                        arr_calculated_data[9] = 0;
                    }
                    //export_doc
                    if(active_country == 'EUROPE') {
                        arr_calculated_data[10] = objData.services.country[active_country]['level_'+select_level.value].export_doc;
                        document.getElementById('export_doc').closest('tr').style.display = 'table-row';
                        document.getElementById('export_doc').textContent = arr_calculated_data[10];
                    }else {
                        document.getElementById('export_doc').closest('tr').style.display = 'none';
                        arr_calculated_data[10] = 0;
                    }
                    //broker
                    if(active_country == 'EUROPE') {
                        arr_calculated_data[11] = objData.services.country[active_country]['level_'+select_level.value].broker;
                        document.getElementById('broker').closest('tr').style.display = 'table-row';
                        document.getElementById('broker').textContent = arr_calculated_data[11];
                    }else {
                        document.getElementById('broker').closest('tr').style.display = 'none';
                        arr_calculated_data[11] = 0;
                    }

//////////////////////////////////////////////////////////////////////////////////
                    for(let i = 0; i < arr_calculated_data.length; i++) {
                        total_value = total_value + arr_calculated_data[i];
                    }

                    document.getElementById('key_price').textContent = total_value;
                    total_value = 0;
                } else {
                    alert('виберіть регіон (USA, CANADA, EUROPE)');
                }
            }
        });
        ///////



    }
    calcDatatasite();
});




window.addEventListener('DOMContentLoaded', function() {
let wrapper_block_password = document.getElementById('enter_password'),
    level_input = document.getElementById('access_level_input'),
    password_input = document.getElementById('pass'),
    button_enter = document.getElementById('button_enter'),
    level_3 = document.getElementById('level_3'),

    test = 'test';


wrapper_block_password.style.display = 'flex';
password_input.style.display = 'none';
level_3.style.display = 'none';

/// 18.10.2023 delete password start
level_3.style.display = 'block';
wrapper_block_password.style.display = 'none';
/// 18.10.2023 delete password ok

/// change 
wrapper_block_password.addEventListener('change', function(event) {
    let target = event.target;
    if(target == level_input) {
        if(level_input.value == 'Дилерський рівень 3') {
            password_input.style.display = 'inline-block';
            level_3.style.display = 'block';
        } else {
            password_input.style.display = 'none';
        }
    }
});
///

/////button click
wrapper_block_password.addEventListener('click', function(event) {
    let target = event.target;
    if(target == button_enter) {
        if(level_input.value == 'Загальний доступ') {
            wrapper_block_password.style.display = 'none';
            level_3.style.display = 'none';
        } else if (level_input.value == 'Дилерський рівень 3' && password_input.value == objData.other_data.level_ps) {
            wrapper_block_password.style.display = 'none';
            level_3.style.display = 'block';
        } else if(level_input.value == 'Дилерський рівень 3' && password_input.value != objData.other_data.level_ps) {
            alert('Пароль не вірний');
        } else {
            alert('Виберіть рівень доступу');
        }

    }
});
/////


});
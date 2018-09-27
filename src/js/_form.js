import $ from 'jquery';

$(document).ready(
    function () {
        $("#check").on("click", function () {
            $('.welcome').css('background-color', 'rgb(250, 50, 20)').animate({
                opacity: 0.25,
                height: "toggle"
            }, 1000, function () {
                $.ajax({
                    url: "../sites/form.html",
                    method: "GET",
                    success: (data) => {

                        let output = document.createElement('div');
                        output.innerHTML = data;
                        document.body.appendChild(output);
                        let username = document.querySelector('input[type="text"]');
                        let password = document.querySelector('input[type="password"]');
                        let email = document.querySelector('input[type="mail"]');
                        let form = document.querySelector('form');

                        form.addEventListener('submit', check)
                        const regexValue = /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
                        // const regexValue = /^[a-zA-Z0-9\_\-]+@\.[a-zA-Z]{2,4}$/;


                        function check(e) {
                            const matchEmail = regexValue.test(email.value);
                            e.preventDefault();
                            if (((username.value == "sergio" || username.value == "Sergio")) &&
                                (password.value == "js-game") && (matchEmail)) {
                                launchWelcome();
                            } else {
                                alert("please, give a valid user name and password");
                            }
                        }


                        /**
                         makeVisible.addEventListener('click', changeVisible)
                         function to show the password 

                         function changeVisible() {

                            if (password.type === "password") {
                                password.type = "text";
                            } else {
                                password.type = "password";

                            }
                        }
                        */



                    }
                })
            });
        })
    })




function launchWelcome() {
    window.location.href = '../challenges/first-challenge.html';
}






